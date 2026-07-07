import { getAdminDb, getServerTimestamp } from './firebaseAdmin.js'

export async function getOrderRef(orderId) {
  return getAdminDb().collection('orders').doc(orderId)
}

export async function getOrder(orderId) {
  const ref = await getOrderRef(orderId)
  const snap = await ref.get()
  if (!snap.exists) return null
  return { ref, data: snap.data() }
}

export function normalizeAmount(value) {
  const n = Number(value)
  if (Number.isNaN(n)) return null
  return n.toFixed(2)
}

export function getSuccessUrl(order, fallback) {
  return order?.returnUrlSuccess || fallback || 'https://urbancart.fun/#/payment-success'
}

export function getFailureUrl(order, fallback) {
  return order?.returnUrlFailure || fallback || 'https://urbancart.fun/#/payment-failed'
}

export async function markOrderPaid(orderRef, values = {}) {
  const serverTimestamp = getServerTimestamp()
  await orderRef.set(
    {
      status: 'paid',
      cashfreeOrderId: values.cashfreeOrderId || '',
      cashfreePaymentId: values.cashfreePaymentId || '',
      cashfreePaymentStatus: 'SUCCESS',
      paidAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      paymentFailureReason: '',
    },
    { merge: true },
  )
}

export async function markOrderFailed(orderRef, values = {}) {
  const serverTimestamp = getServerTimestamp()
  await orderRef.set(
    {
      status: 'payment_failed',
      paymentFailureReason: values.reason || 'Payment failed',
      cashfreeOrderId: values.cashfreeOrderId || '',
      cashfreePaymentStatus: values.cashfreePaymentStatus || 'FAILED',
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}
