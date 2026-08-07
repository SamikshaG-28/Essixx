import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Reveal } from '../components/home/Reveal.jsx'
import HeroLanding from '../components/home/HeroLanding.jsx'
import IntroSection from '../components/home/IntroSection.jsx'
import BenefitsSection from '../components/home/BenefitsSection.jsx'
import IntegrationsSection from '../components/home/IntegrationsSection.jsx'
import ProjectsSection from '../components/home/ProjectsSection.jsx'
import PricingSection from '../components/home/PricingSection.jsx'
import OurTeamSection from '../components/home/OurTeamSection.jsx'
import FaqSection from '../components/home/FaqSection.jsx'
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
  { title: 'Ferron live on Play Store', sub: 'Laundry billing app shipping updates' },
  { title: 'XiPay UI kit published', sub: 'Free payment gateway kit on GitHub' },
  { title: 'Motvyn in testing', sub: 'Landing live — Play Store release upcoming' },
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
      <main>
        <HeroLanding />

        <IntroSection />

        <BenefitsSection />

        <IntegrationsSection />

        <ProjectsSection />

        <PricingSection />

        <section className="sx-compare">
          <div className="sx-compare-bg" aria-hidden="true" />
          <Reveal>
            <span className="sx-badge sx-badge--center sx-badge--light">Why Essixx</span>
            <h2 className="sx-section-title sx-section-title--light">
              Freelance quality.
              <br />
              Agency prices? Not here.
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

        <section className="sx-live">
          <span className="sx-live-label">Live system activity</span>
          <div className="sx-live-track-wrap">
            <div className="sx-live-track">
              {[...LIVE_ITEMS, ...LIVE_ITEMS].map((item, i) => (
                <div key={i} className="sx-live-item">
                  <span className="sx-live-dot" aria-hidden="true" />
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <OurTeamSection />

        <FaqSection />

        <ContactFooter />
      </main>
    </div>
  )
}
