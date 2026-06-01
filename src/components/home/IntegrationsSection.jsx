import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal.jsx'

const EASE = [0.22, 1, 0.36, 1]

const STATS = [
  { value: '40+', label: 'Live integrations' },
  { value: '<1s', label: 'Sync latency' },
  { value: '99.9%', label: 'Uptime SLA' },
]

const CATEGORIES = [
  {
    id: 'payments',
    label: 'Payment Gateways',
    desc: 'Stripe, PayPal, Razorpay & UPI-ready checkout flows',
    integrations: ['stripe', 'paypal', 'razorpay'],
  },
  {
    id: 'backend',
    label: 'Backend & Database',
    desc: 'Firebase & Supabase — auth, realtime DB & serverless APIs',
    integrations: ['firebase', 'supabase'],
  },
  {
    id: 'ai',
    label: 'AI Tools',
    desc: 'OpenAI, Claude & Gemini for smart product features',
    integrations: ['openai', 'claude', 'gemini'],
  },
]

const BOARD_TILES = [
  { id: 'stripe', icon: 'stripe', name: 'Stripe', tag: 'Gateway', col: 1, row: 1, cardImage: '/integrations/stripe.png' },
  { id: 'razorpay', icon: 'razorpay', name: 'Razorpay', tag: 'Gateway', col: 2, row: 1, cardImage: '/integrations/razorpay.png' },
  { id: 'paypal', icon: 'paypal', name: 'PayPal', tag: 'Gateway', col: 3, row: 1, cardImage: '/integrations/paypal.png' },
  { id: 'firebase', icon: 'firebase', name: 'Firebase', tag: 'Backend', col: 1, row: 2, cardImage: '/integrations/firebase.png' },
  { id: 'supabase', icon: 'supabase', name: 'Supabase', tag: 'Database', col: 3, row: 2, cardImage: '/integrations/supabase.png' },
  { id: 'openai', icon: 'openai', name: 'OpenAI', tag: 'AI', col: 1, row: 3, cardImage: '/integrations/openai.png' },
  { id: 'claude', icon: 'claude', name: 'Claude', tag: 'AI', col: 2, row: 3, cardImage: '/integrations/claude.png' },
  { id: 'gemini', icon: 'gemini', name: 'Gemini', tag: 'AI', col: 3, row: 3, cardImage: '/integrations/gemini.png' },
]

