<?php

declare(strict_types=1);

function service_account_credentials(): ?array
{
    $json = env_value('FIREBASE_SERVICE_ACCOUNT_JSON');
    if ($json) {
        $parsed = json_decode($json, true);
        return is_array($parsed) ? $parsed : null;
    }

    $path = env_value('FIREBASE_SERVICE_ACCOUNT_PATH', __DIR__ . '/../service-account.json');
    if ($path && is_readable($path)) {
        $parsed = json_decode((string) file_get_contents($path), true);
        return is_array($parsed) ? $parsed : null;
    }

    return null;
}

function base64url(string $value): string
{
    return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
}

function google_access_token(): string
{
    static $cached = null;
    static $expiresAt = 0;

    if ($cached && time() < $expiresAt - 60) {
        return $cached;
    }

    $sa = service_account_credentials();
    if (!$sa) {
        throw new RuntimeException(
            'Missing Firebase service account. Add FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON in api/cashfree/.env',
        );
    }

    $now = time();
    $header = base64url(json_encode(['alg' => 'RS256', 'typ' => 'JWT']));
    $claim = base64url(json_encode([
        'iss' => $sa['client_email'],
        'scope' => 'https://www.googleapis.com/auth/datastore',
        'aud' => 'https://oauth2.googleapis.com/token',
        'iat' => $now,
        'exp' => $now + 3600,
    ]));
    $input = $header . '.' . $claim;
    $privateKey = openssl_pkey_get_private($sa['private_key']);
    if (!$privateKey) {
        throw new RuntimeException('Invalid Firebase service account private key');
    }
    openssl_sign($input, $signature, $privateKey, OPENSSL_ALGO_SHA256);
    $jwt = $input . '.' . base64url($signature);

    $ch = curl_init('https://oauth2.googleapis.com/token');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'grant_type' => 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'assertion' => $jwt,
        ]),
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    $token = json_decode((string) $response, true);
    if (!is_array($token) || empty($token['access_token'])) {
        throw new RuntimeException('Unable to obtain Google access token for Firestore');
    }

    $cached = $token['access_token'];
    $expiresAt = $now + (int) ($token['expires_in'] ?? 3600);
    return $cached;
}

function firestore_project_id(): string
{
    return env_value('FIREBASE_PROJECT_ID', 'essy-bbd67') ?? 'essy-bbd67';
}

function firestore_document_path(string $collection, string $docId): string
{
    return 'projects/' . firestore_project_id() . '/databases/(default)/documents/' . $collection . '/' . $docId;
}

function parse_firestore_value(array $value)
{
    if (isset($value['stringValue'])) {
        return $value['stringValue'];
    }
    if (isset($value['integerValue'])) {
        return (int) $value['integerValue'];
    }
    if (isset($value['doubleValue'])) {
        return (float) $value['doubleValue'];
    }
    if (isset($value['booleanValue'])) {
        return (bool) $value['booleanValue'];
    }
    if (isset($value['mapValue']['fields'])) {
        return parse_firestore_fields($value['mapValue']['fields']);
    }
    if (isset($value['arrayValue']['values'])) {
        return array_map(
            static fn ($item) => parse_firestore_value($item),
            $value['arrayValue']['values'],
        );
    }
    return null;
}

function parse_firestore_fields(array $fields): array
{
    $parsed = [];
    foreach ($fields as $key => $value) {
        $parsed[$key] = parse_firestore_value($value);
    }
    return $parsed;
}

function encode_firestore_value($value): array
{
    if (is_string($value)) {
        return ['stringValue' => $value];
    }
    if (is_bool($value)) {
        return ['booleanValue' => $value];
    }
    if (is_int($value)) {
        return ['integerValue' => (string) $value];
    }
    if (is_float($value) || is_numeric($value)) {
        return ['doubleValue' => (float) $value];
    }
    if (is_array($value)) {
        if (array_is_list($value)) {
            return [
                'arrayValue' => [
                    'values' => array_map(static fn ($item) => encode_firestore_value($item), $value),
                ],
            ];
        }
        $fields = [];
        foreach ($value as $k => $v) {
            $fields[$k] = encode_firestore_value($v);
        }
        return ['mapValue' => ['fields' => $fields]];
    }
    return ['stringValue' => (string) $value];
}

function encode_firestore_fields(array $data): array
{
    $fields = [];
    foreach ($data as $key => $value) {
        $fields[$key] = encode_firestore_value($value);
    }
    return $fields;
}

function firestore_request(string $method, string $relativePath, ?array $body = null): array
{
    $url = 'https://firestore.googleapis.com/v1/' . $relativePath;
    $headers = [
        'Authorization: Bearer ' . google_access_token(),
        'Content-Type: application/json',
    ];

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_TIMEOUT => 30,
    ]);

    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_SLASHES));
    }

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = $response ? json_decode($response, true) : [];
    if (!is_array($data)) {
        $data = [];
    }

    if ($status === 404) {
        return [];
    }

    if ($status < 200 || $status >= 300) {
        $message = $data['error']['message'] ?? "Firestore API error ($status)";
        throw new RuntimeException($message, $status);
    }

    return $data;
}

function firestore_get_order(string $orderId): ?array
{
    $doc = firestore_request('GET', firestore_document_path('orders', $orderId));
    if (empty($doc['fields'])) {
        return null;
    }
    return parse_firestore_fields($doc['fields']);
}

function firestore_patch_order(string $orderId, array $fields): void
{
    $mask = [];
    foreach (array_keys($fields) as $key) {
        $mask[] = 'updateMask.fieldPaths=' . rawurlencode($key);
    }

    $path = firestore_document_path('orders', $orderId) . '?' . implode('&', $mask);
    firestore_request('PATCH', $path, ['fields' => encode_firestore_fields($fields)]);
}
