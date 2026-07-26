import { Reveal } from './Reveal.jsx'

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function FreelancerOfferSection() {
  return (
    <section id="hire" className="sx-hire">
      <div className="sx-hire-inner">
        <Reveal className="sx-hire-copy">
          <span className="sx-badge sx-badge--outline">Freelancers</span>
          <h2>
            We are freelancers.
            <br />
            Need a website? Get in touch.
          </h2>
          <p>
            If you want to develop your website, you can contact us. Website development
            starts from <strong>₹19,999</strong> only — modern, responsive, and ready to grow
            your business.
          </p>
          <div className="sx-hire-actions">
            <button type="button" className="sx-hire-cta" onClick={scrollToContact}>
              Contact us
              <span aria-hidden="true">→</span>
            </button>
            <a className="sx-hire-mail" href="mailto:info@essixx.com?subject=Website%20development%20enquiry">
              info@essixx.com
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="sx-hire-price">
          <span className="sx-hire-price-label">Starting from</span>
          <strong className="sx-hire-price-value">₹19,999</strong>
          <span className="sx-hire-price-note">per website project</span>
        </Reveal>
      </div>
    </section>
  )
}
