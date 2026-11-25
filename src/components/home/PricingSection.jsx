import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { PLANS, UPCOMING, formatPrice } from '../../data/plans.js'
import { MAC_BUILD } from '../../data/downloads.js'
import './PricingSection.css'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Plans.
 *
 * A monthly/yearly toggle rather than three cards side by side: Monthly and
 * Yearly are the same product at two billing periods, and showing them as
 * separate tiers asks the reader to compare feature lists that are identical.
 * Two cards — what you get for nothing, and what you get for paying — is the
 * decision actually being made.
 *
 * The saving is computed from the prices rather than written into the copy,
 * so it cannot drift when one of them is changed.
 */
const FREE = PLANS.find((p) => p.id === 'free')
const MONTHLY = PLANS.find((p) => p.id === 'monthly')
const YEARLY = PLANS.find((p) => p.id === 'yearly')

const MONTHS_FREE = Math.round(12 - YEARLY.price / MONTHLY.price)
const SAVING = Math.round((1 - YEARLY.price / (MONTHLY.price * 12)) * 100)

function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function FeatureList({ features }) {
  return (
    <ul className="pr-features">
      {features.map((f) => (
        <li key={f.text} className={f.included ? '' : 'is-out'}>
          {f.included ? (
            <Check size={15} strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <Minus size={15} strokeWidth={2.5} aria-hidden="true" />
          )}
          <span>{f.text}</span>
        </li>
      ))}
    </ul>
  )
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(true)
  const paid = yearly ? YEARLY : MONTHLY

  return (
    <section id="pricing" className="pr-section">
      <div className="pr-inner">
        <FadeUp>
          <p className="pr-eyebrow">Pricing</p>
          <h2 className="pr-title">Buy it once a year, or not at all.</h2>
          <p className="pr-lead">
            Essy runs on your machine, so there is nothing to meter — no credits,
            no per-minute billing and no export queue. You are paying to take the
            mark off and lift the limits, not for compute.
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="pr-toggle" role="group" aria-label="Billing period">
            <button
              type="button"
              className={yearly ? '' : 'is-on'}
              aria-pressed={!yearly}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={yearly ? 'is-on' : ''}
              aria-pressed={yearly}
              onClick={() => setYearly(true)}
            >
              Yearly
              <span className="pr-save">save {SAVING}%</span>
            </button>
          </div>
        </FadeUp>

        <div className="pr-grid">
          <FadeUp delay={0.12} className="pr-cell">
            <article className="pr-card">
              <header className="pr-head">
                <h3>{FREE.name}</h3>
                <p className="pr-tagline">{FREE.tagline}</p>
              </header>
              <div className="pr-price">
                <strong>₹0</strong>
                <span>forever</span>
              </div>
              <a className="pr-btn pr-btn--ghost" href={MAC_BUILD.href} download>
                Download for macOS
              </a>
              <FeatureList features={FREE.features} />
            </article>
          </FadeUp>

          <FadeUp delay={0.18} className="pr-cell">
            <article className="pr-card pr-card--featured">
              <span className="pr-badge">{YEARLY.badge}</span>
              <header className="pr-head">
                <h3>Pro</h3>
                <p className="pr-tagline">
                  {yearly ? YEARLY.tagline : MONTHLY.tagline}
                </p>
              </header>
              <div className="pr-price">
                {/* Keyed on the period so the number animates when the toggle
                    moves — otherwise the only feedback is a silent relabel. */}
                <motion.strong
                  key={paid.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  ₹{formatPrice(paid.price)}
                </motion.strong>
                <span>{paid.period}</span>
              </div>
              <a className="pr-btn" href={`/checkout?plan=${paid.id}`}>
                Get Pro
              </a>
              <FeatureList features={MONTHLY.features} />
              {yearly && (
                <p className="pr-note">
                  {MONTHS_FREE} months free against the monthly price, and the
                  price is locked for the year.
                </p>
              )}
            </article>
          </FadeUp>
        </div>

        <FadeUp delay={0.24}>
          <div className="pr-upcoming">
            <p className="pr-upcoming-label">
              Coming to Pro — named as unbuilt, so you buy it for what it does
              today
            </p>
            <ul>
              {UPCOMING.map(([name, line]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
