import { createContext, useContext, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]
const POP_EASE = [0.34, 1.56, 0.64, 1]

const DashboardPlayContext = createContext(true)

const NAV_ITEMS = [
  { label: 'Dashboard', active: true, icon: 'grid' },
  { label: 'Projects', icon: 'folder' },
  { label: 'Analytics', icon: 'chart' },
  { label: 'Clients', icon: 'users' },
  { label: 'Goals', icon: 'target', nested: true },
  { label: 'Reports', icon: 'file' },
]

const ASSETS = [
  { name: 'Web', value: '₹28,500', change: '+4.2%', up: true, color: '#0091bf' },
  { name: 'Mobile', value: '₹35,200', change: '+8.1%', up: true, color: '#34c759' },
  { name: 'Cloud', value: '₹24,300', change: '-1.3%', up: false, color: '#5856d6' },
  { name: 'AI / Data', value: '₹18,900', change: '+12.4%', up: true, color: '#ff9500' },
]

const ACTIVITY = [
  { title: 'Bot Trading Win deployed', time: '2m ago', dot: '#34c759' },
  { title: 'New client onboarded', time: '18m ago', dot: '#0091bf' },
  { title: 'SEO audit completed', time: '1h ago', dot: '#ff9500' },
]

const CHART_HEIGHTS = Array.from({ length: 52 }).map(
  (_, i) => 22 + Math.sin(i * 0.42) * 20 + (i % 7) * 5 + (i > 38 ? 12 : 0),
)

const VARIANTS = {
  slideLeft: { hidden: { opacity: 0, x: -36 }, show: { opacity: 1, x: 0 } },
  slideRight: { hidden: { opacity: 0, x: 36 }, show: { opacity: 1, x: 0 } },
  slideUp: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  slideDown: { hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1 } },
  blur: {
    hidden: { opacity: 0, filter: 'blur(10px)', y: 12 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  pop: { hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } },
  fadeUp: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
}

function DashIcon({ name }) {
  const p = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  switch (name) {
    case 'grid':
      return (
        <svg {...p}>
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
        </svg>
      )
    case 'folder':
      return (
        <svg {...p}>
          <path d="M4 7h5l2 2h9v10H4V7z" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...p}>
          <path d="M4 18V6M10 18V10M16 18V14M22 18V8" />
        </svg>
      )
    case 'users':
      return (
        <svg {...p}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 19v-1a5 5 0 0110 0v1M16 11h6M19 8v6" />
        </svg>
      )
    case 'target':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      )
    case 'file':
      return (
        <svg {...p}>
          <path d="M8 4h8l4 4v12H8V4z" />
          <path d="M16 4v4h4" />
        </svg>
      )
    default:
      return null
  }
}

function DashPart({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.65,
  as = 'div',
}) {
  const play = useContext(DashboardPlayContext)
  const reduce = useReducedMotion()

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  const MotionTag = motion[as] ?? motion.div
  const v = VARIANTS[variant] || VARIANTS.fadeUp

  return (
    <MotionTag
      className={className}
      initial="hidden"
      animate={play ? 'show' : 'hidden'}
      variants={v}
      transition={{
        duration,
        delay,
        ease: variant === 'pop' ? POP_EASE : EASE,
      }}
    >
      {children}
    </MotionTag>
  )
}

function DashBar({ h, i, play }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <span
        className={i > 38 ? 'is-highlight' : ''}
        style={{ height: `${h}%` }}
      />
    )
  }

  return (
    <motion.span
      className={i > 38 ? 'is-highlight' : ''}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={play ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
      transition={{
        duration: 0.55,
        delay: 0.92 + i * 0.018,
        ease: EASE,
      }}
      style={{ height: `${h}%`, transformOrigin: 'bottom' }}
    />
  )
}

