<?php

declare(strict_types=1);

function cashfree_api_base(): string
{
    return env_value('CASHFREE_ENV', 'production') === 'sandbox'
        ? 'https://sandbox.cashfree.com/pg'
        : 'https://api.cashfree.com/pg';
}

function cashfree_headers(): array
{
    return [
        'Content-Type: application/json',
        'x-api-version: 2023-08-01',
        'x-client-id: ' . require_env('CASHFREE_CLIENT_ID'),
        'x-client-secret: ' . require_env('CASHFREE_CLIENT_SECRET'),
    ];
}

function cashfree_request(string $path, string $method = 'GET', ?array $body = null): array
{
    $ch = curl_init(cashfree_api_base() . $path);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => cashfree_headers(),
        CURLOPT_TIMEOUT => 30,
    ]);

    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body, JSON_UNESCAPED_SLASHES));
    }

    $response = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $data = $response ? json_decode($response, true) : null;
    if (!is_array($data)) {
        $data = [];
    }

    if ($status < 200 || $status >= 300) {
        $message = $data['message'] ?? "Cashfree API error ($status)";
        throw new RuntimeException($message, $status);
    }

    return $data;
}

function cashfree_mode(): string
{
    return env_value('CASHFREE_ENV', 'production') === 'sandbox' ? 'sandbox' : 'production';
}

function verify_cashfree_webhook(string $rawBody, ?string $signature, ?string $timestamp): bool
{
    if (!$signature || !$timestamp) {
        return false;
    }

    $secret = require_env('CASHFREE_CLIENT_SECRET');
    $computed = base64_encode(hash_hmac('sha256', $timestamp . $rawBody, $secret, true));
    return hash_equals($computed, $signature);
}
