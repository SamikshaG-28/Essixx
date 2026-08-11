import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroLanding from '../components/home/HeroLanding.jsx'
import IntroSection from '../components/home/IntroSection.jsx'
import BenefitsSection from '../components/home/BenefitsSection.jsx'
import IntegrationsSection from '../components/home/IntegrationsSection.jsx'
import ProjectsSection from '../components/home/ProjectsSection.jsx'
import PricingSection from '../components/home/PricingSection.jsx'
import PrecisionSection from '../components/home/PrecisionSection.jsx'
import OurTeamSection from '../components/home/OurTeamSection.jsx'
import FaqSection from '../components/home/FaqSection.jsx'
import ContactFooter from '../components/home/ContactFooter.jsx'
import './HomePage.css'

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

        <PrecisionSection />

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