export default function HeroDashboard() {
  const rootRef = useRef(null)
  const inView = useInView(rootRef, { once: true, amount: 0.08 })
  const reduce = useReducedMotion()
  const play = inView || reduce

  return (
    <DashboardPlayContext.Provider value={play}>
      <div className="sx-dash" ref={rootRef} role="presentation" aria-hidden="true">
        <aside className="sx-dash-sidebar">
          <DashPart variant="blur" delay={0.14} className="sx-dash-brand-row">
            <img src="/essixx-logo.png" alt="" className="sx-dash-logo" width={28} height={28} />
            <div>
              <div className="sx-dash-brand">Essixx</div>
              <small>Studio OS</small>
            </div>
          </DashPart>

          <DashPart variant="scale" delay={0.24}>
            <div className="sx-dash-search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3-3" />
              </svg>
              <span>Search workspace</span>
              <kbd>⌘K</kbd>
            </div>
          </DashPart>

          <DashPart variant="fade" delay={0.32}>
            <p className="sx-dash-section-label">Menu</p>
          </DashPart>

          <nav className="sx-dash-nav">
            {NAV_ITEMS.map((item, i) => (
              <DashPart
                key={item.label}
                as="div"
                variant="slideLeft"
                delay={0.38 + i * 0.07}
                className="sx-dash-nav-item"
              >
                <span className={item.active ? 'is-active' : ''}>
                  <DashIcon name={item.icon} />
                  {item.label}
                  {item.nested && <em>›</em>}
                </span>
              </DashPart>
            ))}
          </nav>

          <DashPart variant="slideUp" delay={0.82} className="sx-dash-sidebar-foot">
            <div className="sx-dash-storage">
              <span>Storage</span>
              <div className="sx-dash-storage-bar"><i style={{ width: '68%' }} /></div>
              <small>6.8 GB of 10 GB</small>
            </div>
          </DashPart>
        </aside>

        <div className="sx-dash-main">
          <DashPart variant="slideDown" delay={0.1}>
            <div className="sx-dash-window-bar">
              <span /><span /><span />
              <em>essixx — dashboard</em>
            </div>
          </DashPart>

          <div className="sx-dash-main-body">
            <div className="sx-dash-top">
              <DashPart variant="slideDown" delay={0.2}>
                <div className="sx-dash-user">
                  <span className="sx-dash-avatar">KS</span>
                  <div>
                    <strong>Kartik Sabale</strong>
                    <small>Builder · Pune</small>
                  </div>
                </div>
              </DashPart>

              <DashPart variant="slideRight" delay={0.28}>
                <div className="sx-dash-meta">
                  <button type="button" className="sx-dash-icon-btn" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 01-3.4 0" /></svg>
                  </button>
                  <span className="sx-dash-chip">Last 30 days ▾</span>
                  <span className="sx-dash-date">Sat, 31 May 2026</span>
                </div>
              </DashPart>
            </div>

            <div className="sx-dash-balance-row">
              <DashPart variant="blur" delay={0.36}>
                <div>
                  <span className="sx-dash-balance-label">Total portfolio value</span>
                  <div className="sx-dash-balance">₹ 3,45,398</div>
                </div>
              </DashPart>
              <DashPart variant="pop" delay={0.5}>
                <span className="sx-dash-balance-badge">+12.4%</span>
              </DashPart>
            </div>

            <div className="sx-dash-assets">
              {ASSETS.map((a, i) => (
                <DashPart key={a.name} variant="scale" delay={0.44 + i * 0.09}>
                  <article className="sx-dash-asset" style={{ '--asset-accent': a.color }}>
                    <div className="sx-dash-asset-top">
                      <span className="sx-dash-asset-dot" />
                      <small>{a.name}</small>
                    </div>
                    <strong>{a.value}</strong>
                    <span className={a.up ? 'is-up' : 'is-down'}>{a.change}</span>
                  </article>
                </DashPart>
              ))}
            </div>

            <div className="sx-dash-chart-head">
              <DashPart variant="fadeUp" delay={0.72}>
                <div>
                  <h3>Performance overview</h3>
                  <p>Revenue across all active products</p>
                </div>
              </DashPart>
              <div className="sx-dash-legend">
                <DashPart variant="fade" delay={0.78}>
                  <span><i className="is-primary" /> Revenue</span>
                </DashPart>
                <DashPart variant="fade" delay={0.84}>
                  <span><i /> Target</span>
                </DashPart>
              </div>
            </div>

            <div className="sx-dash-chart-wrap">
              <DashPart variant="slideLeft" delay={0.8}>
                <div className="sx-dash-chart-axis" aria-hidden="true">
                  <span>₹40k</span>
                  <span>₹30k</span>
                  <span>₹20k</span>
                </div>
              </DashPart>
              <div className="sx-dash-chart">
                {CHART_HEIGHTS.map((h, i) => (
                  <DashBar key={i} h={h} i={i} play={play} />
                ))}
              </div>
            </div>

            <div className="sx-dash-stats">
              {[
                { label: 'Active projects', value: '12' },
                { label: 'Clients', value: '200+' },
                { label: 'Uptime', value: '99.9%' },
              ].map((s, i) => (
                <DashPart key={s.label} variant="slideUp" delay={1.08 + i * 0.1}>
                  <div className="sx-dash-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                </DashPart>
              ))}
            </div>

            <DashPart variant="fadeUp" delay={1.32}>
              <p className="sx-dash-activity-label">Recent activity</p>
            </DashPart>

            <ul className="sx-dash-activity">
              {ACTIVITY.map((a, i) => (
                <DashPart
                  key={a.title}
                  as="li"
                  variant="slideRight"
                  delay={1.4 + i * 0.12}
                >
                  <span className="sx-dash-activity-dot" style={{ background: a.dot }} />
                  <div>
                    <strong>{a.title}</strong>
                    <small>{a.time}</small>
                  </div>
                </DashPart>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DashboardPlayContext.Provider>
  )
}
