import { cashfreeRequest } from '../lib/cashfree.js'
import {
  getOrder,
  getFailureUrl,
  getSuccessUrl,
  markOrderFailed,
  markOrderPaid,
} from '../lib/orders.js'

function pickLatestPayment(payments = []) {
  if (!Array.isArray(payments) || payments.length === 0) return null
  return [...payments].sort((a, b) => {
    const at = new Date(a.payment_time || a.payment_completion_time || 0).getTime()
    const bt = new Date(b.payment_time || b.payment_completion_time || 0).getTime()
    return bt - at
  })[0]
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { orderId, returnSuccess, returnFailure } = req.query
    if (!orderId) {
      res.status(400).json({ error: 'Missing orderId' })
      return
    }

    const order = await getOrder(orderId)
    if (!order) {
      res.status(404).json({ error: 'Order not found' })
      return
    }

    const { ref: orderRef, data: orderData } = order
    const successUrl = getSuccessUrl(orderData, returnSuccess)
    const failureUrl = getFailureUrl(orderData, returnFailure)

    if (orderData.status === 'paid') {
      res.status(200).json({ status: 'paid', redirectUrl: successUrl })
      return
    }

    const cashfreeOrderId = orderData.cashfreeOrderId || `UC-${orderId}`
    const payments = await cashfreeRequest(`/orders/${encodeURIComponent(cashfreeOrderId)}/payments`, {
      method: 'GET',
    })

    const latest = pickLatestPayment(payments)
    const paymentStatus = latest?.payment_status || latest?.paymentStatus || ''
    const paymentId = latest?.cf_payment_id || latest?.payment_id || ''

    if (paymentStatus === 'SUCCESS') {
      await markOrderPaid(orderRef, {
        cashfreeOrderId,
        cashfreePaymentId: paymentId,
      })
      res.status(200).json({ status: 'paid', redirectUrl: successUrl })
      return
    }

    await markOrderFailed(orderRef, {
      cashfreeOrderId,
      cashfreePaymentStatus: paymentStatus || 'FAILED',
      reason: latest?.payment_message || latest?.error_details || 'User cancelled',
    })
    res.status(200).json({ status: 'payment_failed', redirectUrl: failureUrl })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Unable to resolve payment status' })
  }
}