function IntegrationIcon({ name, size = 22 }) {
  switch (name) {
    case 'stripe':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13.1 7.8c0-.9.7-1.2 1.8-1.2 1.6 0 3.5.5 5 1.4V5.1C18.8 4.2 17.2 3.8 15.5 3.8 11.5 3.8 9 5.6 9 8.5c0 5.1 7 4.2 7 6.4 0 1-.9 1.3-2.1 1.3-1.8 0-4-.7-5.8-1.7v4.9c2 0.9 3.9 1.3 5.8 1.3 4.1 0 6.8-2 6.8-5.1 0-5.5-7.2-4.6-7.2-7.6z" fill="#635bff" />
        </svg>
      )
    case 'paypal':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8.2 7.5h4.6c2.2 0 3.5 1.1 3.5 2.8 0 3-2.6 3.6-4.3 3.6H9.8L9.2 18H6.8l1.4-10.5z" fill="#009cde" />
          <path d="M9.8 7.5H7.4L6 18h2.4l.6-3.1h1.7c3.1 0 5.2-1.3 5.2-4.2 0-1.9-1.5-3.2-3.5-3.2H9.8z" fill="#012169" opacity="0.85" />
        </svg>
      )
    case 'razorpay':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="3" fill="#072654" />
          <path d="M8 9.5h1.8c1.2 0 2 .6 2 1.6s-.8 1.6-2 1.6H9.2V15H8V9.5zm1.2 2.4h.5c.5 0 .8-.2.8-.6s-.3-.6-.8-.6h-.5v1.2zM13.2 9.5h2.4c1.4 0 2.3.8 2.3 2.1v.3c0 1.3-.9 2.1-2.3 2.1h-1.2V15h-1.2V9.5zm2.3 3.2c.7 0 1.1-.4 1.1-1s-.4-1-1.1-1h-1.1v2z" fill="#3395ff" />
        </svg>
      )
    case 'firebase':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4.5 18.5 11 4.2c.2-.5.9-.5 1.1 0l6.5 14.3H4.5z" fill="#ffa000" />
          <path d="M4.5 18.5 12 13.5l7.5 5H4.5z" fill="#ffca28" />
          <path d="M12 4.2 4.5 18.5 12 13.5 19.5 18.5 12 4.2z" fill="#ff8f00" opacity="0.85" />
        </svg>
      )
    case 'supabase':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M15.5 2.2 8.2 13.4h5.1L8.5 21.8l7.3-11.2h-5.1L15.5 2.2z" fill="#3ECF8E" />
        </svg>
      )
    case 'openai':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3.5a8.2 8.2 0 015.8 2.4l1.4-1.4a10 10 0 10-3.5 3.5l1.4-1.4A8.2 8.2 0 0112 3.5zm-5.8 2.4A8.2 8.2 0 0112 3.5v2.2a6 6 0 00-4.2 1.7L6.2 5.9zM4.5 12a8.2 8.2 0 002.4-5.8H4.7a10 10 0 000 10h2.2A8.2 8.2 0 014.5 12zm7.5 7.5a8.2 8.2 0 01-5.8-2.4l-1.4 1.4a10 10 0 103.5-3.5l-1.4 1.4A8.2 8.2 0 0112 19.5zm5.8-2.4A8.2 8.2 0 0112 19.5v-2.2a6 6 0 004.2-1.7l1.6 1.6zM19.5 12a8.2 8.2 0 01-2.4 5.8h2.2a10 10 0 000-10h-2.2A8.2 8.2 0 0119.5 12z" fill="#10a37f" />
        </svg>
      )
    case 'claude':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" fill="#d97757" />
          <path d="M12 7.5c-1.2 0-2.2.4-3 1.1-.8.7-1.2 1.7-1.2 2.9 0 1.1.4 2 1.1 2.7.7.7 1.6 1.1 2.7 1.3v1.5h1.8v-1.5c1.1-.2 2-.6 2.7-1.3.7-.7 1.1-1.6 1.1-2.7 0-1.2-.4-2.2-1.2-2.9-.8-.7-1.8-1.1-3-1.1zm0 1.8c.6 0 1.1.2 1.5.6.4.4.6.9.6 1.6 0 .7-.2 1.2-.6 1.6-.4.4-.9.6-1.5.6s-1.1-.2-1.5-.6c-.4-.4-.6-.9-.6-1.6 0-.7.2-1.2.6-1.6.4-.4.9-.6 1.5-.6z" fill="#fff" />
        </svg>
      )
    case 'gemini':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.7L12 16.5 6.4 20.5l2.1-6.7L3 9.8h6.8L12 3z" fill="#4285f4" />
        </svg>
      )
    default:
      return null
  }
}

