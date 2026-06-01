import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal.jsx'

const EASE = [0.22, 1, 0.36, 1]

const CORE_LAYERS = [
  { id: 'ai', label: 'AI INTELLIGENCE', x: 10, y: 50, shape: 'pentagon', accent: true, delay: 1.05 },
  { id: 'web3', label: 'WEB3 LAYER', x: 82, y: 20, shape: 'circle', accent: true, delay: 0.88 },
  { id: 'data', label: 'DATA INFRASTRUCTURE', x: 84, y: 78, shape: 'circle', accent: false, delay: 1.22 },
  { id: 'markets', label: 'TRADITIONAL MARKETS', x: 14, y: 80, shape: 'square', accent: false, delay: 1.15 },
]

const CORE_FEATURES = [
  {
    icon: 'globe',
    title: 'Unified infrastructure',
    body: 'All financial layers connected into one structured system',
  },
  {
    icon: 'chart',
    title: 'Cross-market intelligence',
    body: 'Analyze and operate across Web3, traditional finance, and data systems',
  },
  {
    icon: 'bolt',
    title: 'Seamless execution',
    body: 'From insight to action — everything happens in one environment.',
  },
]

const HUB = { x: 50, y: 48 }

const SOLID_SPOKES = [
  { x2: 10, y2: 50, accent: true, delay: 0.2 },
  { x2: 82, y2: 20, accent: true, delay: 0.32 },
  { x2: 84, y2: 78, accent: false, delay: 0.44 },
  { x2: 14, y2: 80, accent: false, delay: 0.56 },
]

const DASHED_WEB = [
  [10, 50, 14, 80],
  [14, 80, 84, 78],
  [84, 78, 82, 20],
  [82, 20, 10, 50],
  [10, 50, 82, 20],
  [14, 80, 82, 20],
  [8, 28, 10, 50],
  [8, 28, 82, 20],
  [92, 42, 82, 20],
  [92, 42, 84, 78],
  [92, 68, 84, 78],
  [8, 68, 14, 80],
  [8, 68, 10, 50],
]

const ANCHORS = [
  [7.2, 26.5],
  [90.8, 40.8],
  [90.6, 66.8],
  [6.8, 66.5],
]

function WebLine({ x1, y1, x2, y2, dashed, accent, delay, play }) {
  const cls = [
    dashed ? 'sx-core-line sx-core-line--dashed' : 'sx-core-line sx-core-line--solid',
    accent ? 'is-accent' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      className={cls}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={play ? { pathLength: 1, opacity: dashed ? 0.85 : 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ duration: dashed ? 0.5 : 0.72, delay, ease: EASE }}
    />
  )
}

function CoreNodeIcon({ shape, accent }) {
  if (shape === 'pentagon') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
        <polygon
          points="12,2 22,9 18,22 6,22 2,9"
          fill={accent ? '#82c341' : '#b0b0b5'}
        />
      </svg>
    )
  }
  if (shape === 'square') {
    return (
      <span
        className={`sx-core-node-icon sx-core-node-icon--square${accent ? ' is-accent' : ''}`}
        aria-hidden="true"
      />
    )
  }
  return (
    <span
      className={`sx-core-node-icon sx-core-node-icon--circle${accent ? ' is-accent' : ''}`}
      aria-hidden="true"
    />
  )
}

function FeatureIcon({ name }) {
  const p = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }
  if (name === 'globe') {
    return (
      <svg {...p}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
      </svg>
    )
  }
  if (name === 'chart') {
    return (
      <svg {...p}>
        <path d="M4 18V8M10 18V4M16 18v-6M22 18v-10" />
      </svg>
    )
  }
  return (
    <svg {...p}>
      <path d="M13 2L4 14h7l-1 8 10-14H13L13 2z" />
    </svg>
  )
}

