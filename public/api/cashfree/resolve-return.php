<?php

declare(strict_types=1);

require_once __DIR__ . '/lib/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(405, ['error' => 'Method not allowed']);
}

try {
    $orderId = $_GET['orderId'] ?? '';
    $returnSuccess = $_GET['returnSuccess'] ?? '';
    $returnFailure = $_GET['returnFailure'] ?? '';

    if (!$orderId) {
        json_response(400, ['error' => 'Missing orderId']);
    }

    $orderData = firestore_get_order($orderId);
    if (!$orderData) {
        json_response(404, ['error' => 'Order not found']);
    }

    $successUrl = order_success_url($orderData, $returnSuccess ?: null, $orderId);
    $failureUrl = order_failure_url($orderData, $returnFailure ?: null, $orderId);

    if (($orderData['status'] ?? '') === 'paid') {
        json_response(200, ['status' => 'paid', 'redirectUrl' => $successUrl]);
    }

    $cashfreeOrderId = $orderData['cashfreeOrderId'] ?? ('UC-' . $orderId);
    $paymentsResponse = cashfree_request('/orders/' . rawurlencode($cashfreeOrderId) . '/payments', 'GET');
    $paymentsList = $paymentsResponse;
    if (isset($paymentsResponse['payments']) && is_array($paymentsResponse['payments'])) {
        $paymentsList = $paymentsResponse['payments'];
    }
    $latest = pick_latest_payment(is_array($paymentsList) ? $paymentsList : []);

    $paymentStatus = $latest['payment_status'] ?? $latest['paymentStatus'] ?? '';
    $paymentId = $latest['cf_payment_id'] ?? $latest['payment_id'] ?? '';

    if ($paymentStatus === 'SUCCESS') {
        mark_order_paid($orderId, [
            'cashfreeOrderId' => $cashfreeOrderId,
            'cashfreePaymentId' => $paymentId,
        ]);
        json_response(200, ['status' => 'paid', 'redirectUrl' => $successUrl]);
    }

    mark_order_failed($orderId, [
        'cashfreeOrderId' => $cashfreeOrderId,
        'cashfreePaymentStatus' => $paymentStatus ?: 'FAILED',
        'reason' => $latest['payment_message'] ?? $latest['error_details'] ?? 'User cancelled',
    ]);

    json_response(200, ['status' => 'payment_failed', 'redirectUrl' => $failureUrl]);
} catch (Throwable $error) {
    json_response(500, ['error' => $error->getMessage() ?: 'Unable to resolve payment status']);
}
