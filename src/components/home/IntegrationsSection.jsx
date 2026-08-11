import { useEffect, useRef, useState } from 'react'
import './IntegrationsSection.css'

const BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_111401_56af5012-2263-45d3-849a-8688084d7c2a.png&w=1280&q=85'

const HEADING = 'Plug into your entire stack'
const HEADING_DARK_CHARS = 15 // "Plug into your "

const LEAD =
  'Connect payment gateways, cloud backends, AI models, and data services — unified in one system with real-time sync across every layer.'

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
  },
  {
    id: 'backend',
    label: 'Backend & Database',
    desc: 'Firebase & Supabase — auth, realtime DB & serverless APIs',
  },
  {
    id: 'ai',
    label: 'AI Tools',
    desc: 'OpenAI, Claude & Gemini for smart product features',
  },
]

const ORBIT_AVATARS = [
  {
    src: '/integrations/stripe.png',
    alt: 'Stripe',
    orbit: 1,
    deg: 270,
    radius: 177,
    size: 58,
    shape: 'square',
    glow: 'purple',
    delay: 0.6,
  },
  {
    src: '/integrations/paypal.png',
    alt: 'PayPal',
    orbit: 2,
    deg: 60,
    radius: 251,
    size: 58,
    shape: 'round',
    glow: 'yellow',
    delay: 0.9,
  },
  {
    src: '/integrations/razorpay.png',
    alt: 'Razorpay',
    orbit: 2,
    deg: 180,
    radius: 251,
    size: 78,
    shape: 'round',
    glow: 'pink',
    delay: 1.1,
  },
  {
    src: '/integrations/firebase.png',
    alt: 'Firebase',
    orbit: 2,
    deg: 300,
    radius: 251,
    size: 58,
    shape: 'square',
    glow: 'blue',
    delay: 1.3,
  },
  {
    src: '/integrations/supabase.png',
    alt: 'Supabase',
    orbit: 3,
    deg: 130,
    radius: 325,
    size: 88,
    shape: 'round',
    glow: 'pink',
    delay: 1.5,
  },
  {
    src: '/integrations/openai.png',
    alt: 'OpenAI',
    orbit: 4,
    deg: 30,
    radius: 399,
    size: 58,
    shape: 'round',
    glow: 'purple',
    delay: 1.7,
  },
  {
    src: '/integrations/claude.png',
    alt: 'Claude',
    orbit: 4,
    deg: 95,
    radius: 399,
    size: 88,
    shape: 'square24',
    glow: 'orange',
    delay: 1.9,
  },
  {
    src: '/integrations/gemini.png',
    alt: 'Gemini',
    orbit: 4,
    deg: 220,
    radius: 399,
    size: 88,
    shape: 'square24',
    glow: 'pink',
    delay: 2.1,
  },
  {
    src: '/integrations/stripe.png',
    alt: 'Stripe',
    orbit: 4,
    deg: 320,
    radius: 399,
    size: 58,
    shape: 'round',
    glow: 'purple',
    delay: 2.3,
  },
]

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3
}

function useCountUp(target, duration = 2000, delay = 1200) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return undefined
    started.current = true
    let raf = 0
    const timer = window.setTimeout(() => {
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        setValue(Math.round(easeOutCubic(t) * target))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(raf)
    }
  }, [target, duration, delay])

  return value
}

function TypewriterHeading({ text, darkCount, speed = 35, delay = 400 }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let interval = 0
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(interval)
            setDone(true)
            return c
          }
          return c + 1
        })
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(timer)
      window.clearInterval(interval)
    }
  }, [text, speed, delay])

  const typed = text.slice(0, count)
  const dark = typed.slice(0, darkCount)
  const light = typed.slice(darkCount)

  return (
    <h2 className="mk-heading" aria-label={text}>
      <span className="mk-heading-dark">{dark}</span>
      <span className="mk-heading-light">{light}</span>
      {!done && <span className="mk-cursor-blink" aria-hidden="true" />}
    </h2>
  )
}