function CoreWebDiagram() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const reduce = useReducedMotion()
  const play = inView || reduce

  return (
    <div className="sx-core-stage">
      <div className="sx-core-diagram" ref={ref}>
        <svg className="sx-core-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {SOLID_SPOKES.map((spoke) => (
            <WebLine
              key={`spoke-${spoke.x2}-${spoke.y2}`}
              x1={HUB.x}
              y1={HUB.y}
              x2={spoke.x2}
              y2={spoke.y2}
              accent={spoke.accent}
              delay={spoke.delay}
              play={play}
            />
          ))}

          {DASHED_WEB.map(([x1, y1, x2, y2], i) => (
            <WebLine
              key={`web-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              dashed
              delay={0.62 + i * 0.07}
              play={play}
            />
          ))}

          {ANCHORS.map(([x, y], i) => (
            <motion.rect
              key={`anchor-${i}`}
              x={x}
              y={y}
              width={2.2}
              height={2.2}
              className="sx-core-anchor"
              initial={{ opacity: 0, scale: 0 }}
              animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.35, delay: 0.9 + i * 0.08, ease: EASE }}
              style={{ transformOrigin: `${x + 1.1}px ${y + 1.1}px` }}
            />
          ))}
        </svg>

        <motion.div
          className="sx-core-hub"
          style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.span
            className="sx-core-hub-label"
            initial={{ opacity: 0, y: 8 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          >
            ESSIXX CORE
          </motion.span>

          <motion.div
            className="sx-core-hub-frame"
            initial={{ opacity: 0, rotate: -8 }}
            animate={play ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -8 }}
            transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          >
            <span className="sx-core-hub-bracket sx-core-hub-bracket--tl" />
            <span className="sx-core-hub-bracket sx-core-hub-bracket--tr" />
            <span className="sx-core-hub-bracket sx-core-hub-bracket--bl" />
            <span className="sx-core-hub-bracket sx-core-hub-bracket--br" />
            <motion.span
              className="sx-core-hub-dot sx-core-hub-dot--live"
              animate={
                play && !reduce
                  ? { scale: [1, 1.08, 1], boxShadow: [
                      '0 0 0 6px rgba(130, 195, 65, 0.2)',
                      '0 0 0 14px rgba(130, 195, 65, 0.06)',
                      '0 0 0 6px rgba(130, 195, 65, 0.2)',
                    ] }
                  : { scale: 1 }
              }
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="sx-core-hub-dot-inner" />
            </motion.span>
          </motion.div>

          <motion.p
            className="sx-core-hub-desc"
            initial={{ opacity: 0, y: 10 }}
            animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
          >
            Unified capital system
            <br />
            AI-powered orchestration
            <br />
            Central intelligence layer
          </motion.p>
        </motion.div>

        {CORE_LAYERS.map((node) => (
          <motion.div
            key={node.id}
            className="sx-core-node"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={play ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{
              duration: 0.5,
              delay: node.delay,
              ease: [0.34, 1.45, 0.64, 1],
            }}
          >
            <CoreNodeIcon shape={node.shape} accent={node.accent} />
            <motion.span
              initial={{ opacity: 0 }}
              animate={play ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: node.delay + 0.15 }}
            >
              {node.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function CoreCapabilities() {
  return (
    <section id="studio" className="sx-core">
      <div className="sx-core-bg" aria-hidden="true">
        <div className="sx-core-grid" />
        <div className="sx-core-glow" />
      </div>

      <div className="sx-core-inner">
        <Reveal className="sx-core-top">
          <h2 className="sx-core-title">
            <span className="sx-muted">One platform.</span>
            <br />
            Multiple intelligence layers.
          </h2>
        </Reveal>

        <CoreWebDiagram />

        <div className="sx-core-bottom">
          <Reveal className="sx-core-bottom-left" delay={0.12}>
            <span className="sx-core-cap-badge">Core capabilities</span>
            <h3 className="sx-core-bottom-title">
              Powering every layer of your
              <br />
              digital stack
            </h3>
          </Reveal>

          <div className="sx-core-features">
            {CORE_FEATURES.map((item, i) => (
              <Reveal key={item.title} className="sx-core-feature" delay={0.16 + i * 0.08}>
                <div className="sx-core-feature-icon">
                  <FeatureIcon name={item.icon} />
                </div>
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
