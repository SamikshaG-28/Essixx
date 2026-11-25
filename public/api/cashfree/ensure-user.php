<?php

/**
 * Create the Firestore user record after someone signs up in the desktop app.
 *
 * Firebase Auth and Firestore are separate: Identity Toolkit can mint an
 * account without a `users/{email}` document. The desktop app cannot write
 * Firestore itself (no Admin SDK, and the webview origin is not a Firebase
 * authorised domain), so it hands the ID token here. This verifies the token,
 * then creates the free-tier document if it is missing. An existing plan is
 * never overwritten.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib/bootstrap.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['error' => 'Method not allowed']);
}

function firebase_web_api_key(): string
{
    return env_value('FIREBASE_WEB_API_KEY', 'AIzaSyDgX3mKtJSQ-mP32mzUMYihtnqRaRtnFcc')
        ?? 'AIzaSyDgX3mKtJSQ-mP32mzUMYihtnqRaRtnFcc';
}

function effective_plan_fields(array $user): array
{
    return effective_essy_plan($user);
}

/** Confirm the token with Identity Toolkit and return the account it names. */
function lookup_id_token(string $idToken): array
{
    $url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key='
        . rawurlencode(firebase_web_api_key());

    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode(['idToken' => $idToken], JSON_UNESCAPED_SLASHES),
        CURLOPT_TIMEOUT => 20,
    ]);
    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = $response ? json_decode($response, true) : null;
    if ($status < 200 || $status >= 300 || !is_array($data) || empty($data['users'][0]['email'])) {
        throw new RuntimeException('Sign-in token was not valid', 401);
    }

    $user = $data['users'][0];
    return [
        'email' => strtolower(trim((string) $user['email'])),
        'name' => trim((string) ($user['displayName'] ?? '')),
    ];
}

try {
    $body = read_json_body();
    $idToken = trim((string) ($body['idToken'] ?? ''));
    $nameHint = trim((string) ($body['name'] ?? ''));

    if ($idToken === '') {
        json_response(400, ['error' => 'Missing idToken']);
    }

    $auth = lookup_id_token($idToken);
    $email = $auth['email'];
    $name = $nameHint !== '' ? $nameHint : $auth['name'];

    $existing = firestore_request('GET', firestore_document_path('users', $email));
    if (!empty($existing['fields'])) {
        $current = parse_firestore_fields($existing['fields']);
        $patch = ['updatedAt' => gmdate('c')];
        if ($name !== '' && trim((string) ($current['name'] ?? '')) === '') {
            $patch['name'] = $name;
        }
        firestore_patch_doc('users', $email, $patch);
        $resolved = effective_plan_fields($current);
        json_response(200, [
            'email' => $email,
            'name' => (string) ($patch['name'] ?? $current['name'] ?? $name),
            'plan' => $resolved['plan'],
            'expiresAt' => $resolved['expiresAt'],
            'created' => false,
        ]);
    }

    firestore_patch_doc('users', $email, [
        'email' => $email,
        'name' => $name,
        'plan' => 'free',
        'createdAt' => gmdate('c'),
        'updatedAt' => gmdate('c'),
    ]);

    json_response(200, [
        'email' => $email,
        'name' => $name,
        'plan' => 'free',
        'expiresAt' => null,
        'created' => true,
    ]);
} catch (Throwable $error) {
    $code = (int) $error->getCode();
    json_response($code >= 400 && $code < 600 ? $code : 500, [
        'error' => $error->getMessage() ?: 'Could not create the account record',
    ]);
}
