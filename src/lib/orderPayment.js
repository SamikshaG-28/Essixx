import { loadFirestore } from './firestore.js'
import {
  buildUrbanCartReturnPath,
  resolveUrbanCartOrigin,
} from './urbanCartStores.js'

export function orderSuccessUrl(order, orderId, hints = {}) {
  if (order?.returnUrlSuccess) return order.returnUrlSuccess
  const origin = resolveUrbanCartOrigin(order, hints)
  return `${origin}${buildUrbanCartReturnPath('success', orderId)}`
}

export function orderFailureUrl(order, orderId, hints = {}) {
  if (order?.returnUrlFailure) return order.returnUrlFailure
  const origin = resolveUrbanCartOrigin(order, hints)
  return `${origin}${buildUrbanCartReturnPath('failure', orderId)}`
}

export function isPayableStatus(status) {
  return ['payment_processing', 'awaiting_payment', 'payment_failed'].includes(status)
}

const SUCCESS_STATUSES = new Set(['PAID', 'SUCCESS'])
const FAILURE_STATUSES = new Set(['EXPIRED', 'TERMINATED', 'FAILED', 'CANCELLED', 'CANCEL'])

export function normalizeCashfreeStatus(value) {
  return String(value || '').toUpperCase().trim()
}

export function isCashfreeReturnSuccess(query) {
  const orderStatus = normalizeCashfreeStatus(query.order_status)
  const paymentStatus = normalizeCashfreeStatus(query.payment_status)
  return SUCCESS_STATUSES.has(orderStatus) || SUCCESS_STATUSES.has(paymentStatus)
}

export function isCashfreeReturnFailure(query) {
  const orderStatus = normalizeCashfreeStatus(query.order_status)
  const paymentStatus = normalizeCashfreeStatus(query.payment_status)
  return FAILURE_STATUSES.has(orderStatus) || FAILURE_STATUSES.has(paymentStatus)
}

export function isCashfreeReturnPending(query) {
  if (isCashfreeReturnSuccess(query) || isCashfreeReturnFailure(query)) {
    return false
  }
  const orderStatus = normalizeCashfreeStatus(query.order_status)
  return !orderStatus || orderStatus === 'ACTIVE' || orderStatus === 'PENDING'
}

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function pollOrderUntilPaid(orderId, maxAttempts = 15, intervalMs = 2000) {
  const { db, doc, getDoc } = await loadFirestore()
  const read = () => getDoc(doc(db, 'orders', orderId))

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const snap = await read()
    if (snap.exists() && snap.data().status === 'paid') {
      return { paid: true, order: snap.data() }
    }
    if (attempt < maxAttempts - 1) {
      await sleep(intervalMs)
    }
  }

  const snap = await read()
  return {
    paid: snap.exists() && snap.data().status === 'paid',
    order: snap.exists() ? snap.data() : null,
  }
}

export async function markOrderPaid(orderId, extra = {}) {
  const { db, doc, updateDoc, serverTimestamp } = await loadFirestore()
  await updateDoc(doc(db, 'orders', orderId), {
    status: 'paid',
    cashfreePaymentStatus: 'SUCCESS',
    paymentFailureReason: '',
    paidAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    ...extra,
  })
}

export async function markOrderFailed(orderId, extra = {}) {
  const { db, doc, updateDoc, serverTimestamp } = await loadFirestore()
  await updateDoc(doc(db, 'orders', orderId), {
    status: 'payment_failed',
    cashfreePaymentStatus: extra.cashfreePaymentStatus || 'FAILED',
    paymentFailureReason: extra.paymentFailureReason || 'Payment failed',
    updatedAt: serverTimestamp(),
    ...extra,
  })
}
