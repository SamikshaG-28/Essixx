import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SynexNav from '../components/home/SynexNav.jsx'
import { HeroReveal, HeroMountainReveal, Reveal } from '../components/home/Reveal.jsx'
import HeroDashboard from '../components/home/HeroDashboard.jsx'
import IntroSection from '../components/home/IntroSection.jsx'
import CoreCapabilities from '../components/home/CoreCapabilities.jsx'
import IntegrationsSection from '../components/home/IntegrationsSection.jsx'
import OurTeamSection from '../components/home/OurTeamSection.jsx'
import ContactFooter from '../components/home/ContactFooter.jsx'
import './HomePage.css'

const COMPARE_ROWS = [
  'Multi-platform delivery',
  'Real-time collaboration',
  'AI-driven insights',
  'Unified project dashboard',
]

const LIVE_ITEMS = [
  { title: 'Unified infrastructure', sub: '+ 2.4% performance impact' },
  { title: 'New market signal detected', sub: 'Volatility decreasing across equities' },
  { title: 'Mobile release shipped', sub: 'Gojira Android v2.1 live on Play Store' },
  { title: 'AI workflow applied', sub: 'Automation reduced delivery time 18%' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const id = params.get('scroll')
    if (!id) return
    const timer = window.setTimeout(() => scrollTo(id), 120)
    return () => window.clearTimeout(timer)
  }, [location.search])

  return (
    <div className="sx-page">
      <SynexNav />
      <main>
      <section id="home" className="sx-hero">
        <div className="sx-hero-atmosphere" aria-hidden="true" />
        <div className="sx-hero-bottom-fade" aria-hidden="true" />

        <HeroMountainReveal side="left" delay={0.48} className="sx-hero-mountain sx-hero-mountain--left">
          <img
            src="/left.png"
            alt=""
            aria-hidden="true"
            draggable={false}
          />
        </HeroMountainReveal>

        <div className="sx-hero-copy">
          <HeroReveal delay={0.05}>
            <p className="sx-hero-eyebrow">Digital reimagined</p>
          </HeroReveal>
          <HeroReveal delay={0.14}>
            <h1 className="sx-hero-title">
              <span className="sx-hero-title-muted">A new standard</span>
              <span className="sx-hero-title-strong"> in digital excellence</span>
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.24}>
            <p className="sx-hero-desc">
              Take full control of your products with a unified platform for design,
              building, and growing your business online in real time.
            </p>
          </HeroReveal>
        </div>

        <div className="sx-hero-dashboard-wrap">
          <motion.div
            className="sx-hero-dashboard-inner"
            initial={{ y: 56, opacity: 0, scale: 0.96, rotateX: 8 }}
            animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 1200 }}
          >
            <HeroDashboard />
          </motion.div>
        </div>

        <HeroMountainReveal side="right" delay={0.58} className="sx-hero-mountain sx-hero-mountain--right">
          <img
            src="/right.png"
            alt=""
            aria-hidden="true"
            draggable={false}
          />
        </HeroMountainReveal>

        <button
          type="button"
          className="sx-hero-scroll"
          onClick={() => scrollTo('studio')}
        >
          <span className="sx-hero-scroll-icon" aria-hidden="true">×</span>
          Scroll to explore
        </button>
      </section>

      <IntroSection />

      <CoreCapabilities />

      <IntegrationsSection />

      {/* Comparison */}
      <section className="sx-compare">
        <div className="sx-compare-bg" aria-hidden="true" />
        <Reveal>
          <span className="sx-badge sx-badge--center sx-badge--light">Why Essixx</span>
          <h2 className="sx-section-title sx-section-title--light">
            Built for modern teams.
            <br />
            Not legacy agencies.
          </h2>
        </Reveal>
        <Reveal className="sx-compare-table" delay={0.1}>
          <div className="sx-compare-row sx-compare-head">
            <span>Core capabilities</span>
            <span className="sx-compare-brand">essixx</span>
            <span>Other platform</span>
          </div>
          {COMPARE_ROWS.map((row) => (
            <div key={row} className="sx-compare-row">
              <span>{row}</span>
              <span className="sx-compare-yes">✓</span>
              <span className="sx-compare-no">Absent</span>
            </div>
          ))}
          <div className="sx-compare-row sx-compare-foot">
            <span>Total operational cost</span>
            <span className="sx-compare-price">₹19,999 / project</span>
            <span className="sx-compare-price-alt">₹1,70,000 / project</span>
          </div>
        </Reveal>
      </section>

      {/* Live ticker */}
      <section className="sx-live">
        <span className="sx-live-label">Live system activity</span>
        <div className="sx-live-track-wrap">
          <motion.div
            className="sx-live-track"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
          >
            {[...LIVE_ITEMS, ...LIVE_ITEMS].map((item, i) => (
              <div key={i} className="sx-live-item">
                <span className="sx-live-dot" aria-hidden="true" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <OurTeamSection />

      <ContactFooter />
      </main>
    </div>
  )
}
