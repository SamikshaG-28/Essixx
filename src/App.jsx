import { useEffect, useState } from 'react'
import MagicRings from './components/MagicRings.jsx'
import TextGenerateEffect from './components/TextGenerateEffect.jsx'
import AvatarCircles from './components/AvatarCircles.jsx'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from './components/Carousel.jsx'
import './App.css'

const THEME_STORAGE_KEY = 'essixx-theme'

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      /* ignore quota / privacy mode errors */
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return { theme, toggle }
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

const NAV_ITEMS = [
  { label: 'Home', target: 'home' },
  { label: 'Service', target: 'services' },
  { label: 'Projects', target: 'projects' },
  { label: 'Career', target: 'career' },
  { label: 'About', target: 'about' },
]

const PERKS = [
  {
    icon: 'remote',
    title: 'Remote-first',
    body: 'Work from anywhere. We trust outcomes over hours.',
  },
  {
    icon: 'growth',
    title: 'Real growth',
    body: 'Annual learning budget + mentorship from senior leaders.',
  },
  {
    icon: 'health',
    title: 'Care that scales',
    body: 'Full health cover for you and your family, plus wellness days.',
  },
]

const TEAM = [
  {
    name: 'Kartik Sabale',
    role: 'Founder & CEO',
    initials: 'KS',
    image: '',
    accent: 'linear-gradient(135deg, #00d4ff 0%, #0070b8 100%)',
    bio: 'Steers Essixx\u2019s mission, strategy, and product vision.',
  },
  {
    name: 'Shilpa Shivmare',
    role: 'CFO',
    initials: 'SS',
    image: '',
    accent: 'linear-gradient(135deg, #ff7ab6 0%, #9b3bff 100%)',
    bio: 'Drives financial strategy, planning, and sustainable growth.',
  },
  {
    name: 'Ashish Shivmare',
    role: 'Director',
    initials: 'AS',
    image: '',
    accent: 'linear-gradient(135deg, #2eea9a 0%, #0a8a5a 100%)',
    bio: 'Heads strategic initiatives and cross-functional delivery.',
  },
  {
    name: 'Tejas Khairner',
    role: 'CTO',
    initials: 'TK',
    image: '',
    accent: 'linear-gradient(135deg, #6d3bff 0%, #1a0b4a 100%)',
    bio: 'Leads engineering and modern, scalable architecture.',
  },
  {
    name: 'Pratiksha Relekar',
    role: 'Co-Director',
    initials: 'PR',
    image: '',
    accent: 'linear-gradient(135deg, #ffb04a 0%, #ff5b5b 100%)',
    bio: 'Co-leads strategy, partnerships, and team excellence.',
  },
]

const TESTIMONIAL_AVATARS = [
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/16860528',
    profileUrl: 'https://github.com/dillionverma',
    alt: 'Sarah Mitchell',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/20110627',
    profileUrl: 'https://github.com/shadcn',
    alt: 'Rohan Mehta',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/106103625',
    profileUrl: 'https://github.com/gitnamic',
    alt: 'David Chen',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/59228569',
    profileUrl: 'https://github.com/yashbarot',
    alt: 'Priya Sharma',
  },
  {
    imageUrl: 'https://avatars.githubusercontent.com/u/89768406',
    profileUrl: 'https://github.com/zhaohan-dong',
    alt: 'Marcus Reid',
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Essixx rebuilt our entire web platform and lifted our conversion by 38% in just three months. The team is sharp, responsive, and genuinely cares about outcomes — not just deliverables.",
    name: 'Sarah Mitchell',
    role: 'VP of Marketing',
    company: 'BrightLeaf Analytics',
    rating: 5,
    accent: '#00d4ff',
  },
  {
    quote:
      "The mobile app they built for us is rock-solid. Clean code, beautiful UI, and they shipped two weeks ahead of schedule. Couldn't ask for a better engineering partner.",
    name: 'Rohan Mehta',
    role: 'Product Lead',
    company: 'Finlytic',
    rating: 5,
    accent: '#7be8ff',
  },
  {
    quote:
      "Working with Essixx on our AI integration was a game-changer. They simplified a genuinely complex problem and delivered measurable ROI inside the first quarter.",
    name: 'David Chen',
    role: 'CTO',
    company: 'NorthRail Systems',
    rating: 5,
    accent: '#5ec3e5',
  },
  {
    quote:
      "What sets them apart is the attention to detail. Every pixel, every interaction was thought through. Our customers actually compliment the new product unprompted.",
    name: 'Priya Sharma',
    role: 'Founder',
    company: 'Lumenwell',
    rating: 5,
    accent: '#00d4ff',
  },
  {
    quote:
      "We migrated our legacy stack with zero downtime, thanks to their methodical approach. They communicated at every step — it felt like an extension of our own team.",
    name: 'Marcus Reid',
    role: 'Engineering Director',
    company: 'Atlas Logistics',
    rating: 5,
    accent: '#7be8ff',
  },
  {
    quote:
      "Honest pricing, on-time delivery, and a design eye that's hard to find. We've worked with three agencies before — Essixx is by far the best partner we've engaged.",
    name: 'Anita Joshi',
    role: 'Head of Operations',
    company: 'NovaMart',
    rating: 5,
    accent: '#5ec3e5',
  },
]

