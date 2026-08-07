import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FAQS } from '../../data/faqs.js'
import { siteConfig } from '../../seo/siteConfig.js'
import './FaqSection.css'

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index))
  }

  return (
    <section id="faq" className="c5-section">
      <div className="c5-container">
        <div className="c5-grid">
          <div className="c5-animated-gradient c5-cta">
            <h2>
              Ready to build
              <br />
              your next product?
            </h2>
            <p>Website development from ₹19,999 only</p>
            <button type="button" className="c5-cta-btn" onClick={scrollToContact}>
              Get Started Today
            </button>
          </div>

          <div className="c5-faq">
            {FAQS.map((faq, index) => {
              const active = activeIndex === index
              return (
                <div
                  key={faq.question}
                  className={`c5-faq-item${active ? ' is-active' : ''}`}
                  onClick={() => toggle(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggle(index)
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={active}
                >
                  <div className="c5-faq-row">
                    <span>{faq.question}</span>
                    {active ? (
                      <ChevronUp size={20} aria-hidden="true" />
                    ) : (
                      <ChevronDown size={20} aria-hidden="true" />
                    )}
                  </div>
                  {active && <div className="c5-faq-answer">{faq.answer}</div>}
                </div>
              )
            })}
            <p className="c5-faq-note">
              Still curious?{' '}
              <a href={`mailto:${siteConfig.email}`}>Write to us</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
