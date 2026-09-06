/**
 * The account dashboard: who you are, what you are on, and what you can grab.
 *
 * Deliberately thin. Everything that decides entitlement is written by the
 * Cashfree webhook server-side; this page only reads it back. Nothing here
 * can grant a plan, which is what stops the dashboard being the weak point.
 */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Check,
  Download,
  LogOut,
  Monitor,
  ShieldCheck,
} from 'lucide-react'

import Seo from '../components/Seo.jsx'
import { PLANS, UPCOMING, formatPrice, planById } from '../data/plans.js'
import { fetchOrders, signInWithGoogle, signOut } from '../lib/auth.js'
import { useAccount } from '../lib/useAccount.js'
import { cn } from '../lib/utils.js'
import './DashboardPage.css'

const EASE = [0.22, 1, 0.36, 1]

/** The macOS artifact the site serves. Windows is not built yet. */
const MAC_DOWNLOAD = '/downloads/Essy_0.1.0_aarch64.dmg'

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="db-google" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.9-.1-1.5-.2-2.2H12v4.1h6.5c-.1 1.1-.8 2.7-2.4 3.8l3.7 2.9c2.2-2 3.7-5 3.7-8.6z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.8-2.9l-3.7-2.9c-1 .7-2.3 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5l-3.9 3a12 12 0 0 0 10.6 6.6z"
      />
      <path
        fill="#FBBC05"
        d="M5.3 14.4a7.4 7.4 0 0 1 0-4.7l-3.9-3a12 12 0 0 0 0 10.7l3.9-3z"
      />
      <path
        fill="#EA4335"
        d="M12 4.7c2.2 0 3.7.9 4.5 1.7l3.3-3.2A11.6 11.6 0 0 0 12 0 12 12 0 0 0 1.4 6.7l3.9 3c.9-2.9 3.6-5 6.7-5z"
      />
    </svg>
  )
}

function SignedOut({ onSignIn, busy, error }) {
  return (
    <div className="db-signin">
      <ShieldCheck className="db-signin-icon" aria-hidden="true" />
      <h1 className="db-signin-title">Sign in to Essixx</h1>
      <p className="db-signin-lead">
        Your plan, downloads and receipts live here. The same account signs you
        in inside the Essy desktop app.
      </p>
      <button
        type="button"
        className="db-google-btn"
        onClick={onSignIn}
        disabled={busy}
      >
        <GoogleMark />
        {busy ? 'Opening Google…' : 'Continue with Google'}
      </button>
      {error && <p className="db-error">{error}</p>}
      <p className="db-fineprint">
        We store your email, name and plan. Nothing else.
      </p>
    </div>
  )
}

