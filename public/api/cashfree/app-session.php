<?php

/**
 * The desktop app's half of signing in.
 *
 * Two reads, no writes worth speaking of:
 *
 *   ?nonce=…  the app polls for a sign-in it started. The site writes the
 *             account against that nonce after Google returns; this hands it
 *             over and deletes it, so a nonce is single-use.
 *   ?email=…  the app re-checks a plan on launch, so someone who paid on the
 *             website yesterday is not asked to sign in again.
 *
 * Neither branch can grant anything. The plan is only ever written by the
 * Cashfree webhook, which is the one participant that heard from the payment
 * processor directly.
 */

declare(strict_types=1);

require_once __DIR__ . '/lib/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(405, ['error' => 'Method not allowed']);
}

/** A plan whose expiry has passed is a free plan. */
function effective_plan(array $user): array
{
    $plan = (string) ($user['plan'] ?? 'free');
    $expires = (int) ($user['planExpiresAt'] ?? 0);
    $nowMs = (int) round(microtime(true) * 1000);

    if ($plan !== 'free' && $expires > 0 && $expires < $nowMs) {
        return ['plan' => 'free', 'expiresAt' => null];
    }
    return ['plan' => $plan, 'expiresAt' => $expires > 0 ? $expires : null];
}

try {
    $nonce = trim((string) ($_GET['nonce'] ?? ''));
    $email = strtolower(trim((string) ($_GET['email'] ?? '')));

    if ($nonce !== '') {
        if (!preg_match('/^[a-f0-9]{16,64}$/', $nonce)) {
            json_response(400, ['error' => 'Bad nonce']);
        }

        $doc = firestore_request('GET', firestore_document_path('appSessions', $nonce));
        if (empty($doc['fields'])) {
            // Not signed in yet. The app keeps polling.
            json_response(200, ['pending' => true]);
        }

        $session = parse_firestore_fields($doc['fields']);
        $sessionEmail = strtolower((string) ($session['email'] ?? ''));
        if ($sessionEmail === '') {
            json_response(200, ['pending' => true]);
        }

        $userDoc = firestore_request('GET', firestore_document_path('users', $sessionEmail));
        $user = empty($userDoc['fields']) ? [] : parse_firestore_fields($userDoc['fields']);
        $resolved = effective_plan($user);

        // Consumed on first read, so a nonce seen by anyone else is useless.
        firestore_request('DELETE', firestore_document_path('appSessions', $nonce));

        json_response(200, [
            'email' => $sessionEmail,
            'name' => (string) ($session['name'] ?? $user['name'] ?? ''),
            'plan' => $resolved['plan'],
            'expiresAt' => $resolved['expiresAt'],
        ]);
    }

    if ($email !== '') {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            json_response(400, ['error' => 'Bad email']);
        }

        $userDoc = firestore_request('GET', firestore_document_path('users', $email));
        if (empty($userDoc['fields'])) {
            json_response(404, ['error' => 'No such account']);
        }

        $user = parse_firestore_fields($userDoc['fields']);
        $resolved = effective_plan($user);

        json_response(200, [
            'email' => $email,
            'name' => (string) ($user['name'] ?? ''),
            'plan' => $resolved['plan'],
            'expiresAt' => $resolved['expiresAt'],
        ]);
    }

    json_response(400, ['error' => 'Provide a nonce or an email']);
} catch (Throwable $error) {
    json_response(500, ['error' => $error->getMessage() ?: 'Session lookup failed']);
}
