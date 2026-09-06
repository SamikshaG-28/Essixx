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

/**
 * Grant the plan an order paid for.
 *
 * Called only from the webhook, never from anything the browser or the
 * desktop app can reach. The entitlement is written here because this is the
 * one place that has heard from Cashfree directly — every other party in the
 * flow is relaying a claim someone could have made up.
 *
 * Expiry extends an unexpired plan rather than replacing it, so renewing
 * early does not throw away days already paid for.
 */
function grant_essy_plan(array $order): void
{
    $email = strtolower(trim((string) ($order['email'] ?? $order['userEmail'] ?? '')));
    $plan = (string) ($order['plan'] ?? '');
    $days = (int) ($order['planDays'] ?? 0);

    if ($email === '' || $plan === '' || $days <= 0) {
        return;
    }

    $existing = firestore_request('GET', firestore_document_path('users', $email));
    $current = empty($existing['fields']) ? [] : parse_firestore_fields($existing['fields']);

    $nowMs = (int) round(microtime(true) * 1000);
    $currentExpiry = (int) ($current['planExpiresAt'] ?? 0);
    $base = $currentExpiry > $nowMs ? $currentExpiry : $nowMs;

    firestore_patch_doc('users', $email, [
        'email' => $email,
        'plan' => $plan,
        'planExpiresAt' => $base + ($days * 86400000),
        'lastOrderId' => (string) ($order['orderId'] ?? ''),
        'updatedAt' => gmdate('c'),
    ]);
}
