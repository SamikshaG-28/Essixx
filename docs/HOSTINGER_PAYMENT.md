# Hostinger payment API (no Firebase Functions)

Checkout uses **PHP on the same domain** (`essixx.com/api/cashfree/*.php`). No Cloud Functions, no CORS, no Firebase plan change.

## 1. Firebase service account (required — fixes “Missing Firebase service account”)

**UrbanCart does not need this file.** Only Essixx Hostinger does.

1. [Firebase Console](https://console.firebase.google.com) → project **urbancart-cc45c**
2. Project settings → **Service accounts** → **Generate new private key**
3. Save the downloaded JSON as:

   `public/api/cashfree/service-account.json`

4. In `public/api/cashfree/.env` set:

   ```env
   FIREBASE_PROJECT_ID=urbancart-cc45c
   FIREBASE_SERVICE_ACCOUNT_PATH=service-account.json
   ```

5. After `npm run build`, upload `dist/api/cashfree/service-account.json` and `.env` to Hostinger.

Full steps: `docs/FIREBASE_SERVICE_ACCOUNT_SETUP.txt`

(This is free — **not** a Firebase plan upgrade.)

## 2. Cashfree keys

Copy `public/api/cashfree/.env.example` → `public/api/cashfree/.env`

```env
CASHFREE_ENV=production
CASHFREE_CLIENT_ID=<csv column 1>
CASHFREE_CLIENT_SECRET=<csv column 2>
PAYMENT_RETURN_URL=https://essixx.com/payment/return
FIREBASE_PROJECT_ID=urbancart-cc45c
FIREBASE_SERVICE_ACCOUNT_PATH=service-account.json
```

## 3. Build and upload

```bash
npm run build
```

Upload **everything inside `dist/`** to Hostinger `public_html`, including:

- `api/cashfree/create-session.php`
- `api/cashfree/resolve-return.php`
- `api/cashfree/webhook.php`
- `api/cashfree/lib/`
- `api/cashfree/.env`
- `api/cashfree/service-account.json`

Hostinger must have **PHP enabled** (default on most plans).

## 4. Cashfree dashboard

| Setting | Value |
|--------|--------|
| Return URL | `https://essixx.com/payment/return` |
| Webhook | `https://essixx.com/api/cashfree/webhook.php` |

## 5. Local dev

Terminal 1: `npm run dev:php`  
Terminal 2: `npm run dev`

Vite proxies `/api/cashfree` → PHP on port 8787.