function BorderButton({ children, className = '', onClick, appear }) {
  return (
    <div className={`mk-btn-border-wrap${appear ? ' is-appear' : ''}`}>
      <button type="button" className={`mk-btn ${className}`} onClick={onClick}>
        <span className="mk-btn-label">{children}</span>
      </button>
    </div>
  )
}

function OrbitAvatar({ avatar }) {
  const style = {
    width: avatar.size,
    height: avatar.size,
    animationDelay: `${avatar.delay}s`,
    '--orbit-deg': `${avatar.deg}deg`,
    '--orbit-radius': `${avatar.radius}px`,
  }

  return (
    <div
      className={`mk-avatar mk-avatar--${avatar.shape} mk-avatar--${avatar.glow}`}
      style={style}
    >
      <img src={avatar.src} alt={avatar.alt} width={avatar.size} height={avatar.size} />
    </div>
  )
}

function CirclesVisual() {
  const count = useCountUp(40, 2000, 1200)

  return (
    <div className="mk-circles" aria-hidden="true">
      <div className="mk-orbit mk-orbit--1">
        <div className="mk-orbit-ring" />
        <div className="mk-center">
          <strong>
            {count}
            <span>+</span>
          </strong>
          <span>Live integrations</span>
        </div>
        {ORBIT_AVATARS.filter((a) => a.orbit === 1).map((a) => (
          <OrbitAvatar key={`${a.alt}-${a.deg}`} avatar={a} />
        ))}
      </div>
      <div className="mk-orbit mk-orbit--2">
        <div className="mk-orbit-ring" />
        {ORBIT_AVATARS.filter((a) => a.orbit === 2).map((a) => (
          <OrbitAvatar key={`${a.alt}-${a.deg}`} avatar={a} />
        ))}
      </div>
      <div className="mk-orbit mk-orbit--3">
        <div className="mk-orbit-ring" />
        {ORBIT_AVATARS.filter((a) => a.orbit === 3).map((a) => (
          <OrbitAvatar key={`${a.alt}-${a.deg}`} avatar={a} />
        ))}
      </div>
      <div className="mk-orbit mk-orbit--4">
        <div className="mk-orbit-ring" />
        {ORBIT_AVATARS.filter((a) => a.orbit === 4).map((a) => (
          <OrbitAvatar key={`${a.alt}-${a.deg}`} avatar={a} />
        ))}
      </div>
    </div>
  )
}

export default function IntegrationsSection() {
  const [typedDone, setTypedDone] = useState(false)

  useEffect(() => {
    const ms = 400 + HEADING.length * 35 + 80
    const t = window.setTimeout(() => setTypedDone(true), ms)
    return () => window.clearTimeout(t)
  }, [])

  const scrollContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="integrations"
      className="mk-section"
      style={{ backgroundImage: `url("${BG}")` }}
    >
      <div className="mk-inner">
        <header className="mk-header">
          <div className="mk-header-left">
            <span className="mk-badge">Integrations</span>
            <nav className="mk-nav" aria-label="Integration categories">
              {CATEGORIES.map((cat) => (
                <a key={cat.id} href={`#integrations`} className="mk-nav-link">
                  {cat.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="mk-header-right">
            {STATS.map((stat) => (
              <div key={stat.label} className="mk-stat-chip">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </header>

        <div className="mk-hero">
          <div className="mk-hero-left">
            <TypewriterHeading text={HEADING} darkCount={HEADING_DARK_CHARS} />
            <p className="mk-lead">{LEAD}</p>

            <BorderButton
              className="mk-btn--start"
              appear={typedDone}
              onClick={scrollContact}
            >
              Start Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </BorderButton>

            <div className={`mk-pointer${typedDone ? ' is-visible' : ''}`}>
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M4 2L20 11L11 13L9 22L4 2Z"
                  fill="#A068FF"
                  stroke="#fff"
                  strokeWidth="1"
                />
              </svg>
              <span>Essixx</span>
            </div>
          </div>

          <div className="mk-hero-right">
            <CirclesVisual />
          </div>
        </div>

        <div className="mk-cats">
          {CATEGORIES.map((cat) => (
            <article key={cat.id} className="mk-cat">
              <h3>{cat.label}</h3>
              <p>{cat.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