function SyncPulse({ play, reduce }) {
  return (
    <span className="sx-int-sync-dot" aria-hidden="true">
      <motion.span
        className="sx-int-sync-dot-ring"
        animate={play && !reduce ? { scale: [1, 1.8], opacity: [0.5, 0] } : { scale: 1, opacity: 0 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
      <span className="sx-int-sync-dot-core" />
    </span>
  )
}

const HUB_CELL = { col: 2, row: 2 }

function gridCenter(col, row) {
  return {
    x: ((col - 0.5) / 3) * 100,
    y: ((row - 0.5) / 3) * 100,
  }
}

function IntegrationBoard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const reduce = useReducedMotion()
  const play = inView || reduce
  const hub = gridCenter(HUB_CELL.col, HUB_CELL.row)

  return (
    <motion.div
      className={`sx-int-board${play && !reduce ? ' is-syncing' : ''}`}
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={play ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 24 }}
      transition={{ duration: 0.85, ease: EASE }}
    >
      <svg className="sx-int-board-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {BOARD_TILES.map((tile, i) => {
          const target = gridCenter(tile.col, tile.row)
          return (
            <motion.line
              key={tile.id}
              x1={hub.x}
              y1={hub.y}
              x2={target.x}
              y2={target.y}
              className="sx-int-board-line"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.07, ease: EASE }}
            />
          )
        })}
      </svg>

      <div className="sx-int-tiles">
        {BOARD_TILES.map((tile, i) => (
          <motion.article
            key={tile.id}
            className={`sx-int-tile${tile.cardImage ? ' sx-int-tile--brand' : ''}`}
            style={{
              '--int-col': tile.col,
              '--int-row': tile.row,
              ...(tile.cardImage ? { backgroundImage: `url(${tile.cardImage})` } : null),
            }}
            aria-label={tile.name}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={
              play
                ? {
                    opacity: 1,
                    y: reduce ? 0 : [0, -3, 0],
                    scale: 1,
                  }
                : { opacity: 0, y: 20, scale: 0.9 }
            }
            transition={{
              opacity: { duration: 0.5, delay: 0.28 + i * 0.08, ease: EASE },
              y: reduce
                ? { duration: 0.5, delay: 0.28 + i * 0.08, ease: EASE }
                : {
                    duration: 2.8 + (i % 3) * 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.1 + i * 0.08,
                  },
              scale: { duration: 0.5, delay: 0.28 + i * 0.08, ease: [0.34, 1.45, 0.64, 1] },
            }}
          >
            {!tile.cardImage && <IntegrationIcon name={tile.icon} size={32} />}
          </motion.article>
        ))}

        <motion.div
          className="sx-int-hub"
          style={{ '--int-col': HUB_CELL.col, '--int-row': HUB_CELL.row }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            play
              ? {
                  opacity: 1,
                  scale: 1,
                  y: reduce ? 0 : [0, -6, 0],
                }
              : { opacity: 0, scale: 0.85 }
          }
          transition={{
            opacity: { duration: 0.7, delay: 0.15, ease: EASE },
            scale: { duration: 0.7, delay: 0.15, ease: [0.34, 1.45, 0.64, 1] },
            y: reduce
              ? { duration: 0.7, delay: 0.15, ease: EASE }
              : { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
          }}
        >
          <motion.div
            className="sx-int-hub-inner"
            animate={
              play && !reduce
                ? {
                    boxShadow: [
                      '0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 48px rgba(0, 0, 0, 0.22)',
                      '0 0 0 1px rgba(130, 195, 65, 0.35), 0 24px 56px rgba(130, 195, 65, 0.18)',
                      '0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 48px rgba(0, 0, 0, 0.22)',
                    ],
                  }
                : undefined
            }
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <img src="/essixx-logo.png" alt="" className="sx-int-hub-logo" aria-hidden="true" draggable={false} />
            <div className="sx-int-hub-meta">
              <strong>Essixx Core</strong>
              <span className="sx-int-hub-status">
                <SyncPulse play={play} reduce={reduce} />
                Live sync
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function CategoryCard({ category }) {
  return (
    <div className="sx-int-category">
      <div className="sx-int-category-icons">
        {category.integrations.map((icon) => (
          <span key={icon} className="sx-int-category-icon">
            <IntegrationIcon name={icon} size={18} />
          </span>
        ))}
      </div>
      <h3>{category.label}</h3>
      <p>{category.desc}</p>
    </div>
  )
}

export default function IntegrationsSection() {
  return (
    <section id="projects" className="sx-integrations">
      <div className="sx-int-bg" aria-hidden="true">
        <div className="sx-int-grid" />
        <div className="sx-int-glow sx-int-glow--left" />
        <div className="sx-int-glow sx-int-glow--right" />
      </div>

      <div className="sx-integrations-inner">
        <div className="sx-int-layout">
          <Reveal className="sx-int-copy-col" blur>
            <span className="sx-int-badge">Integrations</span>
            <h2 className="sx-int-title">
              Plug into your
              <br />
              entire stack
            </h2>
            <p className="sx-int-lead">
              Connect payment gateways, cloud backends, AI models, and data
              services — unified in one system with real-time sync across every layer.
            </p>

            <ul className="sx-int-stats">
              {STATS.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="sx-int-visual-col" blur>
            <IntegrationBoard />
          </Reveal>
        </div>

        <div className="sx-int-categories">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={0.08 + i * 0.1} y={24}>
              <CategoryCard category={cat} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
