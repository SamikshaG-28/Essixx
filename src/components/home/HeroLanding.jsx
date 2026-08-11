import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronUp } from 'lucide-react'
import { siteConfig } from '../../seo/siteConfig.js'
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

const TRUSTED_LOGOS = [
  { name: 'Airbnb', style: { fontFamily: '"Cedarville Cursive", cursive', fontWeight: 700 } },
  { name: 'Shopify', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 800 } },
  { name: 'Notion', style: { fontFamily: 'Georgia, serif', fontWeight: 500 } },
  { name: 'Linear', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Webflow', style: { fontFamily: 'Inter, sans-serif', fontWeight: 700 } },
  { name: 'Figma', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 600 } },
  { name: 'Slack', style: { fontFamily: 'Georgia, serif', fontWeight: 700 } },
  { name: 'Stripe', style: { fontFamily: 'system-ui, sans-serif', fontWeight: 800 } },
  { name: 'Vercel', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Framer', style: { fontFamily: '"Source Serif 4", serif', fontWeight: 600 } },
]

const HERO_BG =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260626_041422_4a459e05-abce-4150-9fb7-4ededc423cd1.png&w=1280&q=85'

const AVATAR_URL =
  'https://framerusercontent.com/images/hfneFL6CHBi5BnNvCeOaqU9HqE4.png'

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

export default function HeroLanding() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const go = (target) => {
    setMenuOpen(false)
    window.setTimeout(() => scrollTo(target), 80)
  }

  return (
    <div className="az-landing">
      <header className="az-nav">
        <div className="az-nav-inner">
          <button type="button" className="az-logo" onClick={() => scrollTo('home')}>
            Essixx
            <sup>®</sup>
          </button>
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
          <button type="button" className="az-logo" onClick={() => go('home')}>
            Essixx
            <sup>®</sup>
          </button>
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
            A flexible design partnership for founders, brands, and agencies who want
            top craft delivered on their timeline.
          </p>

          <div className="az-cta-row">
            <button type="button" className="az-btn-primary" onClick={() => scrollTo('pricing')}>
              View Plans
            </button>
            <a
              className="az-btn-book"
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent('Chat for 15 minutes')}`}
            >
              <img src={AVATAR_URL} alt="" width={40} height={40} />
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

      <section className="az-trusted" aria-label="Trusted partners">
        <div className="az-trusted-inner">
          <p className="az-trusted-label">Partnered with top-tier companies globally</p>
          <MarqueeRow
            className="az-trusted-marquee"
            items={TRUSTED_LOGOS}
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
