<?php

declare(strict_types=1);

require_once __DIR__ . '/lib/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['error' => 'Method not allowed']);
}

try {
    $body = read_json_body();
    $orderId = $body['orderId'] ?? '';
    $amount = $body['amount'] ?? '';
    $source = $body['source'] ?? '';
    $returnSuccess = $body['returnSuccess'] ?? '';
    $returnFailure = $body['returnFailure'] ?? '';

    if (!$orderId || !$amount || !$source) {
        json_response(400, ['error' => 'Missing required fields: orderId, amount, source']);
    }

    if ($source !== 'urbancart') {
        json_response(400, ['error' => 'Invalid source']);
    }

    $orderData = firestore_get_order($orderId);
    if (!$orderData) {
        json_response(404, ['error' => 'Order not found']);
    }

    $orderAmount = normalize_amount($orderData['amount'] ?? null);
    $urlAmount = normalize_amount($amount);

    if (($orderData['sourceSite'] ?? '') !== 'urbancart') {
        json_response(400, ['error' => 'Order source mismatch']);
    }

    if (($orderData['paymentMethod'] ?? '') !== 'cashfree') {
        json_response(400, ['error' => 'Order payment method is not cashfree']);
    }

    if (!$orderAmount || !$urlAmount || $orderAmount !== $urlAmount) {
        json_response(400, ['error' => 'Amount mismatch']);
    }

    $resolvedSuccess = $returnSuccess ?: order_success_url($orderData, null, $orderId);
    $resolvedFailure = $returnFailure ?: order_failure_url($orderData, null, $orderId);

    if (($orderData['status'] ?? '') === 'paid') {
        json_response(409, [
            'error' => 'Order already paid',
            'status' => 'paid',
            'redirectUrl' => $resolvedSuccess,
        ]);
    }

    $allowed = ['payment_processing', 'awaiting_payment', 'payment_failed'];
    if (!in_array($orderData['status'] ?? '', $allowed, true)) {
        json_response(400, ['error' => 'Order in invalid state: ' . ($orderData['status'] ?? 'unknown')]);
    }

    $returnUrlBase = env_value('PAYMENT_RETURN_URL', 'https://essixx.com/payment/return');
    $cashfreeOrderId = 'UC-' . $orderId;
    $address = is_array($orderData['address'] ?? null) ? $orderData['address'] : [];

    $payload = [
        'order_id' => $cashfreeOrderId,
        'order_amount' => (float) $orderData['amount'],
        'order_currency' => $orderData['currency'] ?? 'INR',
        'customer_details' => [
            'customer_id' => substr((string) ($orderData['userEmail'] ?? $orderId), 0, 80),
            'customer_name' => $orderData['userName'] ?? ($address['name'] ?? 'Customer'),
            'customer_email' => $orderData['userEmail'] ?? ($body['email'] ?? ''),
            'customer_phone' => normalize_indian_phone($address['phone'] ?? '')
                ?: normalize_indian_phone($body['phone'] ?? '')
                ?: '9999999999',
        ],
        'order_meta' => [
            'return_url' => $returnUrlBase . '?orderId=' . rawurlencode($orderId),
        ],
        'order_note' => 'UrbanCart order ' . $orderId,
    ];

    try {
        $cashfreeOrder = cashfree_request('/orders', 'POST', $payload);
    } catch (RuntimeException $err) {
        if ($err->getCode() === 409) {
            $cashfreeOrder = cashfree_request('/orders/' . rawurlencode($cashfreeOrderId), 'GET');
        } else {
            throw $err;
        }
    }

    firestore_patch_order($orderId, [
        'status' => 'awaiting_payment',
        'paymentGateway' => 'cashfree_essixx',
        'cashfreeOrderId' => $cashfreeOrderId,
        'returnUrlSuccess' => $resolvedSuccess,
        'returnUrlFailure' => $resolvedFailure,
        'updatedAt' => gmdate('c'),
    ]);

    json_response(200, [
        'orderId' => $orderId,
        'cashfreeOrderId' => $cashfreeOrderId,
        'paymentSessionId' => $cashfreeOrder['payment_session_id'] ?? $cashfreeOrder['paymentSessionId'] ?? '',
        'mode' => cashfree_mode(),
    ]);
} catch (Throwable $error) {
    json_response(500, ['error' => $error->getMessage() ?: 'Unable to create payment session']);
}