const PROJECTS = [
  {
    name: 'Bot Trading Win',
    lead: 'Ashish Shivmare',
    category: 'FinTech · Automation',
    art: 'bot-trading',
    description:
      'Algorithmic trading bot that scans live market data, detects high-probability signals and executes risk-managed trades 24/7 across forex and crypto pairs.',
  },
  {
    name: 'Funded PIP',
    lead: 'Team Essixx',
    category: 'Trading Platform',
    art: 'funded-pip',
    description:
      'Prop-firm style trader evaluation platform that tracks PIP performance, manages funded accounts, payouts and rules in real time.',
  },
  {
    name: 'Gojira Android App',
    lead: 'Kartik Sabale',
    category: 'Mobile · Android',
    art: 'gojira-android',
    description:
      'Native Android companion for the Gojira ecosystem — portfolio tracking, push alerts and on-the-go trading insights in a clean Material UI.',
  },
  {
    name: 'Gojira Web Integration',
    lead: 'Pratiksha Relekar',
    category: 'Web · Integration',
    art: 'gojira-web',
    description:
      'Web dashboard that integrates broker APIs, market feeds and Gojira services into one unified workspace for traders and analysts.',
  },
  {
    name: 'Wallet',
    lead: 'Shilpa Shivmare',
    category: 'FinTech · Wallet',
    art: 'wallet',
    description:
      'Secure multi-currency digital wallet with instant transfers, transaction history, KYC flow and bank-grade encryption baked in.',
  },
  {
    name: 'Wonner Repo System',
    lead: 'Kartik Sabale',
    category: 'DevTools · Platform',
    art: 'wonner-repo',
    description:
      'Internal repository & code-collaboration platform — version control, code review workflows and CI hooks tailored for our engineering team.',
  },
]

const SERVICES = [
  {
    icon: 'web-design',
    title: 'Web Design',
    lead: 'Design that converts.',
    body:
      'We craft modern, intuitive interfaces with a clear visual identity — fast, accessible, and built to convert visitors into customers.',
  },
  {
    icon: 'data',
    title: 'Data & AI Consulting',
    lead: '',
    body:
      'Unlock the full value of your data with predictive analytics, automation, and AI-driven solutions tailored to your industry.',
  },
  {
    icon: 'web-development',
    title: 'Web Development',
    lead: '',
    body:
      'Robust, scalable web applications built with modern frameworks. We deliver fast-loading, SEO-friendly sites with clean, maintainable code.',
  },
  {
    icon: 'workplace',
    title: 'Digital Workplace Solutions',
    lead: '',
    body:
      'Empower your teams with modern collaboration tools, remote work infrastructure, and seamless digital workflows.',
  },
  {
    icon: 'app',
    title: 'App Development',
    lead: '',
    body:
      'Native and cross-platform mobile apps built for performance and scale, with intuitive UX that users genuinely love using every day.',
  },
  {
    icon: 'gear',
    title: 'IT Modernization',
    lead: '',
    body:
      'Upgrade legacy systems with confidence. Streamline outdated infrastructures into modern, efficient platforms.',
  },
]

const BRANDS = [
  'MITSUBISHI',
  'PSEG',
  'BANK OF CHINA',
  'Hormel',
  'Rockwell Automation',
  'Marriott',
  'amazon',
]

function Logo({ size = 22 }) {
  const imgSize = Math.round(size * 1.7)
  return (
    <span className="logo" style={{ fontSize: size }}>
      <img
        src="/essixx-logo.png"
        alt=""
        className="logo-img"
        width={imgSize}
        height={imgSize}
        loading="eager"
        decoding="async"
        aria-hidden="true"
      />
      <span className="logo-text">
        Ess<span className="logo-i">i</span>xx
      </span>
    </span>
  )
}

