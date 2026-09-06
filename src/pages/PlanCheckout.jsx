/**
 * Buying an Essy plan.
 *
 * Distinct from the order relay next door, which renders a payment another
 * storefront already created. Here the order does not exist until this page
 * asks the server to mint one — and the server, not this page, decides what
 * the plan costs. Nothing about the price travels in the URL.
 */
import { useEffect, useState } from 'react'

import { PLANS, formatPrice, planById } from '../data/plans.js'
import { cashfreeModeFromOrder, openCashfreeCheckout } from '../lib/cashfreeCheckout.js'
import { signInWithGoogle } from '../lib/auth.js'
import { useAccount } from '../lib/useAccount.js'
import './DashboardPage.css'

const ENDPOINT = '/api/cashfree/create-plan-session.php'

export default function PlanCheckout({ planId }) {
  const { user, loading } = useAccount()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const plan = planById(planId)
  const known = PLANS.some((p) => p.id === planId && p.price > 0)

  // Nothing can be bought without an account: the plan is granted against an
  // email, so there has to be one before money moves.
  const email = user?.email || ''

  const start = async () => {
    if (!email || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: planId,
          email,
          name: user?.displayName || '',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Could not start payment')
      if (!data.paymentSessionId) throw new Error('No payment session returned')

      await openCashfreeCheckout(
        data.paymentSessionId,
        cashfreeModeFromOrder({ cashfreeEnv: data.mode }),
      )
    } catch (err) {
      setError(err.message || 'Payment could not be started')
      setBusy(false)
    }
  }

  useEffect(() => {
    document.title = `${plan.name} — Essixx`
  }, [plan.name])

  if (!known) {
    return (
      <main className="db-page">
        <div className="db-container db-center">
          <p className="db-muted">That plan does not exist.</p>
          <p className="db-muted">
            <a href="/#pricing">See the plans</a>
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="db-page">
      <div className="db-container">
        <div className="db-signin">
          <div className="db-plan-head" style={{ justifyContent: 'center' }}>
            <span className="db-plan-name">{plan.name}</span>
            {plan.badge && <span className="db-plan-badge">{plan.badge}</span>}
          </div>
          <div className="db-plan-price" style={{ marginTop: 6 }}>
            ₹{formatPrice(plan.price)}
            <span className="db-plan-period">{plan.period}</span>
          </div>
          <p className="db-signin-lead" style={{ marginTop: 10 }}>
            {plan.tagline} No credits, no export caps, no per-minute billing.
          </p>

          {loading ? (
            <p className="db-muted">Checking your session…</p>
          ) : !email ? (
            <>
              <button
                type="button"
                className="db-google-btn"
                onClick={() => signInWithGoogle().catch(() => {})}
              >
                Sign in to continue
              </button>
              <p className="db-fineprint">
                The plan is attached to your email, so we need it before payment.
              </p>
            </>
          ) : (
            <>
              <button
                type="button"
                className="db-google-btn"
                onClick={start}
                disabled={busy}
              >
                {busy ? 'Opening Cashfree…' : `Pay ₹${formatPrice(plan.price)}`}
              </button>
              <p className="db-fineprint">Paying as {email}</p>
            </>
          )}

          {error && <p className="db-error">{error}</p>}
        </div>
      </div>
    </main>
  )
}
