<?php

declare(strict_types=1);

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/cashfree.php';
require_once __DIR__ . '/firestore.php';
require_once __DIR__ . '/orders.php';

function json_response(int $status, array $payload): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return [];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function normalize_amount($value): ?string
{
    if ($value === null || $value === '') {
        return null;
    }
    if (!is_numeric($value)) {
        return null;
    }
    return number_format((float) $value, 2, '.', '');
}

function normalize_indian_phone($phone): string
{
    $digits = preg_replace('/\D+/', '', (string) $phone);
    if (strlen($digits) >= 10) {
        return substr($digits, -10);
    }
    return '';
}
