import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronUp } from 'lucide-react'
import { siteConfig } from '../../seo/siteConfig.js'
import EssixxMark from '../brand/EssixxMark.jsx'
import './HeroLanding.css'

const TICKER_ITEMS = [
  'Brand Identity',
  'App Development',
  'Visual Design',
  'Creative Video',
  'Iconography',
]

const DRAWER_LINKS = [
  { label: 'Projects', target: 'projects' },
  { label: 'Plans', target: 'pricing' },
  { label: 'Team', target: 'studio' },
  { label: 'FAQs', target: 'faq' },
  { label: 'Get in Touch', target: 'contact' },
]

// The platforms Essixx builds on. Kept as a capability signal, not a client
// list — naming companies we haven't worked with would be a false trust claim.
const STACK_LOGOS = [
  { name: 'React', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Next.js', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 800 } },
  { name: 'Figma', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 600 } },
  { name: 'Stripe', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 800 } },
  { name: 'Razorpay', style: { fontFamily: 'Inter, sans-serif', fontWeight: 700 } },
  { name: 'Firebase', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Supabase', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Vercel', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Webflow', style: { fontFamily: 'Inter, sans-serif', fontWeight: 700 } },
  { name: 'Framer', style: { fontFamily: '"Source Serif 4", serif', fontWeight: 600 } },
]

// Self-hosted: the hero backdrop is the LCP element, so it must not depend on
// a third-party CDN handshake.
const HERO_BG = '/hero-aurora.webp'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function CurvedLines({ side }) {
  const count = 20
  return (
    <div className={`az-lines az-lines--${side}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={`${side}-${i}`}
          className="az-line"
          style={{
            width: `${60 + i * 10}px`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </div>
  )
}

function TopLines() {
  return (
    <div className="az-lines az-lines--top" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <span
          key={`top-${i}`}
          className="az-line az-line--horizontal"
          style={{
            height: `${40 + i * 8}px`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </div>
  )
}

function MarqueeRow({ items, className = '', renderItem }) {
  const loop = [...items, ...items, ...items, ...items]
  return (
    <div className={`az-marquee ${className}`}>
      <div className="az-marquee-track">
        {loop.map((item, i) => renderItem(item, i))}
      </div>
    </div>
  )
}

function BrandLogo({ onClick, animate = false }) {
  return (
    <button type="button" className="az-logo ex-mark-host" onClick={onClick}>
      <EssixxMark size={22} interactive animate={animate} title="Essixx" />
      <span className="az-logo-word">
        Essixx
        <sup>®</sup>
      </span>
    </button>
  )
}

export default function HeroLanding() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // The nav floats over both the light hero and the dark sections below, so it
  // earns a backdrop as soon as it stops sitting on the hero.
  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (target) => {
    setMenuOpen(false)
    window.setTimeout(() => scrollTo(target), 80)
  }

  return (
    <div className="az-landing">
      <header className={`az-nav${condensed ? ' is-condensed' : ''}`}>
        <div className="az-nav-inner">
          <BrandLogo animate onClick={() => scrollTo('home')} />
          <div className="az-nav-actions">
            <Link to="/login" className="az-signin-btn">
              Sign in
            </Link>
            <button
              type="button"
              className="az-menu-btn"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="az-drawer"
            >
              Menu
              <ChevronUp size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div
        id="az-drawer"
        className={`az-drawer${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="az-drawer-top">
          <BrandLogo onClick={() => go('home')} />
          <button type="button" className="az-menu-btn" onClick={() => setMenuOpen(false)}>
            Close
            <ChevronUp size={16} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </div>
        <nav className="az-drawer-links">
          {DRAWER_LINKS.map((link) => (
            <button key={link.label} type="button" onClick={() => go(link.target)}>
              {link.label}
            </button>
          ))}
          <a className="az-drawer-auth" href="/login">
            Log in
          </a>
          <a className="az-drawer-auth az-drawer-auth--solid" href="/signup">
            Sign up
          </a>
        </nav>
        <p className="az-drawer-copy">
          © {new Date().getFullYear()} Essixx. All rights reserved.
        </p>
      </div>

      <section id="home" className="az-hero">
        <div
          className="az-hero-bg"
          style={{ '--az-hero-image': `url("${HERO_BG}")` }}
          aria-hidden="true"
        />
        <CurvedLines side="left" />
        <CurvedLines side="right" />
        <TopLines />

        <div className="az-hero-content">
          <MarqueeRow
            className="az-ticker"
            items={TICKER_ITEMS}
            renderItem={(item, i) => (
              <span key={`${item}-${i}`} className="az-ticker-item">
                {item}
              </span>
            )}
          />

          <h1 className="az-title">
            Premium creative{' '}
            <span className="az-serif-italic">essixx</span>
            <sup>®</sup> on demand.
          </h1>

          <p className="az-subtitle">
            A Pune-based web development and design studio for founders, brands, and
            agencies — websites, apps, and brand systems delivered on your timeline.
          </p>

          <div className="az-cta-row">
            <button type="button" className="az-btn-primary" onClick={() => scrollTo('pricing')}>
              View Plans
            </button>
            <a
              className="az-btn-book"
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Chat for 15 minutes')}`}
            >
              <img
                src="/team/kartik-sabale.webp"
                alt="Kartik Sabale, founder at Essixx"
                width={40}
                height={40}
                loading="eager"
                decoding="async"
              />
              <span className="az-btn-book-text">
                <strong>Chat for 15 minutes</strong>
                <span className="az-btn-book-sub">
                  <i className="az-online-dot" aria-hidden="true" />
                  Pick a slot
                </span>
              </span>
            </a>
          </div>
        </div>

        <div className="az-hero-blur" aria-hidden="true" />
      </section>

      <section className="az-trusted" aria-label="Technologies we build with">
        <div className="az-trusted-inner">
          <p className="az-trusted-label">Technologies we build with</p>
          <MarqueeRow
            className="az-trusted-marquee"
            items={STACK_LOGOS}
            renderItem={(logo, i) => (
              <span key={`${logo.name}-${i}`} className="az-trusted-logo" style={logo.style}>
                {logo.name}
              </span>
            )}
          />
        </div>
      </section>
    </div>
  )
}
