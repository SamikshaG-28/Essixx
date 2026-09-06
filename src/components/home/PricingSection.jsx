import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { cn } from '../../lib/utils.js'
import { PLANS, UPCOMING, formatPrice } from '../../data/plans.js'
import './PricingSection.css'

const EASE = [0.22, 1, 0.36, 1]

/* Surfaces per tier, kept here rather than in the data model: what a plan
   costs is product information, what colour its card is, is not. */
const CARD_BG = { free: '#161616', monthly: '#1e1e1e', yearly: '#252525' }

const plans = PLANS.map((plan) => ({ ...plan, bg: CARD_BG[plan.id] }))

/* Icons come from lucide (already bundled) rather than the Material Symbols
   webfont — two glyphs never justified a render-blocking font request. */

function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function SpotlightBorder({
  children,
  className,
  radius = '2xl',
  size = 520,
  intensity = 0.5,
}) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--spot-x', '-9999px')
    el.style.setProperty('--spot-y', '-9999px')
  }

  return (
    <div
      ref={ref}
      className={cn('px-spot', `px-spot--${radius}`, className)}
      style={{
        '--spot-size': `${size}px`,
        '--spot-intensity': intensity,
        '--spot-x': '-9999px',
        '--spot-y': '-9999px',
      }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="px-spot-ring" aria-hidden="true" />
      <div className="px-spot-ring px-spot-ring--inner" aria-hidden="true" />
      <div className="px-spot-content">{children}</div>
    </div>
  )
}

function AnimatedText({ children }) {
  return (
    <span className="px-anim-text">
      <span className="px-anim-text-inner" data-text={children}>
        {children}
      </span>
    </span>
  )
}

function PrimaryButton({ href, size = 'sm', children, onClick }) {
  const className = cn('px-btn px-btn--primary', size === 'sm' && 'px-btn--sm')
  if (href) {
    return (
      <a href={href} className={className}>
        <AnimatedText>{children}</AnimatedText>
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      <AnimatedText>{children}</AnimatedText>
    </button>
  )
}

function SecondaryButton({ href, size = 'sm', children, onClick }) {
  const className = cn('px-btn px-btn--secondary', size === 'sm' && 'px-btn--sm')
  if (href) {
    return (
      <a href={href} className={className}>
        <AnimatedText>{children}</AnimatedText>
      </a>
    )
  }
  return (
    <button type="button" className={className} onClick={onClick}>
      <AnimatedText>{children}</AnimatedText>
    </button>
  )
}

function PricingCard({ plan }) {

  return (
    <SpotlightBorder radius="2xl" size={460} intensity={0.5} className="px-card-shell">
      <div className="px-card" style={{ backgroundColor: plan.bg }}>
        {plan.badge && <div className="px-badge">{plan.badge}</div>}

        <FadeUp delay={0}>
          <div className="px-plan-name">{plan.name}</div>
        </FadeUp>
        <div className="px-divider" />

        <FadeUp delay={0.1}>
          <div className="px-price-row">
            <span className="px-price">
              {plan.price === 0 ? 'Free' : `₹${formatPrice(plan.price)}`}
            </span>
            {plan.period && <span className="px-price-old">{plan.period}</span>}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="px-desc">
            <strong className="px-desc-lead">{plan.tagline}</strong>{' '}
            {plan.description}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="px-cta">
            {plan.id === 'free' ? (
              <SecondaryButton href="#download" size="sm">
                Download Essy
              </SecondaryButton>
            ) : plan.featured ? (
              <PrimaryButton href={`#/checkout?plan=${plan.id}`} size="sm">
                Get {plan.name}
              </PrimaryButton>
            ) : (
              <SecondaryButton href={`#/checkout?plan=${plan.id}`} size="sm">
                Get {plan.name}
              </SecondaryButton>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <ul className="px-features">
            {plan.features.map((f, i) => (
              <li
                key={f.text}
                className={cn(
                  'px-feature',
                  i !== 0 && 'px-feature--border',
                  f.included ? 'is-included' : 'is-excluded',
                )}
              >
                <span className={cn('px-feature-icon', f.included ? 'is-on' : 'is-off')}>
                  {f.included ? (
                    <Check size={12} strokeWidth={2.75} className="px-icon-on" aria-hidden="true" />
                  ) : (
                    <X size={12} strokeWidth={2.75} className="px-icon-off" aria-hidden="true" />
                  )}
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </SpotlightBorder>
  )
}

export default function PricingSection() {
  return (
    <section id="pricing" className="px-section">
      <div className="px-container">
        <div className="px-header">
          <div className="px-header-left">
            <FadeUp>
              <span className="px-pill">
                <span className="px-pill-dot" />
                Pricing
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="px-title">
                One price.
                <br className="px-title-break" /> No credits, no limits.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="px-lead">
              Essy runs on your own machine, so usage costs us nothing and you
              are never metered. Transcribe and caption as much as you like on
              the free tier; pay only to export clean and unlock what is coming.
            </p>
          </FadeUp>
        </div>

        <div className="px-grid">
          {plans.map((p) => (
            <PricingCard key={p.id} plan={p} />
          ))}
        </div>

        {/* Named as unbuilt on purpose: a paid plan should be bought for what
            it does today, with the roadmap as the reason to stay. */}
        <FadeUp delay={0.2}>
          <div className="px-upcoming">
            <div className="px-upcoming-head">
              Included as they land — none of these are built yet
            </div>
            <ul className="px-upcoming-grid">
              {UPCOMING.map(([name, line]) => (
                <li key={name} className="px-upcoming-item">
                  <span className="px-upcoming-name">{name}</span>
                  <span className="px-upcoming-line">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
      {/* keep old #hire deep links working */}
      <div id="hire" className="px-hire-anchor" aria-hidden="true" />
    </section>
  )
}
