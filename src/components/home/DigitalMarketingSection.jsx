import { Reveal } from './Reveal.jsx'

const HIGHLIGHTS = [
  {
    icon: 'rocket',
    title: 'Complete business setup',
    desc: 'Everything you need to start strong',
  },
  {
    icon: 'globe',
    title: 'Strong online presence',
    desc: 'Professional website & social media growth',
  },
  {
    icon: 'chart',
    title: 'More leads & sales',
    desc: 'Targeted marketing that brings results',
  },
  {
    icon: 'laptop',
    title: 'Powerful laptop',
    desc: 'Work smart with high performance',
  },
  {
    icon: 'headset',
    title: 'Ongoing support',
    desc: "We're with you every step",
  },
]

const PLANS = [
  {
    id: 'starter',
    name: 'Starter Kit',
    price: '₹49,999',
    per: '/month',
    popular: false,
    adBudget: '₹10,000 / month',
    groups: [
      {
        label: 'Website',
        items: [
          '5 pages website',
          'Responsive design',
          'Basic SEO',
          'Contact / enquiry form',
          '1 month support',
        ],
      },
      {
        label: 'Digital marketing — all platforms',
        items: [
          '12 posts per month',
          '4 reels per month',
          'Facebook + Instagram + YouTube',
          '1 podcast per month free',
        ],
      },
      {
        label: 'Laptop included',
        items: [
          'Intel Core i3 / 8GB RAM',
          '512GB SSD / 15.6" FHD',
          'Windows 11 · bag included',
        ],
      },
    ],
  },
  {
    id: 'growth',
    name: 'Growth Kit',
    price: '₹99,999',
    per: '/month',
    popular: true,
    adBudget: '₹20,000 / month',
    groups: [
      {
        label: 'Website',
        items: [
          '8–10 pages website',
          'Premium design',
          'Basic SEO · contact form',
          'Blog setup',
          '2 months support',
        ],
      },
      {
        label: 'Digital marketing — all platforms',
        items: [
          '20 posts per month',
          '8 reels per month',
          'Facebook + Instagram + YouTube',
          '1 podcast per month free',
        ],
      },
      {
        label: 'Laptop included',
        items: [
          'Intel Core i5 / 16GB RAM',
          '512GB SSD / 15.6" FHD',
          'Windows 11 · bag included',
        ],
      },
    ],
  },
  {
    id: 'premium',
    name: 'Premium Kit',
    price: '₹1,49,999',
    per: '/month',
    popular: false,
    adBudget: '₹30,000 / month',
    groups: [
      {
        label: 'Website',
        items: [
          '10–15 pages website',
          'Premium design',
          'Advanced SEO · blog setup',
          'WhatsApp integration',
          '3 months support',
        ],
      },
      {
        label: 'Digital marketing — all platforms',
        items: [
          '30 posts per month',
          '12 reels per month',
          'Facebook + Instagram + YouTube',
          '1 podcast per month free',
        ],
      },
      {
        label: 'Laptop included',
        items: [
          'Intel Core i7 / 16GB RAM',
          '512GB SSD / 15.6" FHD',
          'Windows 11 · bag included',
        ],
      },
    ],
  },
]

const ALL_PLANS_INCLUDE = [
  'Domain & hosting (1 year)',
  'SSL certificate',
  'Professional business email (1 year)',
  'Content strategy & planning',
  'Monthly performance report',
  'Dedicated account manager',
  'Support via WhatsApp & email',
]

function HighlightIcon({ name }) {
  const p = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  switch (name) {
    case 'rocket':
      return (
        <svg {...p}>
          <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2 0-2.8-.8-.7-2.2-.7-3 .8z" />
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...p}>
          <path d="M4 19V9M10 19V5M16 19v-7M22 19V7" />
        </svg>
      )
    case 'laptop':
      return (
        <svg {...p}>
          <rect x="4" y="5" width="16" height="11" rx="1.5" />
          <path d="M2 19h20" />
        </svg>
      )
    case 'headset':
      return (
        <svg {...p}>
          <path d="M4 14v-3a8 8 0 0116 0v3" />
          <rect x="3" y="14" width="4" height="6" rx="1.5" />
          <rect x="17" y="14" width="4" height="6" rx="1.5" />
        </svg>
      )
    default:
      return null
  }
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

