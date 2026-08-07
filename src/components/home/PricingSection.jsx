import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils.js'
import './PricingSection.css'

const EASE = [0.22, 1, 0.36, 1]

const plans = [
  {
    name: 'Website',
    price: '19,999',
    originalPrice: '1,70,000',
    description: 'One project. Freelancer rates. Modern, responsive, SEO-ready.',
    bg: '#161616',
    features: [
      { text: 'Responsive business website', included: true },
      { text: 'SEO-friendly pages', included: true },
      { text: 'Contact & enquiry flows', included: true },
      { text: 'Custom web app features', included: false },
      { text: 'Mobile app (iOS / Android)', included: false },
    ],
  },
  {
    name: 'Website + Product',
    price: '49,999',
    originalPrice: '2,50,000',
    description: 'Best for startups who need more than a brochure site.',
    bg: '#252525',
    features: [
      { text: 'Responsive business website', included: true },
      { text: 'SEO-friendly pages', included: true },
      { text: 'Contact & enquiry flows', included: true },
      { text: 'Custom web app features', included: true },
      { text: 'Mobile app (iOS / Android)', included: true },
    ],
    featured: true,
    badge: 'Best Value',
  },
]

function MIcon({
  name,
  size = 20,
  weight = 400,
  fill = 0,
  grade = 0,
  opticalSize = 24,
  className,
}) {
  return (
    <span
      className={cn('material-symbols-outlined px-micon', className)}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
      }}
    >
      {name}
    </span>
  )
}

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
  const contactHref = 'mailto:info@essixx.com?subject=Website%20development%20enquiry'

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
            <span className="px-price">₹{plan.price}</span>
            {plan.originalPrice && (
              <span className="px-price-old">₹{plan.originalPrice}</span>
            )}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="px-desc">{plan.description}</p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="px-cta">
            {plan.featured ? (
              <PrimaryButton href={contactHref} size="sm">
                Get Started
              </PrimaryButton>
            ) : (
              <SecondaryButton href={contactHref} size="sm">
                Get Started
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
                    <MIcon name="check" size={12} className="px-icon-on" />
                  ) : (
                    <MIcon name="close" size={12} className="px-icon-off" />
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
                Clear pricing plans
                <br className="px-title-break" /> that scale with you.
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <p className="px-lead">
              Freelancer rates. Clear scope. Pick the plan that fits how far you want
              to go — website development starts from ₹19,999 only.
            </p>
          </FadeUp>
        </div>

        <div className="px-grid">
          {plans.map((p) => (
            <PricingCard key={p.name} plan={p} />
          ))}
        </div>
      </div>
      {/* keep old #hire deep links working */}
      <div id="hire" className="px-hire-anchor" aria-hidden="true" />
    </section>
  )
}
