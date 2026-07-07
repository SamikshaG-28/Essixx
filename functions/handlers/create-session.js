import { cashfreeRequest } from '../lib/cashfree.js'
import { getOrder, normalizeAmount } from '../lib/orders.js'
import { getServerTimestamp } from '../lib/firebaseAdmin.js'

function normalizeIndianPhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length >= 10) return digits.slice(-10)
  return ''
}

function readJson(req) {
  if (typeof req.body === 'object' && req.body !== null) return req.body
  if (typeof req.body === 'string' && req.body) return JSON.parse(req.body)
  return {}
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const body = readJson(req)
    const { orderId, amount, source, returnSuccess, returnFailure } = body

    if (!orderId || !amount || !source) {
      res.status(400).json({ error: 'Missing required fields: orderId, amount, source' })
      return
    }

    if (source !== 'urbancart') {
      res.status(400).json({ error: 'Invalid source' })
      return
    }

    const order = await getOrder(orderId)
    if (!order) {
      res.status(404).json({ error: 'Order not found' })
      return
    }

    const { ref: orderRef, data: orderData } = order
    const orderAmount = normalizeAmount(orderData.amount)
    const urlAmount = normalizeAmount(amount)

    if (orderData.sourceSite !== 'urbancart') {
      res.status(400).json({ error: 'Order source mismatch' })
      return
    }

    if (orderData.paymentMethod !== 'cashfree') {
      res.status(400).json({ error: 'Order payment method is not cashfree' })
      return
    }

    if (urlAmount !== orderAmount) {
      res.status(400).json({ error: 'Amount mismatch' })
      return
    }

    const resolvedSuccess =
      returnSuccess || orderData.returnUrlSuccess || `https://urbancart.fun/#/payment-success?order=${encodeURIComponent(orderId)}`
    const resolvedFailure =
      returnFailure || orderData.returnUrlFailure || `https://urbancart.fun/#/payment-failed?order=${encodeURIComponent(orderId)}`

    if (orderData.status === 'paid') {
      res.status(409).json({
        error: 'Order already paid',
        status: 'paid',
        redirectUrl: resolvedSuccess,
      })
      return
    }

    if (!['payment_processing', 'awaiting_payment', 'payment_failed'].includes(orderData.status)) {
      res.status(400).json({ error: `Order in invalid state: ${orderData.status}` })
      return
    }

    const returnUrlBase = process.env.PAYMENT_RETURN_URL || 'https://essixx.com/payment/return'
    const cashfreeOrderId = `UC-${orderId}`

    let cashfreeOrder
    try {
      cashfreeOrder = await cashfreeRequest('/orders', {
        method: 'POST',
        body: JSON.stringify({
          order_id: cashfreeOrderId,
          order_amount: Number(orderData.amount),
          order_currency: orderData.currency || 'INR',
          customer_details: {
            customer_id: (orderData.userEmail || orderId).slice(0, 80),
            customer_name: orderData.userName || orderData.address?.name || 'Customer',
            customer_email: orderData.userEmail || body.email,
            customer_phone:
              normalizeIndianPhone(orderData.address?.phone) ||
              normalizeIndianPhone(body.phone) ||
              '9999999999',
          },
          order_meta: {
            return_url: `${returnUrlBase}?orderId=${encodeURIComponent(orderId)}`,
          },
          order_note: `UrbanCart order ${orderId}`,
        }),
      })
    } catch (err) {
      if (err?.status === 409 || err?.data?.code === 'order_id_already_exists') {
        cashfreeOrder = await cashfreeRequest(`/orders/${encodeURIComponent(cashfreeOrderId)}`, {
          method: 'GET',
        })
      } else {
        throw err
      }
    }

    await orderRef.set(
      {
        status: 'awaiting_payment',
        paymentGateway: 'cashfree_essixx',
        cashfreeOrderId,
        returnUrlSuccess: resolvedSuccess,
        returnUrlFailure: resolvedFailure,
        updatedAt: getServerTimestamp(),
      },
      { merge: true },
    )

    res.status(200).json({
      orderId,
      cashfreeOrderId,
      paymentSessionId: cashfreeOrder.payment_session_id || cashfreeOrder.paymentSessionId,
      mode: process.env.CASHFREE_ENV === 'sandbox' ? 'sandbox' : 'production',
    })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to create payment session' })
  }
}