function PlanCard({ plan, current, email }) {
  const href = `/checkout?plan=${plan.id}${
    email ? `&email=${encodeURIComponent(email)}` : ''
  }`
  return (
    <div className={cn('db-plan', plan.featured && 'db-plan--featured', current && 'db-plan--current')}>
      <div className="db-plan-head">
        <span className="db-plan-name">{plan.name}</span>
        {current && <span className="db-plan-tag">Current</span>}
        {!current && plan.badge && <span className="db-plan-badge">{plan.badge}</span>}
      </div>
      <div className="db-plan-price">
        {plan.price === 0 ? 'Free' : `₹${formatPrice(plan.price)}`}
        <span className="db-plan-period">{plan.period}</span>
      </div>
      <p className="db-plan-tagline">{plan.tagline}</p>
      <ul className="db-plan-features">
        {plan.features
          .filter((f) => f.included)
          .map((f) => (
            <li key={f.text}>
              <Check size={12} strokeWidth={2.75} aria-hidden="true" />
              {f.text}
            </li>
          ))}
      </ul>
      {!current && plan.id !== 'free' && (
        <a className="db-plan-cta" href={href}>
          Get {plan.name}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

function Orders({ email }) {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    let live = true
    fetchOrders(email)
      .then((rows) => live && setOrders(rows))
      .catch(() => live && setOrders([]))
    return () => {
      live = false
    }
  }, [email])

  if (orders === null) return <p className="db-muted">Loading receipts…</p>
  if (orders.length === 0)
    return <p className="db-muted">No payments yet.</p>

  return (
    <ul className="db-orders">
      {orders.map((o) => (
        <li key={o.id} className="db-order">
          <span className="db-order-plan">{planById(o.plan || 'monthly').name}</span>
          <span className="db-order-id">{o.id}</span>
          <span className={cn('db-order-status', `is-${o.status || 'pending'}`)}>
            {o.status || 'pending'}
          </span>
          <span className="db-order-amount">₹{formatPrice(Number(o.amount) || 0)}</span>
        </li>
      ))}
    </ul>
  )
}

export default function DashboardPage() {
  const { user, account, loading, plan, refresh } = useAccount()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = async () => {
    setBusy(true)
    setError('')
    try {
      await signInWithGoogle()
    } catch (e) {
      // A closed popup is a decision, not a failure worth shouting about.
      const code = e?.code || ''
      if (!code.includes('popup-closed') && !code.includes('cancelled')) {
        setError(e?.message || 'Could not sign in.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Seo
        title="Dashboard — Essixx"
        description="Your Essy plan, downloads and receipts."
        path="/dashboard"
        robots="noindex, nofollow"
      />

      <main className="db-page">
        <motion.div
          className="db-container"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {loading ? (
            <p className="db-muted db-center">Checking your session…</p>
          ) : !user ? (
            <SignedOut onSignIn={handleSignIn} busy={busy} error={error} />
          ) : (
            <>
              <header className="db-header">
                <div className="db-identity">
                  {user.photoURL ? (
                    <img className="db-avatar" src={user.photoURL} alt="" />
                  ) : (
                    <div className="db-avatar db-avatar--blank" aria-hidden="true" />
                  )}
                  <div>
                    <div className="db-name">{user.displayName || 'Your account'}</div>
                    <div className="db-email">{user.email}</div>
                  </div>
                </div>
                <div className="db-header-actions">
                  <button type="button" className="db-ghost" onClick={() => refresh()}>
                    Refresh plan
                  </button>
                  <button type="button" className="db-ghost" onClick={() => signOut()}>
                    <LogOut size={13} aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              </header>

              <section className="db-section">
                <div className="db-section-head">
                  <h2 className="db-h2">Your plan</h2>
                  <span className="db-plan-now">{planById(plan).name}</span>
                </div>
                {account?.planExpiresAt && (
                  <p className="db-muted">
                    Renews {new Date(account.planExpiresAt).toLocaleDateString('en-IN')}
                  </p>
                )}
                <div className="db-plans">
                  {PLANS.map((p) => (
                    <PlanCard key={p.id} plan={p} current={p.id === plan} email={user.email} />
                  ))}
                </div>
              </section>

              <section className="db-section">
                <h2 className="db-h2">Download Essy</h2>
                <div className="db-downloads">
                  <a className="db-download" href={MAC_DOWNLOAD} download>
                    <Download size={16} aria-hidden="true" />
                    <span>
                      <strong>macOS</strong>
                      <em>Apple silicon · .dmg</em>
                    </span>
                  </a>
                  <div className="db-download is-soon" aria-disabled="true">
                    <Monitor size={16} aria-hidden="true" />
                    <span>
                      <strong>Windows</strong>
                      <em>Not built yet</em>
                    </span>
                  </div>
                </div>
              </section>

              <section className="db-section">
                <h2 className="db-h2">Receipts</h2>
                <Orders email={user.email} />
              </section>

              <section className="db-section">
                <h2 className="db-h2">Coming to your plan</h2>
                <ul className="db-upcoming">
                  {UPCOMING.map(([name, line]) => (
                    <li key={name}>
                      <strong>{name}</strong>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="db-muted">
                  None of these are built yet. They are included when they land.
                </p>
              </section>

              <p className="db-foot">
                Questions? <Link to="/#contact">Get in touch</Link>.
              </p>
            </>
          )}
        </motion.div>
      </main>
    </>
  )
}
