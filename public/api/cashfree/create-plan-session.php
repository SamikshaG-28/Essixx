<?php

/**
 * Start payment for an Essy plan.
 *
 * Separate from create-session.php, which exists to relay orders another
 * storefront already created. Here the order does not exist yet, so this
 * endpoint mints it — and that is the whole reason the price lives in this
 * file rather than arriving in the request. A client that can name its own
 * amount can buy a yearly plan for one rupee.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['error' => 'Method not allowed']);
}

/** The only prices that exist. Anything else is rejected outright. */
const ESSY_PLANS = [
    'monthly' => ['amount' => 199.0, 'label' => 'Essy Monthly', 'days' => 31],
    'yearly'  => ['amount' => 1999.0, 'label' => 'Essy Yearly', 'days' => 366],
];

try {
    $body = read_json_body();
    $planId = strtolower(trim((string) ($body['plan'] ?? '')));
    $email = strtolower(trim((string) ($body['email'] ?? '')));
    $name = trim((string) ($body['name'] ?? ''));

    if (!isset(ESSY_PLANS[$planId])) {
        json_response(400, ['error' => 'Unknown plan']);
    }

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(400, ['error' => 'A valid email is required']);
    }

    $plan = ESSY_PLANS[$planId];

    // Unique per attempt: a retry after a failed payment must not collide
    // with the abandoned Cashfree order from the first try.
    $orderId = 'ESSY-' . strtoupper(bin2hex(random_bytes(8)));
    $returnUrlBase = env_value('PAYMENT_RETURN_URL', 'https://essixx.com/payment/return');

    firestore_patch_order($orderId, [
        'orderId' => $orderId,
        'sourceSite' => 'essy',
        'product' => 'essy',
        'plan' => $planId,
        'planDays' => $plan['days'],
        'email' => $email,
        'userEmail' => $email,
        'userName' => $name,
        'amount' => $plan['amount'],
        'currency' => 'INR',
        'status' => 'awaiting_payment',
        'paymentMethod' => 'cashfree',
        'paymentGateway' => 'cashfree_essixx',
        'createdAt' => gmdate('c'),
        'createdAtMs' => (int) round(microtime(true) * 1000),
        'updatedAt' => gmdate('c'),
    ]);

    $payload = [
        'order_id' => $orderId,
        'order_amount' => $plan['amount'],
        'order_currency' => 'INR',
        'customer_details' => [
            'customer_id' => substr($email, 0, 80),
            'customer_name' => $name !== '' ? $name : 'Essy user',
            'customer_email' => $email,
            // Cashfree insists on a phone; plans are not shipped anywhere, so
            // there is nothing meaningful to collect.
            'customer_phone' => normalize_indian_phone((string) ($body['phone'] ?? '')) ?: '9999999999',
        ],
        'order_meta' => [
            'return_url' => $returnUrlBase . '?orderId=' . rawurlencode($orderId),
        ],
        'order_note' => $plan['label'],
    ];

    try {
        $cashfreeOrder = cashfree_request('/orders', 'POST', $payload);
    } catch (RuntimeException $err) {
        if ($err->getCode() === 409) {
            $cashfreeOrder = cashfree_request('/orders/' . rawurlencode($orderId), 'GET');
        } else {
            throw $err;
        }
    }

    $sessionId = $cashfreeOrder['payment_session_id'] ?? $cashfreeOrder['paymentSessionId'] ?? '';

    firestore_patch_order($orderId, [
        'cashfreeOrderId' => $orderId,
        'paymentSessionId' => $sessionId,
        'updatedAt' => gmdate('c'),
    ]);

    json_response(200, [
        'orderId' => $orderId,
        'paymentSessionId' => $sessionId,
        'amount' => $plan['amount'],
        'plan' => $planId,
        'mode' => cashfree_mode(),
    ]);
} catch (Throwable $error) {
    json_response(500, ['error' => $error->getMessage() ?: 'Unable to start payment']);
}