function scrollToContact() {
  const el = document.getElementById('contact')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function PlanCard({ plan }) {
  return (
    <article className={`sx-dm-plan${plan.popular ? ' is-popular' : ''}`}>
      {plan.popular && <span className="sx-dm-plan-flag">Most popular</span>}

      <header className="sx-dm-plan-head">
        <h3>{plan.name}</h3>
        <p className="sx-dm-plan-price">
          <strong>{plan.price}</strong>
          <span>{plan.per}</span>
        </p>
      </header>

      {plan.groups.map((group) => (
        <div key={group.label} className="sx-dm-plan-group">
          <h4>{group.label}</h4>
          <ul>
            {group.items.map((item) => (
              <li key={item}>
                <span className="sx-dm-check" aria-hidden="true">
                  <CheckIcon />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="sx-dm-plan-budget">
        <span>Recommended ad budget</span>
        <strong>{plan.adBudget}</strong>
        <em>Ad budget is separate from the package</em>
      </div>

      <button type="button" className="sx-dm-plan-cta" onClick={scrollToContact}>
        Get started
      </button>
    </article>
  )
}

export default function DigitalMarketingSection() {
  return (
    <>
      {/* ---- Essixx Digital Marketing ---- */}
      <section id="digital-marketing" className="sx-dm">
        <div className="sx-dm-bg" aria-hidden="true">
          <div className="sx-dm-grid" />
        </div>

        <div className="sx-dm-inner">
          <Reveal className="sx-dm-head" blur>
            <span className="sx-int-badge">Essixx Digital Marketing</span>
            <h2 className="sx-dm-title">
              <span className="sx-dm-title-muted">Build your</span> business kit
            </h2>
            <p className="sx-dm-lead">
              We build. We manage. You grow. A complete monthly solution for
              startups, entrepreneurs and businesses — professional website,
              result-driven digital marketing and a powerful laptop, all in one plan.
            </p>
          </Reveal>

          <div className="sx-dm-highlights">
            {HIGHLIGHTS.map((item, i) => (
              <Reveal key={item.title} delay={0.08 + i * 0.07} y={22}>
                <div className="sx-dm-highlight">
                  <span className="sx-dm-highlight-icon">
                    <HighlightIcon name={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Plans ---- */}
      <section id="plans" className="sx-dm-plans">
        <div className="sx-dm-plans-inner">
          <Reveal className="sx-dm-plans-head">
            <span className="sx-int-badge">Plans & pricing</span>
            <h2 className="sx-dm-title">
              One monthly plan.
              <br />
              <span className="sx-dm-title-muted">Everything included.</span>
            </h2>
          </Reveal>

          <div className="sx-dm-plans-grid">
            {PLANS.map((plan, i) => (
              <Reveal key={plan.id} delay={0.08 + i * 0.1} y={28}>
                <PlanCard plan={plan} />
              </Reveal>
            ))}
          </div>

          <div className="sx-dm-extras">
            <Reveal className="sx-dm-extra sx-dm-extra--include" delay={0.08}>
              <h3>All plans include</h3>
              <ul>
                {ALL_PLANS_INCLUDE.map((item) => (
                  <li key={item}>
                    <span className="sx-dm-check" aria-hidden="true">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="sx-dm-extra sx-dm-extra--podcast" delay={0.16}>
              <h3>Podcast service</h3>
              <p>1 podcast per month is free in all plans.</p>
              <div className="sx-dm-podcast-price">
                <span>Additional podcast</span>
                <strong>₹5,000 / podcast</strong>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <p className="sx-dm-note">
              This is a monthly subscription plan. Plans can be upgraded, downgraded
              or cancelled with 30 days notice. Laptop provided on rental basis with
              the plan. Terms & conditions apply.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