function ServiceIcon({ name }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'web-design':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2.5" />
          <path d="M3 9h18" />
          <circle cx="6" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="8.7" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="11.4" cy="6.5" r="0.7" fill="currentColor" stroke="none" />
          <path d="M6.5 14l3-3 2.5 2.5 4-4 1.5 1.5" />
          <circle cx="6.5" cy="14" r="1.2" fill="currentColor" stroke="none" opacity="0.35" />
        </svg>
      )
    case 'web-development':
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
          <path d="M2.5 8.5h19" />
          <path d="M8 12.5l-2 2 2 2" />
          <path d="M16 12.5l2 2-2 2" />
          <path d="M13.5 11l-3 7" />
        </svg>
      )
    case 'data':
      return (
        <svg {...common}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="6" r="2.2" />
          <circle cx="12" cy="12" r="2.6" />
          <circle cx="6" cy="18" r="2.2" />
          <circle cx="18" cy="18" r="2.2" />
          <path d="M7.8 7.5l2.6 3M16.2 7.5l-2.6 3M7.8 16.5l2.6-3M16.2 16.5l-2.6-3" />
          <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'workplace':
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="3" />
          <path d="M3 20v-1.2a4.5 4.5 0 014.5-4.5h3a4.5 4.5 0 014.5 4.5V20" />
          <circle cx="17.5" cy="10" r="2.2" />
          <path d="M21 19v-.7a3.3 3.3 0 00-3.3-3.3" />
        </svg>
      )
    case 'app':
      return (
        <svg {...common}>
          <rect x="6.5" y="2" width="11" height="20" rx="2.8" />
          <path d="M10.5 18.5h3" />
          <rect x="9" y="6" width="2.2" height="2.2" rx="0.5" fill="currentColor" stroke="none" opacity="0.7" />
          <rect x="12.8" y="6" width="2.2" height="2.2" rx="0.5" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="9" y="9.8" width="2.2" height="2.2" rx="0.5" fill="currentColor" stroke="none" opacity="0.4" />
          <rect x="12.8" y="9.8" width="2.2" height="2.2" rx="0.5" fill="currentColor" stroke="none" opacity="0.7" />
        </svg>
      )
    case 'gear':
      return (
        <svg {...common}>
          <path d="M3 17l5-5 3 3 4-4 3 3 3-3" />
          <circle cx="8" cy="12" r="1" fill="currentColor" stroke="none" />
          <circle cx="11" cy="15" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none" />
          <path d="M3 21h18" />
          <path d="M19 8h2v2" />
        </svg>
      )
    default:
      return null
  }
}

