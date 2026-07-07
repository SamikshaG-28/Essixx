import crypto from 'node:crypto'

const CASHFREE_API_BASE =
  process.env.CASHFREE_ENV === 'sandbox'
    ? 'https://sandbox.cashfree.com/pg'
    : 'https://api.cashfree.com/pg'

function getRequiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing required env var: ${name}`)
  return value
}

export function getCashfreeHeaders(extra = {}) {
  return {
    'Content-Type': 'application/json',
    'x-api-version': '2023-08-01',
    'x-client-id': getRequiredEnv('CASHFREE_CLIENT_ID'),
    'x-client-secret': getRequiredEnv('CASHFREE_CLIENT_SECRET'),
    ...extra,
  }
}

export async function cashfreeRequest(path, options = {}) {
  const response = await fetch(`${CASHFREE_API_BASE}${path}`, {
    ...options,
    headers: getCashfreeHeaders(options.headers),
  })

  const bodyText = await response.text()
  const data = bodyText ? JSON.parse(bodyText) : null

  if (!response.ok) {
    const message = data?.message || `Cashfree API error (${response.status})`
    const err = new Error(message)
    err.status = response.status
    err.data = data
    throw err
  }

  return data
}

export function verifyWebhookSignature({ rawBody, signature, timestamp }) {
  const secret = getRequiredEnv('CASHFREE_CLIENT_SECRET')
  const computed = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}${rawBody}`)
    .digest('base64')

  return computed === signature
}

