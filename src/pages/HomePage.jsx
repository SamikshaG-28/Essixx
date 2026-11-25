import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroLanding from '../components/home/HeroLanding.jsx'
import ScreensSection from '../components/home/ScreensSection.jsx'
import IntroSection from '../components/home/IntroSection.jsx'
import BenefitsSection from '../components/home/BenefitsSection.jsx'
import IntegrationsSection from '../components/home/IntegrationsSection.jsx'
import PricingSection from '../components/home/PricingSection.jsx'
import PrecisionSection from '../components/home/PrecisionSection.jsx'
import OurTeamSection from '../components/home/OurTeamSection.jsx'
import FaqSection from '../components/home/FaqSection.jsx'
import ContactFooter from '../components/home/ContactFooter.jsx'
import './HomePage.css'

const LIVE_ITEMS = [
  { title: '105 caption styles', sub: 'Trending, neon, editorial and hand-drawn' },
  { title: 'Runs on your machine', sub: 'No upload, no queue, no per-minute bill' },
  { title: 'Hinglish transcripts', sub: 'Hindi and English in the same line' },
  { title: 'Windows build in CI', sub: 'macOS available now' },
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

        {/* Straight after the hero: someone who has just read "Essy captions
            your reels" wants to see it before they read anything else. */}
        <ScreensSection />

        <IntroSection />

        <BenefitsSection />

        <IntegrationsSection />

        <PricingSection />

        <PrecisionSection />

        <section className="sx-live">
          <span className="sx-live-label">What Essy ships with</span>
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
