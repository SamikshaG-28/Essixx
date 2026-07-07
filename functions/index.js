import { onRequest } from 'firebase-functions/v2/https'
import createSessionHandler from './handlers/create-session.js'
import resolveReturnHandler from './handlers/resolve-return.js'
import webhookHandler from './handlers/webhook.js'

const PAYMENT_CORS = [
  'https://essixx.com',
  'https://www.essixx.com',
  'https://urbancart.fun',
  'https://www.urbancart.fun',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

const paymentFnOptions = {
  region: 'asia-south1',
  cors: PAYMENT_CORS,
  invoker: 'public',
}

export const cashfreeCreateSession = onRequest(paymentFnOptions, createSessionHandler)

export const cashfreeResolveReturn = onRequest(paymentFnOptions, resolveReturnHandler)

export const cashfreeWebhook = onRequest(
  { region: 'asia-south1', invoker: 'public' },
  webhookHandler,
)
