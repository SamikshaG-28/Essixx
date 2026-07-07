<?php

declare(strict_types=1);

function order_success_url(array $order, ?string $fallback = null, ?string $orderId = null): string
{
    if (!empty($order['returnUrlSuccess'])) {
        return $order['returnUrlSuccess'];
    }
    if ($fallback) {
        return $fallback;
    }
    if ($orderId) {
        return 'https://urbancart.fun/#/payment-success?order=' . rawurlencode($orderId);
    }
    return 'https://urbancart.fun/#/payment-success';
}

function order_failure_url(array $order, ?string $fallback = null, ?string $orderId = null): string
{
    if (!empty($order['returnUrlFailure'])) {
        return $order['returnUrlFailure'];
    }
    if ($fallback) {
        return $fallback;
    }
    if ($orderId) {
        return 'https://urbancart.fun/#/payment-failed?order=' . rawurlencode($orderId);
    }
    return 'https://urbancart.fun/#/payment-failed';
}

function mark_order_paid(string $orderId, array $values = []): void
{
    firestore_patch_order($orderId, [
        'status' => 'paid',
        'cashfreeOrderId' => $values['cashfreeOrderId'] ?? '',
        'cashfreePaymentId' => $values['cashfreePaymentId'] ?? '',
        'cashfreePaymentStatus' => 'SUCCESS',
        'paymentFailureReason' => '',
        'paidAt' => gmdate('c'),
        'updatedAt' => gmdate('c'),
    ]);
}

function mark_order_failed(string $orderId, array $values = []): void
{
    firestore_patch_order($orderId, [
        'status' => 'payment_failed',
        'paymentFailureReason' => $values['reason'] ?? 'Payment failed',
        'cashfreeOrderId' => $values['cashfreeOrderId'] ?? '',
        'cashfreePaymentStatus' => $values['cashfreePaymentStatus'] ?? 'FAILED',
        'updatedAt' => gmdate('c'),
    ]);
}

function pick_latest_payment(array $payments): ?array
{
    if (empty($payments)) {
        return null;
    }

    usort($payments, static function ($a, $b) {
        $at = strtotime($a['payment_time'] ?? $a['payment_completion_time'] ?? '0');
        $bt = strtotime($b['payment_time'] ?? $b['payment_completion_time'] ?? '0');
        return $bt <=> $at;
    });

    return $payments[0];
}