function Navbar({ theme, onToggleTheme }) {
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTarget = (target) => {
    const el = document.getElementById(target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (target === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNavClick = (item) => {
    setActive(item.label)
    setMenuOpen(false)
    scrollToTarget(item.target)
  }

  const handleContactClick = () => {
    setMenuOpen(false)
    scrollToTarget('contact')
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-inner">
        <a
          href="#home"
          className="nav-logo"
          aria-label="Essixx home"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setActive('Home')
            setMenuOpen(false)
          }}
        >
          <Logo size={20} />
        </a>

        <nav className="nav-pill" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`nav-pill-item ${active === item.label ? 'is-active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-right">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            className="btn btn-outline btn-sm nav-contact-desktop"
            onClick={handleContactClick}
          >
            Contact Us
          </button>

          <button
            type="button"
            className="btn btn-primary nav-contact-mobile"
            aria-label="Contact us"
            onClick={handleContactClick}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3.5 5.5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9z" />
              <path d="M4 6l6 4.5L16 6" />
            </svg>
            <span className="nav-contact-mobile-label">Contact</span>
          </button>

          <button
            type="button"
            className={`nav-hamburger ${menuOpen ? 'is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="nav-hamburger-bar" />
            <span className="nav-hamburger-bar" />
            <span className="nav-hamburger-bar" />
          </button>
        </div>
      </div>

      <div
        className={`nav-backdrop ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="mobile-menu"
        className={`nav-mobile ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <nav className="nav-mobile-list" aria-label="Mobile primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`nav-mobile-item ${active === item.label ? 'is-active' : ''}`}
              onClick={() => handleNavClick(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="nav-mobile-foot">
          <button
            type="button"
            className="btn btn-primary nav-mobile-cta"
            onClick={handleContactClick}
          >
            Contact Us
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ theme = 'dark' }) {
  const isDark = theme === 'dark'
  return (
    <section id="home" className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-stars" aria-hidden="true" />

      <div className="hero-fx" aria-hidden="true">
        <MagicRings
          color={isDark ? '#7be8ff' : '#7ed7f5'}
          colorTwo={isDark ? '#b8f1ff' : '#c8ecfb'}
          ringCount={6}
          speed={0.6}
          attenuation={6}
          lineThickness={2.2}
          baseRadius={0.32}
          radiusStep={0.12}
          scaleRate={0.1}
          opacity={isDark ? 0.85 : 0.7}
          blur={0}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={true}
          mouseInfluence={0.14}
          hoverScale={1.05}
          parallax={0.04}
          clickBurst={false}
        />
      </div>

      <div className="hero-inner">
        <h1 className="hero-title">
          <TextGenerateEffect
            lines={[
              { words: ['Transform', 'Your', 'Business'] },
              {
                words: ['with', 'Future-Ready Technology'],
                accentFrom: 1,
              },
            ]}
            accentClassName="hero-title-accent"
            duration={0.7}
            staggerDelay={0.14}
          />
        </h1>
        <p className="hero-sub">
          From strategy to execution, we're your <br />
          partners in digital transformation.
        </p>

        <div className="hero-cta">
          <button type="button" className="btn btn-primary">
            Get Started
          </button>
        </div>

        <div className="hero-trusted">
          <p className="hero-trusted-label">Trusted by 200+ brands</p>
          <div className="hero-marquee" aria-label="Trusted brands">
            <div className="hero-marquee-track">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span
                  key={`${b}-${i}`}
                  className="hero-brand"
                  aria-hidden={i >= BRANDS.length ? 'true' : undefined}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="services">
      <div className="services-inner">
        <span className="pill">Services</span>
        <h2 className="services-title">Our Expertise</h2>

        <div className="services-grid">
          {SERVICES.map((s) => (
            <article key={s.title} className="service-card">
              <div className="service-icon">
                <ServiceIcon name={s.icon} />
              </div>
              <h3 className="service-name">{s.title}</h3>
              {s.lead && <p className="service-lead">{s.lead}</p>}
              <p className="service-body">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectArt({ name }) {
  const common = {
    viewBox: '0 0 200 140',
    width: '100%',
    height: '100%',
    xmlns: 'http://www.w3.org/2000/svg',
    preserveAspectRatio: 'xMidYMid meet',
    role: 'presentation',
    'aria-hidden': true,
  }
  switch (name) {
    case 'bot-trading':
      return (
        <svg {...common}>
          <defs>
            <linearGradient id="bt-line" x1="0" x2="1" y1="1" y2="0">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M10 110 L35 95 L55 100 L75 70 L100 80 L125 50 L150 60 L175 30 L190 35"
            stroke="url(#bt-line)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="currentColor" opacity="0.85">
            <rect x="32" y="76" width="6" height="20" rx="1" />
            <line x1="35" y1="70" x2="35" y2="102" stroke="currentColor" strokeWidth="1" />
            <rect x="56" y="62" width="6" height="32" rx="1" opacity="0.7" />
            <line x1="59" y1="56" x2="59" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <rect x="80" y="50" width="6" height="24" rx="1" />
            <line x1="83" y1="44" x2="83" y2="80" stroke="currentColor" strokeWidth="1" />
            <rect x="104" y="40" width="6" height="28" rx="1" opacity="0.7" />
            <line x1="107" y1="34" x2="107" y2="74" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <rect x="128" y="34" width="6" height="20" rx="1" />
            <line x1="131" y1="28" x2="131" y2="60" stroke="currentColor" strokeWidth="1" />
          </g>
          <g transform="translate(150 80)" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            <rect x="0" y="6" width="36" height="26" rx="6" />
            <line x1="18" y1="0" x2="18" y2="6" />
            <circle cx="18" cy="0" r="1.6" fill="currentColor" />
            <circle cx="11" cy="18" r="2.4" fill="currentColor" stroke="none" />
            <circle cx="25" cy="18" r="2.4" fill="currentColor" stroke="none" />
            <path d="M13 25 q5 4 10 0" />
          </g>
        </svg>
      )
    case 'funded-pip':
      return (
        <svg {...common}>
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="100" cy="70" r="42" />
            <path d="M100 46 v48 M88 56 h18 a6 6 0 0 1 0 12 H88 v18" />
            <path d="M100 28 v6 M100 106 v6 M58 70 h6 M136 70 h6" opacity="0.55" />
          </g>
          <g fill="currentColor">
            <circle cx="40" cy="34" r="3" opacity="0.7" />
            <circle cx="170" cy="40" r="2.5" opacity="0.5" />
            <circle cx="46" cy="108" r="2.5" opacity="0.5" />
            <circle cx="162" cy="110" r="3" opacity="0.7" />
          </g>
          <g transform="translate(146 96)" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="12" fill="currentColor" opacity="0.18" stroke="none" />
            <path d="M6 12 l4 4 l8 -9" />
          </g>
        </svg>
      )
    case 'gojira-android':
      return (
        <svg {...common}>
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="68" y="14" width="64" height="112" rx="10" />
            <line x1="68" y1="32" x2="132" y2="32" />
            <line x1="68" y1="108" x2="132" y2="108" />
            <circle cx="100" cy="118" r="2.2" fill="currentColor" />
          </g>
          <path
            d="M78 90 L88 78 L96 82 L106 64 L116 70 L124 56"
            stroke="currentColor"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <g fill="currentColor">
            <circle cx="88" cy="78" r="2" />
            <circle cx="96" cy="82" r="2" />
            <circle cx="106" cy="64" r="2" />
            <circle cx="116" cy="70" r="2" />
            <circle cx="124" cy="56" r="2.4" />
          </g>
          <g transform="translate(28 56)" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.7">
            <path d="M0 14 a14 14 0 0 1 14 -14" />
            <path d="M4 14 a10 10 0 0 1 10 -10" />
          </g>
          <g transform="translate(158 56)" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.7">
            <path d="M14 14 a14 14 0 0 0 -14 -14" />
            <path d="M14 14 a10 10 0 0 0 -10 -10" />
          </g>
        </svg>
      )
    case 'gojira-web':
      return (
        <svg {...common}>
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="22" y="22" width="156" height="96" rx="8" />
            <line x1="22" y1="42" x2="178" y2="42" />
            <circle cx="32" cy="32" r="2" fill="currentColor" />
            <circle cx="40" cy="32" r="2" fill="currentColor" opacity="0.7" />
            <circle cx="48" cy="32" r="2" fill="currentColor" opacity="0.5" />
          </g>
          <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="62" y1="82" x2="100" y2="64" />
            <line x1="100" y1="64" x2="140" y2="92" />
            <line x1="100" y1="64" x2="100" y2="100" />
            <line x1="62" y1="82" x2="140" y2="92" />
          </g>
          <g fill="currentColor">
            <circle cx="62" cy="82" r="4.5" />
            <circle cx="100" cy="64" r="5" />
            <circle cx="140" cy="92" r="4.5" />
            <circle cx="100" cy="100" r="4" opacity="0.85" />
          </g>
        </svg>
      )
    case 'wallet':
      return (
        <svg {...common}>
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
            <rect x="30" y="34" width="124" height="72" rx="10" />
            <rect x="30" y="34" width="124" height="20" rx="10" fill="currentColor" opacity="0.18" stroke="none" />
            <line x1="30" y1="54" x2="154" y2="54" />
            <rect x="118" y="72" width="28" height="20" rx="4" />
            <circle cx="132" cy="82" r="3.4" fill="currentColor" stroke="none" />
          </g>
          <g fill="currentColor" opacity="0.85">
            <rect x="42" y="68" width="36" height="3" rx="1.5" />
            <rect x="42" y="78" width="58" height="3" rx="1.5" opacity="0.7" />
            <rect x="42" y="88" width="44" height="3" rx="1.5" opacity="0.5" />
          </g>
          <g transform="translate(150 14)" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="14" cy="14" r="12" fill="currentColor" opacity="0.18" stroke="none" />
            <path d="M14 8 v12 M9 13 l5 -5 l5 5" />
          </g>
        </svg>
      )
    case 'wonner-repo':
      return (
        <svg {...common}>
          <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="56" y1="34" x2="56" y2="106" />
            <line x1="144" y1="34" x2="144" y2="106" />
            <path d="M56 70 q44 0 88 -32" />
            <path d="M56 70 q44 0 88 32" />
          </g>
          <g fill="currentColor">
            <circle cx="56" cy="34" r="6" />
            <circle cx="56" cy="70" r="6" />
            <circle cx="56" cy="106" r="6" />
            <circle cx="144" cy="38" r="6" opacity="0.9" />
            <circle cx="144" cy="70" r="6" opacity="0.9" />
            <circle cx="144" cy="102" r="6" opacity="0.9" />
          </g>
          <g transform="translate(100 110)" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.75">
            <path d="M-12 -2 l-4 4 l4 4 M12 -2 l4 4 l-4 4 M0 -6 l-4 14" />
          </g>
        </svg>
      )
    default:
      return null
  }
}

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-inner">
        <div className="projects-head">
          <span className="pill">Projects</span>
          <h2 className="projects-title">
            We Are <span className="projects-title-accent">Working On</span>
          </h2>
          <p className="projects-sub">
            A live look at the products our team is currently building — each
            one shipping soon.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <article key={p.name} className="project-card">
              <div className="project-cover">
                <div className="project-cover-art">
                  <ProjectArt name={p.art} />
                </div>
                <span className="project-status">
                  <span className="project-status-dot" aria-hidden="true" />
                  In Progress
                </span>
                <span className="project-index">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="project-body">
                <span className="project-tag">{p.category}</span>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.description}</p>
                <div className="project-meta">
                  <span className="project-lead-label">Lead</span>
                  <span className="project-lead-name">{p.lead}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const stats = [
    { value: '200+', label: 'Brands Trusted' },
    { value: '12+', label: 'Years of Experience' },
    { value: '50+', label: 'Team Members' },
    { value: '35', label: 'Countries Served' },
  ]

  const values = [
    {
      title: 'Senior, hands-on team',
      body:
        'Every project is led by senior practitioners with 10+ years across design, engineering, data, and strategy.',
    },
    {
      title: 'Partnership-driven',
      body:
        'We don\u2019t hand off and disappear. We embed with your team and stay accountable to outcomes, not just deliverables.',
    },
    {
      title: 'End-to-end delivery',
      body:
        'From the first wireframe to the last deployment \u2014 design, build, launch, scale. One team, one roadmap.',
    },
  ]

  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-head">
          <span className="pill">About Us</span>
          <h2 className="about-title">
            Building the future of digital, <span className="about-title-accent">together</span>
          </h2>
          <p className="about-lead">
            Essixx is a digital transformation studio helping ambitious companies
            design, build, and scale future-ready experiences. We blend strategy,
            design, and engineering into one accountable team.
          </p>
        </div>

        <div className="about-stats" aria-label="Essixx by the numbers">
          <div className="about-stats-glow" aria-hidden="true" />
          {stats.map((s) => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-value">{s.value}</span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <ul className="about-values">
          {values.map((v) => (
            <li key={v.title} className="about-value">
              <span className="about-check" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8.5l3 3 7-7" />
                </svg>
              </span>
              <div>
                <h4 className="about-value-title">{v.title}</h4>
                <p className="about-value-body">{v.body}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="about-team">
          <div className="about-team-head">
            <span className="pill">Know More</span>
            <h3 className="about-team-title">Meet the leadership</h3>
            <p className="about-team-sub">
              The people steering Essixx — across strategy, finance, technology,
              and delivery.
            </p>
          </div>

          <div className="about-team-grid">
            {TEAM.map((m) => (
              <article key={m.name} className="team-card">
                <div
                  className="team-avatar"
                  style={
                    m.image
                      ? { backgroundImage: `url(${m.image})` }
                      : { background: m.accent }
                  }
                  aria-hidden={m.image ? undefined : 'true'}
                >
                  {!m.image && (
                    <span className="team-avatar-initials">{m.initials}</span>
                  )}
                </div>
                <h4 className="team-name">{m.name}</h4>
                <span className="team-role">{m.role}</span>
                <p className="team-bio">{m.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PerkIcon({ name }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'remote':
      return (
        <svg {...common}>
          <rect x="2" y="5" width="20" height="12" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      )
    case 'growth':
      return (
        <svg {...common}>
          <path d="M3 17l5-5 4 4 8-8" />
          <path d="M14 8h6v6" />
        </svg>
      )
    case 'health':
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.5-7 10-7 10z" />
        </svg>
      )
    default:
      return null
  }
}

function Career({ theme = 'dark' }) {
  const isLight = theme === 'light'
  const poster1 = isLight ? '/career-poster-1.png' : '/career-poster-1-dark.png'
  const poster2 = isLight ? '/career-poster-2.png' : '/career-poster-2-dark.png'
  const poster3 = isLight ? '/career-poster-3.png' : '/career-poster-3-dark.png'

  return (
    <section id="career" className="career">
      <div className="career-inner">
        <div className="career-head">
          <span className="pill">Careers</span>
          <h2 className="career-title">
            Build the future <span className="career-title-accent">with us</span>
          </h2>
          <p className="career-sub">
            We're a small, senior team that ships work we're proud of. If you care
            about craft, customers, and learning fast — you'll feel at home here.
          </p>
        </div>

        <div className="career-perks">
          {PERKS.map((p) => (
            <div key={p.title} className="career-perk">
              <span className="career-perk-icon" aria-hidden="true">
                <PerkIcon name={p.icon} />
              </span>
              <div>
                <h4 className="career-perk-title">{p.title}</h4>
                <p className="career-perk-body">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="career-posters">
          <Carousel
            className="career-carousel"
            ariaLabel="Featured Essixx offer posters"
            opts={{ loop: true, align: 'center' }}
            autoplayDelay={5000}
          >
            <CarouselContent>
              <CarouselItem>
                <a
                  href="#contact"
                  className="career-poster"
                  aria-label="Essixx develops websites — special offer ₹19,999"
                >
                  <img
                    src={poster1}
                    alt="Essixx — We develop websites. Modern, fast and responsive. Special offer ₹19,999. Limited time offer."
                    className="career-poster-img"
                    loading="lazy"
                  />
                </a>
              </CarouselItem>
              <CarouselItem>
                <a
                  href="#contact"
                  className="career-poster"
                  aria-label="Essixx — Make your business online & grow in Pune"
                >
                  <img
                    src={poster2}
                    alt="Essixx — We develop websites. Make your business online and grow in Pune. Special offer: website in just ₹19,999."
                    className="career-poster-img"
                    loading="lazy"
                  />
                </a>
              </CarouselItem>
              <CarouselItem>
                <a
                  href="#contact"
                  className="career-poster"
                  aria-label="Essixx develops modern, responsive websites — see our offer"
                >
                  <img
                    src={poster3}
                    alt="Essixx — We develop websites. Modern, fast and responsive. Special offer ₹19,999."
                    className="career-poster-img"
                    loading="lazy"
                  />
                </a>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
            <CarouselDots />
          </Carousel>
        </div>

        <div className="career-cta">
          <p>Don't see your role here?</p>
          <a className="career-cta-link" href="#contact">
            Send us your CV
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your full name.'
    if (!form.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.'
    }
    if (!form.message.trim()) {
      next.message = 'Please tell us a bit about your project.'
    } else if (form.message.trim().length < 10) {
      next.message = 'Message is a little short \u2014 try a bit more detail.'
    }
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) {
      setErrors(v)
      setStatus('idle')
      return
    }
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setErrors({})
    }, 700)
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className="contact-head">
          <span className="pill">Contact Us</span>
          <h2 className="contact-title">
            Let's build something <span className="contact-title-accent">great together</span>
          </h2>
          <p className="contact-sub">
            Tell us about your project. We'll get back within one business day with
            next steps, scope ideas, or a quick intro call.
          </p>
        </div>

        <div className="contact-grid">
          <aside className="contact-info">
            <div className="contact-info-block">
              <span className="contact-info-label">Email</span>
              <a className="contact-info-value" href="mailto:support@essixx.com">
                support@essixx.com
              </a>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Phone</span>
              <a className="contact-info-value" href="tel:+919000000000">
                +91 90000 00000
              </a>
            </div>
            <div className="contact-info-block">
              <span className="contact-info-label">Office</span>
              <span className="contact-info-value">
                Navale Bridge, Pune · Maharashtra, India
              </span>
            </div>
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-field">
              <label htmlFor="contact-name" className="contact-label">
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                className={`contact-input ${errors.name ? 'has-error' : ''}`}
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.name && <span className="contact-error">{errors.name}</span>}
            </div>

            <div className="contact-field">
              <label htmlFor="contact-email" className="contact-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                className={`contact-input ${errors.email ? 'has-error' : ''}`}
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
              {errors.email && <span className="contact-error">{errors.email}</span>}
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message" className="contact-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                className={`contact-input contact-textarea ${errors.message ? 'has-error' : ''}`}
                placeholder="Tell us about your project, timeline, and what success looks like."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <span className="contact-error">{errors.message}</span>}
            </div>

            <div className="contact-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
                {status !== 'sending' && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                )}
              </button>

              {status === 'sent' && (
                <span className="contact-success" role="status">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 8.5l3 3 7-7" />
                  </svg>
                  Thanks! We'll be in touch shortly.
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function SocialIcon({ name }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
  }
  switch (name) {
    case 'linkedin':
      return (
        <svg {...common}>
          <path d="M4.98 3.5a2.5 2.5 0 11.02 5.001A2.5 2.5 0 014.98 3.5zM3 9h4v12H3V9zm7 0h3.8v1.7h.06c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.66 4.8 6.12V21H18.6v-5.36c0-1.28-.02-2.93-1.79-2.93-1.79 0-2.07 1.4-2.07 2.84V21H10V9z" />
        </svg>
      )
    case 'twitter':
      return (
        <svg {...common}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.22.06 1.26.07 1.64.07 4.85s-.01 3.6-.07 4.85c-.05 1.16-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.25.06-1.63.07-4.85.07s-3.6-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.43-.36-1.06-.41-2.22C2.2 15.6 2.2 15.2 2.2 12s.01-3.6.07-4.85c.05-1.16.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-1.05.04-1.62.22-2 .37-.5.2-.85.43-1.23.81-.38.38-.61.73-.81 1.23-.15.38-.33.95-.37 2-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.04 1.05.22 1.62.37 2 .2.5.43.85.81 1.23.38.38.73.61 1.23.81.38.15.95.33 2 .37 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.05-.04 1.62-.22 2-.37.5-.2.85-.43 1.23-.81.38-.38.61-.73.81-1.23.15-.38.33-.95.37-2 .06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.04-1.05-.22-1.62-.37-2a3.3 3.3 0 00-.81-1.23 3.3 3.3 0 00-1.23-.81c-.38-.15-.95-.33-2-.37C15.52 4 15.15 4 12 4zm0 3.06A4.94 4.94 0 1112 17a4.94 4.94 0 010-9.88zm0 1.8a3.14 3.14 0 100 6.28 3.14 3.14 0 000-6.28zm5.14-2.03a1.15 1.15 0 110 2.3 1.15 1.15 0 010-2.3z" />
        </svg>
      )
    case 'github':
      return (
        <svg {...common}>
          <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.56 2.34 1.1 2.91.85.1-.66.35-1.1.63-1.36-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.04A9.45 9.45 0 0112 6.84c.85 0 1.7.12 2.5.35 1.9-1.32 2.74-1.04 2.74-1.04.55 1.4.2 2.44.1 2.7.64.71 1.03 1.62 1.03 2.73 0 3.92-2.34 4.78-4.57 5.03.36.32.68.94.68 1.9v2.81c0 .28.18.6.69.49C19.13 20.54 22 16.72 22 12.22 22 6.58 17.52 2 12 2z" />
        </svg>
      )
    default:
      return null
  }
}

function Star({ filled = true }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 1.5l1.95 4.18 4.55.49-3.4 3.1.94 4.48L8 11.6 3.96 13.75l.94-4.48-3.4-3.1 4.55-.49L8 1.5z" />
    </svg>
  )
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
}

function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials-glow" aria-hidden="true" />
      <svg
        className="testimonials-bg-quote"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <path
          d="M14 64c0-18 11-30 28-34l3 7c-11 3-19 11-19 22h13v25H14V64zm44 0c0-18 11-30 28-34l3 7c-11 3-19 11-19 22h13v25H58V64z"
          fill="currentColor"
        />
      </svg>

      <div className="testimonials-inner">
        <div className="testimonials-head">
          <span className="pill">Testimonials</span>
          <h2 className="testimonials-title">
            What our{' '}
            <span className="testimonials-title-accent">clients say</span>
          </h2>
          <p className="testimonials-sub">
            We work with founders, product teams, and enterprises across the
            globe — here's what they have to say after shipping with us.
          </p>

          <div className="testimonials-trust">
            <AvatarCircles
              avatarUrls={TESTIMONIAL_AVATARS}
              numPeople={199}
              size={40}
            />
            <span className="testimonials-trust-label">
              Loved by <strong>200+</strong> teams worldwide
            </span>
          </div>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => {
            const fullStars = Math.floor(t.rating)
            return (
              <article key={t.name} className="testimonial-card">
                <div className="testimonial-card-top">
                  <div
                    className="testimonial-rating"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} filled={i < fullStars} />
                    ))}
                  </div>
                  <svg
                    className="testimonial-quote-mark"
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 22c0-6 4-10 10-12l1 3c-4 1-7 4-7 8h5v9H6v-8zm15 0c0-6 4-10 10-12l1 3c-4 1-7 4-7 8h5v9h-9v-8z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                <p className="testimonial-quote">{t.quote}</p>

                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{
                      background: `linear-gradient(135deg, ${t.accent} 0%, color-mix(in srgb, ${t.accent} 40%, transparent) 100%)`,
                    }}
                    aria-hidden="true"
                  >
                    {getInitials(t.name)}
                  </div>
                  <div className="testimonial-author-info">
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">
                      {t.role} <span aria-hidden="true">·</span> {t.company}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()

  const footerNav = [
    {
      title: 'Services',
      links: [
        'Web Design',
        'Web Development',
        'App Development',
        'Data & AI Consulting',
        'Digital Workplace',
        'IT Modernization',
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Projects', href: '#projects' },
        { label: 'About', href: '#about' },
        { label: 'Careers', href: '#career' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ]

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo size={22} />
            <p className="footer-tagline">
              We help ambitious companies design, build, and scale future-ready
              digital experiences.
            </p>
            <ul className="footer-socials" aria-label="Social links">
              {['linkedin', 'twitter', 'instagram', 'github'].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="footer-social"
                    aria-label={s}
                    onClick={(e) => e.preventDefault()}
                  >
                    <SocialIcon name={s} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerNav.map((col) => (
            <div key={col.title} className="footer-col">
              <h4 className="footer-col-title">{col.title}</h4>
              <ul className="footer-links">
                {col.links.map((link) => {
                  const label = typeof link === 'string' ? link : link.label
                  const href = typeof link === 'string' ? '#services' : link.href
                  return (
                    <li key={label}>
                      <a className="footer-link" href={href}>
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          <div className="footer-col">
            <h4 className="footer-col-title">Get in touch</h4>
            <ul className="footer-contact">
              <li>
                <span className="footer-contact-label">Email</span>
                <a className="footer-contact-value" href="mailto:support@essixx.com">
                  support@essixx.com
                </a>
              </li>
              <li>
                <span className="footer-contact-label">Phone</span>
                <a className="footer-contact-value" href="tel:+919000000000">
                  +91 90000 00000
                </a>
              </li>
              <li>
                <span className="footer-contact-label">Office</span>
                <span className="footer-contact-value">
                  Navale Bridge, Pune · Maharashtra, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {year} Essixx. All rights reserved.</p>
          <ul className="footer-legal">
            <li>
              <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="footer-link" onClick={(e) => e.preventDefault()}>
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero theme={theme} />
        <Services />
        <Projects />
        <Career theme={theme} />
        <About />
        <Contact />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}

export default App
