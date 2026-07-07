import { useEffect, useMemo, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useLocation } from 'react-router-dom'
import { db } from '../lib/firebase.js'
import { cashfreeModeFromOrder, openCashfreeCheckout } from '../lib/cashfreeCheckout.js'
import { isPayableStatus, orderFailureUrl, orderSuccessUrl } from '../lib/orderPayment.js'
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

function normalizeAmount(value) {
  const n = Number(value)
  if (Number.isNaN(n)) return null
  return n.toFixed(2)
}

export default function CheckoutPage() {
  const location = useLocation()
  const query = useMemo(
    () => parseQuery(location.search, window.location.hash),
    [location.search],
  )
  const orderId = query.orderId || ''
  const storeHints = useMemo(() => checkoutHintsFromQuery(query), [query])

  const [loading, setLoading] = useState(true)
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState(null)
  const [failureUrl, setFailureUrl] = useState(() =>
    orderFailureUrl(null, orderId, storeHints),
  )

  useEffect(() => {
    const run = async () => {
      try {
        if (!orderId) {
          throw new Error('Missing orderId in URL. UrbanCart must redirect with ?orderId=...')
        }

        const snap = await getDoc(doc(db, 'orders', orderId))
        if (!snap.exists()) {
          throw new Error('Order not found in Firestore')
        }

        const data = snap.data()
        setFailureUrl(orderFailureUrl(data, orderId, storeHints))

        if (!isUrbanCartSource(data.sourceSite)) throw new Error('Order source mismatch')
        if (data.paymentMethod !== 'cashfree') throw new Error('Order payment method mismatch')

        if (data.status === 'paid') {
          window.location.assign(orderSuccessUrl(data, orderId, storeHints))
          return
        }

        if (!isPayableStatus(data.status)) {
          throw new Error(`Order status not payable: ${data.status}`)
        }

        if (!data.paymentSessionId) {
          throw new Error(
            'Missing paymentSessionId on order. UrbanCart must create Cashfree session and save it on the order before redirect.',
          )
        }

        setOrder(data)
      } catch (err) {
        setError(err.message || 'Unable to load order')
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [orderId])

  const startPayment = async () => {
    if (!order || paying) return
    setPaying(true)
    setError('')

    try {
      await openCashfreeCheckout(order.paymentSessionId, cashfreeModeFromOrder(order))
    } catch (err) {
      setError(err.message || 'Payment initiation failed')
      setPaying(false)
    }
  }

  useEffect(() => {
    if (!loading && order?.paymentSessionId && !error && !paying) {
      startPayment()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, order, error])

  return (
    <div className="checkout-page">
      <Seo
        title="Secure Checkout — Essixx"
        description="Secure partner checkout hosted on Essixx."
        path="/checkout"
        robots="noindex, nofollow"
        keywords={[...siteConfig.keywords, 'secure checkout', 'cashfree checkout']}
        jsonLd={[
          buildPageJsonLd({
            path: '/checkout',
            title: 'Secure Checkout — Essixx',
            description: 'Secure payment checkout for partner orders.',
          }),
          buildBreadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Checkout', path: '/checkout' },
          ]),
        ]}
      />

      <main className="checkout-main">
        <section className="checkout-card">
          <p className="checkout-eyebrow">UrbanCart secure payment</p>
          <h1>Checkout on Essixx</h1>

          {loading ? (
            <p className="checkout-note">Loading order and opening payment...</p>
          ) : error ? (
            <div className="checkout-error">
              <p>{error}</p>
              <a href={failureUrl}>Back to UrbanCart</a>
            </div>
          ) : (
            <>
              <div className="checkout-summary">
                <div>
                  <span>Order ID</span>
                  <strong>{orderId}</strong>
                </div>
                <div>
                  <span>Amount</span>
                  <strong>INR {normalizeAmount(order.amount)}</strong>
                </div>
                <div>
                  <span>Customer</span>
                  <strong>{order.userName}</strong>
                </div>
                <div>
                  <span>Email</span>
                  <strong>{order.userEmail}</strong>
                </div>
              </div>

              <p className="checkout-note">
                {paying ? 'Opening Cashfree secure payment...' : 'Preparing payment...'}
              </p>
            </>
          )}
        </section>
      </main>
    </div>
  )
}
