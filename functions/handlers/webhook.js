import { verifyWebhookSignature } from '../lib/cashfree.js'
import { getOrder, markOrderFailed, markOrderPaid } from '../lib/orders.js'

async function readRawBody(req) {
  if (typeof req.rawBody === 'string') return req.rawBody

  const chunks = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf8')
}

function parseWebhookObject(payload) {
  const object = payload?.data || payload?.object || payload
  const payment = object?.payment || payload?.data?.payment || payload?.payment || {}
  const order = object?.order || payload?.data?.order || payload?.order || {}
  return {
    orderId: order?.order_id || payment?.order_id || '',
    paymentId: payment?.cf_payment_id || payment?.payment_id || '',
    paymentStatus: payment?.payment_status || payload?.payment_status || '',
    failureReason: payment?.payment_message || payment?.error_details || '',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const signature = req.headers['x-webhook-signature']
    const timestamp = req.headers['x-webhook-timestamp']
    const rawBody = await readRawBody(req)

    if (!signature || !timestamp) {
      res.status(400).json({ error: 'Missing signature headers' })
      return
    }

    const valid = verifyWebhookSignature({ rawBody, signature, timestamp })
    if (!valid) {
      res.status(401).json({ error: 'Invalid webhook signature' })
      return
    }

    const payload = JSON.parse(rawBody)
    const event = parseWebhookObject(payload)
    if (!event.orderId) {
      res.status(200).json({ ok: true, ignored: true })
      return
    }

    const localOrderId = event.orderId.startsWith('UC-') ? event.orderId.slice(3) : event.orderId
    const order = await getOrder(localOrderId)
    if (!order) {
      res.status(200).json({ ok: true, ignored: true })
      return
    }

    const { ref: orderRef, data: orderData } = order
    const isSuccess = event.paymentStatus === 'SUCCESS'

    if (isSuccess) {
      if (orderData.status !== 'paid') {
        await markOrderPaid(orderRef, {
          cashfreeOrderId: event.orderId,
          cashfreePaymentId: event.paymentId,
        })
      }
    } else if (orderData.status !== 'paid') {
      await markOrderFailed(orderRef, {
        cashfreeOrderId: event.orderId,
        cashfreePaymentStatus: event.paymentStatus || 'FAILED',
        reason: event.failureReason || 'Payment failed',
      })
    }

    res.status(200).json({ ok: true })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Webhook processing failed' })
  }
}

