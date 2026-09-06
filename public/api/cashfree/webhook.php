<?php

declare(strict_types=1);

require_once __DIR__ . '/lib/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['error' => 'Method not allowed']);
}

try {
    $rawBody = (string) file_get_contents('php://input');
    $signature = $_SERVER['HTTP_X_WEBHOOK_SIGNATURE'] ?? null;
    $timestamp = $_SERVER['HTTP_X_WEBHOOK_TIMESTAMP'] ?? null;

    if (!verify_cashfree_webhook($rawBody, $signature, $timestamp)) {
        json_response(401, ['error' => 'Invalid webhook signature']);
    }

    $payload = json_decode($rawBody, true);
    if (!is_array($payload)) {
        json_response(400, ['error' => 'Invalid payload']);
    }

    $object = $payload['data'] ?? $payload['object'] ?? $payload;
    $payment = $object['payment'] ?? $payload['data']['payment'] ?? $payload['payment'] ?? [];
    $order = $object['order'] ?? $payload['data']['order'] ?? $payload['order'] ?? [];

    $cashfreeOrderId = $order['order_id'] ?? $payment['order_id'] ?? '';
    if (!$cashfreeOrderId) {
        json_response(200, ['ok' => true, 'ignored' => true]);
    }

    $localOrderId = str_starts_with($cashfreeOrderId, 'UC-')
        ? substr($cashfreeOrderId, 3)
        : $cashfreeOrderId;

    $orderData = firestore_get_order($localOrderId);
    if (!$orderData) {
        json_response(200, ['ok' => true, 'ignored' => true]);
    }

    $paymentStatus = $payment['payment_status'] ?? $payload['payment_status'] ?? '';
    $paymentId = $payment['cf_payment_id'] ?? $payment['payment_id'] ?? '';

    if ($paymentStatus === 'SUCCESS') {
        if (($orderData['status'] ?? '') !== 'paid') {
            mark_order_paid($localOrderId, [
                'cashfreeOrderId' => $cashfreeOrderId,
                'cashfreePaymentId' => $paymentId,
            ]);

            // Entitlement is granted here and nowhere else: this is the only
            // point in the flow that has heard from Cashfree directly.
            if (($orderData['product'] ?? '') === 'essy') {
                grant_essy_plan($orderData + ['orderId' => $localOrderId]);
            }
        }
    } elseif (($orderData['status'] ?? '') !== 'paid') {
        mark_order_failed($localOrderId, [
            'cashfreeOrderId' => $cashfreeOrderId,
            'cashfreePaymentStatus' => $paymentStatus ?: 'FAILED',
            'reason' => $payment['payment_message'] ?? $payment['error_details'] ?? 'Payment failed',
        ]);
    }

    json_response(200, ['ok' => true]);
} catch (Throwable $error) {
    json_response(500, ['error' => $error->getMessage() ?: 'Webhook processing failed']);
}
