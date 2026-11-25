import { useEffect, useState } from 'react'
import { ChevronUp, Download } from 'lucide-react'
import EssixxMark from '../brand/EssixxMark.jsx'
import { NavAuthLinks, SignOutButton } from '../AccountControls.jsx'
import { useAccount } from '../../lib/useAccount.js'
import { BUILDS, ESSY_VERSION } from '../../data/downloads.js'
import './HeroLanding.css'

/**
 * The ticker, as captions.
 *
 * Each item is drawn in one of the app's real styles rather than as plain
 * text — a caption tool's hero should look like captions before a word of it
 * is read. The faces are the ones Essy bundles, loaded from Google Fonts here
 * because the site is online and the app is not.
 */
const TICKER_ITEMS = [
  { text: 'AUTO CAPTIONS', className: 'az-cap az-cap--lime' },
  { text: 'Hinglish', className: 'az-cap az-cap--script' },
  { text: '105 STYLES', className: 'az-cap az-cap--gold' },
  { text: 'face tracking', className: 'az-cap az-cap--cyan' },
  { text: 'RUNS OFFLINE', className: 'az-cap az-cap--outline' },
  { text: '4K EXPORT', className: 'az-cap az-cap--violet' },
]

const DRAWER_LINKS = [
  { label: 'Screenshots', target: 'screens' },
  { label: 'Plans', target: 'pricing' },
  { label: 'Team', target: 'studio' },
  { label: 'FAQs', target: 'faq' },
  { label: 'Get in Touch', target: 'contact' },
]

// Claims the app can actually back up, phrased as capabilities rather than
// logos: everything here is something Essy does on the machine it runs on.
const STACK_LOGOS = [
  { name: 'Whisper on-device', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Word-level timing', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'Hinglish transcripts', style: { fontFamily: 'Inter, sans-serif', fontWeight: 700 } },
  { name: 'Auto-reframe', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: '105 caption styles', style: { fontFamily: 'Inter, sans-serif', fontWeight: 700 } },
  { name: 'Style builder', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: '4K export', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'No upload', style: { fontFamily: 'Inter, sans-serif', fontWeight: 700 } },
  { name: 'No subscription', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
  { name: 'SRT & VTT', style: { fontFamily: 'Inter, sans-serif', fontWeight: 600 } },
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

/**
 * Platform marks.
 *
 * Inline rather than from the icon set: lucide has no Apple or Windows
 * glyph, and a generic laptop icon next to "Download for macOS" makes a
 * download button look like a guess.
 */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
      <path d="M16.36 12.78c.02-2.4 1.96-3.55 2.05-3.6-1.12-1.64-2.86-1.86-3.48-1.89-1.48-.15-2.89.87-3.64.87-.75 0-1.91-.85-3.14-.83-1.61.02-3.1.94-3.93 2.38-1.68 2.91-.43 7.21 1.2 9.57.8 1.15 1.75 2.45 3 2.4 1.2-.05 1.66-.78 3.11-.78 1.45 0 1.86.78 3.13.75 1.29-.02 2.11-1.18 2.9-2.34.91-1.34 1.29-2.64 1.31-2.7-.03-.01-2.51-.97-2.53-3.81zM14.0 5.8c.66-.81 1.11-1.93.99-3.05-.95.04-2.11.64-2.8 1.44-.61.71-1.15 1.85-1.01 2.94 1.06.08 2.15-.54 2.82-1.33z" />
    </svg>
  )
}

function WindowsMark() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
      <path d="M3 5.6l7.2-1v6.9H3V5.6zm0 12.8l7.2 1v-6.8H3v5.8zM11.3 4.4L21 3v8.5h-9.7V4.4zm0 15.2L21 21v-8.4h-9.7v7z" />
    </svg>
  )
}

/**
 * One platform's download.
 *
 * A build with nowhere to point is rendered as a `span`, not a dead anchor:
 * a button that looks live and does nothing is worse than one that says it
 * isn't ready. See `@/data/downloads`.
 */
function DownloadButton({ build }) {
  const Mark = build.os === 'mac' ? AppleMark : WindowsMark
  // Filled when it is a real download. No user-agent sniffing: the prerendered
  // HTML has no navigator to read, so deciding here would make the static page
  // and the hydrated one disagree — and with one platform built, leading with
  // it is a fact rather than a guess.
  const className = `az-dl${build.available ? ' az-dl--primary' : ' az-dl--soon'}`

  const inner = (
    <>
      <span className="az-dl-icon">
        <Mark />
      </span>
      <span className="az-dl-text">
        <strong>{build.label}</strong>
        <span className="az-dl-sub">{build.note}</span>
      </span>
      {build.available && (
        <Download size={16} strokeWidth={2.25} className="az-dl-arrow" aria-hidden="true" />
      )}
    </>
  )

  if (!build.available) {
    return (
      <span className={className} aria-disabled="true">
        {inner}
      </span>
    )
  }

  return (
    <a className={className} href={build.href} download>
      {inner}
    </a>
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
  const { user } = useAccount()

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
            <NavAuthLinks linkClass="az-signin-btn" />
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
          {user ? (
            <>
              <a className="az-drawer-auth" href="/dashboard" onClick={() => setMenuOpen(false)}>
                Account
              </a>
              <SignOutButton className="az-drawer-auth" icon={false} />
            </>
          ) : (
            <>
              <a className="az-drawer-auth" href="/login">
                Log in
              </a>
              <a className="az-drawer-auth az-drawer-auth--solid" href="/signup">
                Sign up
              </a>
            </>
          )}
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
              <span key={`${item.text}-${i}`} className="az-ticker-item">
                <span className={item.className}>{item.text}</span>
              </span>
            )}
          />

          <h1 className="az-title">
            <span className="az-serif-italic">Essy</span>
            <sup>®</sup> captions your reels in seconds.
          </h1>

          <p className="az-subtitle">
            A desktop caption editor for Hinglish creators. It transcribes on your
            own machine, styles every word, follows the speaker&rsquo;s face, and
            exports ready to post.
          </p>

          <div className="az-cta-row az-cta-row--downloads">
            {BUILDS.map((build) => (
              <DownloadButton key={build.os} build={build} />
            ))}
          </div>

          <p className="az-hero-meta">
            Version {ESSY_VERSION} &middot; free plan, no card &middot;{' '}
            <button type="button" className="az-hero-link" onClick={() => scrollTo('pricing')}>
              See plans
            </button>
          </p>
        </div>

        {/* The editor itself, in the hero. Everything above is a claim about
            a piece of software; this is the software. */}
        <div className="az-hero-shot">
          <div className="az-shot-chrome" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <picture>
            <source srcSet="/essy/editor.webp" type="image/webp" />
            <img
              src="/essy/editor.png"
              alt="The Essy editor: a Hinglish transcript, the video with a styled caption on it, the style gallery, and a word-level timeline."
              width={1440}
              height={900}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>

        <div className="az-hero-blur" aria-hidden="true" />
      </section>

      <section className="az-trusted" aria-label="What Essy does">
        <div className="az-trusted-inner">
          <p className="az-trusted-label">What Essy does on your machine</p>
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
