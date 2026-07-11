import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal.jsx'

const EASE = [0.22, 1, 0.36, 1]
const CYCLE_MS = 3600

const PHASES = [
  {
    id: 'discover',
    num: '01',
    title: 'Discover',
    desc: 'Workshops, research and a sharp scope — we map the problem before a single line of code.',
    tags: ['Strategy', 'Research', 'Scope'],
    stat: { value: '1–2', label: 'weeks to clarity' },
  },
  {
    id: 'design',
    num: '02',
    title: 'Design',
    desc: 'Interfaces and journeys shaped in the open. You see real screens evolving every week.',
    tags: ['UI / UX', 'Prototype', 'Review'],
    stat: { value: '100%', label: 'design transparency' },
  },
  {
    id: 'build',
    num: '03',
    title: 'Build',
    desc: 'Modern stacks, clean code and CI from day one — with a working demo every sprint.',
    tags: ['Develop', 'Test', 'Iterate'],
    stat: { value: '99.2%', label: 'on-time delivery' },
  },
  {
    id: 'launch',
    num: '04',
    title: 'Launch',
    desc: 'Ship, measure, improve. Support and growth marketing keep momentum after go-live.',
    tags: ['Deploy', 'Measure', 'Grow'],
    stat: { value: '+24%', label: 'faster time to market' },
  },
]

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function IntroSection() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return undefined
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % PHASES.length)
    }, CYCLE_MS)
    return () => clearInterval(timer)
  }, [reduce, paused])

  return (
    <section className="sx-intro">
      <div className="sx-intro-inner">
        <div className="sx-intro-head">
          <Reveal className="sx-intro-copy">
            <span className="sx-badge sx-badge--outline">Essixx studio</span>
            <h2>
              From concept to launch,
              <br />
              with clarity at every step.
            </h2>
          </Reveal>

          <Reveal className="sx-intro-side" delay={0.1}>
            <p>
              We help startups and growing businesses ship modern websites, apps,
              and digital products — fast, focused, and built to last.
            </p>
            <button type="button" className="sx-intro-cta" onClick={scrollToContact}>
              Start a project
              <span aria-hidden="true">→</span>
            </button>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <div
            className="sx-journey"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {PHASES.map((phase, i) => {
              const isActive = i === active
              return (
                <button
                  key={phase.id}
                  type="button"
                  className={`sx-journey-step${isActive ? ' is-active' : ''}`}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={isActive}
                >
                  <div className="sx-journey-step-top">
                    <span className="sx-journey-num">{phase.num}</span>
                    <span className="sx-journey-marker" aria-hidden="true">
                      <span className="sx-journey-marker-dot" />
                    </span>
                  </div>

                  <h3 className="sx-journey-title">{phase.title}</h3>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        className="sx-journey-detail"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.4, delay: 0.22, ease: EASE }}
                      >
                        <p>{phase.desc}</p>

                        <div className="sx-journey-tags">
                          {phase.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>

                        <div className="sx-journey-stat">
                          <strong>{phase.stat.value}</strong>
                          <span>{phase.stat.label}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {isActive && !reduce && !paused && (
                    <motion.span
                      key={`progress-${active}`}
                      className="sx-journey-progress"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
