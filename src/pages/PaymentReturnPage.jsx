import { useEffect, useMemo, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'
import { db } from '../lib/firebase.js'
import {
  isCashfreeReturnFailure,
  isCashfreeReturnPending,
  isCashfreeReturnSuccess,
  markOrderFailed,
  markOrderPaid,
  orderFailureUrl,
  orderSuccessUrl,
  pollOrderUntilPaid,
} from '../lib/orderPayment.js'
import { checkoutHintsFromQuery, isUrbanCartSource } from '../lib/urbanCartStores.js'
import Seo from '../components/Seo.jsx'
import { siteConfig, buildPageJsonLd, buildBreadcrumbJsonLd } from '../seo/siteConfig.js'
import './CheckoutPage.css'

function safeDecode(value) {
  try {
    return decodeURIComponent(String(value).replace(/\+/g, '%20'))
  } catch {
    return String(value)
  }
}

function parseQuery(search, hash = '') {
  const candidates = [search]
  const hashQueryIndex = hash.indexOf('?')
  if (hashQueryIndex >= 0) {
    candidates.push(hash.slice(hashQueryIndex))
  }

  for (const candidate of candidates) {
    if (!candidate) continue
    try {
      const params = new URLSearchParams(candidate)
      return Object.fromEntries(params.entries())
    } catch {
      const raw = candidate.startsWith('?') ? candidate.slice(1) : candidate
      const fallback = {}
      for (const pair of raw.split('&')) {
        if (!pair) continue
        const idx = pair.indexOf('=')
        const key = idx >= 0 ? pair.slice(0, idx) : pair
        const value = idx >= 0 ? pair.slice(idx + 1) : ''
        fallback[safeDecode(key)] = safeDecode(value)
      }
      return fallback
    }
  }

  return {}
}

function paymentIdsFromQuery(query, order) {
  return {
    cashfreeOrderId: query.order_id || order.cashfreeOrderId || `UC-${query.orderId || ''}`,
    cashfreePaymentId: query.cf_payment_id || query.payment_id || '',
  }
}

export default function PaymentReturnPage() {
  const location = useLocation()
  const query = useMemo(
    () => parseQuery(location.search, window.location.hash),
    [location.search],
  )
  const storeHints = useMemo(() => checkoutHintsFromQuery(query), [query])
  const [message, setMessage] = useState('Updating payment status...')

  useEffect(() => {
    const run = async () => {
      const orderId = query.orderId || ''
      if (!orderId) {
        setMessage('Missing orderId in return URL.')
        return
      }

      let successUrl = orderSuccessUrl(null, orderId, storeHints)
      let failureUrl = orderFailureUrl(null, orderId, storeHints)

      try {
        const ref = doc(db, 'orders', orderId)
        const snap = await getDoc(ref)
        if (!snap.exists()) {
          throw new Error('Order not found')
        }

        const order = snap.data()
        successUrl = orderSuccessUrl(order, orderId, storeHints)
        failureUrl = orderFailureUrl(order, orderId, storeHints)

        if (!isUrbanCartSource(order.sourceSite)) {
          throw new Error('Order source mismatch')
        }

        if (order.status === 'paid') {
          window.location.assign(successUrl)
          return
        }

        const ids = paymentIdsFromQuery(query, order)

        if (isCashfreeReturnSuccess(query)) {
          setMessage('Payment successful. Saving and redirecting...')
          await markOrderPaid(orderId, ids)
          window.location.assign(successUrl)
          return
        }

        if (isCashfreeReturnFailure(query)) {
          const reason =
            query.order_status || query.payment_status || 'Payment not completed'
          setMessage('Payment was not completed. Redirecting...')
          await markOrderFailed(orderId, {
            cashfreePaymentStatus: 'FAILED',
            paymentFailureReason: String(reason),
            ...ids,
          })
          window.location.assign(failureUrl)
          return
        }

        if (isCashfreeReturnPending(query)) {
          setMessage('Confirming payment…')
          const { paid, order: latestOrder } = await pollOrderUntilPaid(orderId)

          if (paid) {
            const target = latestOrder
              ? orderSuccessUrl(latestOrder, orderId, storeHints)
              : successUrl
            if (latestOrder?.status !== 'paid') {
              await markOrderPaid(orderId, ids)
            }
            window.location.assign(target)
            return
          }

          // ACTIVE / unknown — do not mark failed; UrbanCart can verify via API
          setMessage('Payment received. Finishing on UrbanCart…')
          window.location.assign(successUrl)
          return
        }

        // Unrecognized status: poll once, prefer success path over false failure
        setMessage('Confirming payment…')
        const { paid } = await pollOrderUntilPaid(orderId, 5, 2000)
        if (paid) {
          window.location.assign(successUrl)
          return
        }

        setMessage('Payment received. Finishing on UrbanCart…')
        window.location.assign(successUrl)
      } catch (err) {
        const detail = err?.message || 'Unable to update payment status'
        const isPermission =
          detail.includes('permission') || detail.includes('Permission') || err?.code === 'permission-denied'

        setMessage(
          isPermission
            ? `${detail} — update Firestore rules for orders, then retry.`
            : `${detail} — you can check order status on UrbanCart.`,
        )
      }
    }

    run()
  }, [query])

  return (
    <div className="checkout-page">
      <Seo
        title="Payment Verification — Essixx"
        description="Updating payment status and redirecting to UrbanCart."
        path="/payment/return"
        robots="noindex, nofollow"
        keywords={[...siteConfig.keywords, 'payment return']}
        jsonLd={[
          buildPageJsonLd({
            path: '/payment/return',
            title: 'Payment Verification — Essixx',
            description: 'Update Firestore payment status and redirect.',
          }),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Payment Return', path: '/payment/return' },
          ]),
        ]}
      />
      <main className="checkout-main">
        <section className="checkout-card">
          <p className="checkout-eyebrow">Please wait</p>
          <h1>Processing payment</h1>
          <p className="checkout-note">{message}</p>
        </section>
      </main>
    </div>
  )
}
