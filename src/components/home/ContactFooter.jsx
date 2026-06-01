import { FooterRocksReveal, Reveal } from './Reveal.jsx'

function FooterArrowIcon() {
  return (
    <span className="sx-footer-link-icon" aria-hidden="true">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M2 7L7 2M7 2H3.5M7 2V5.5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function ContactFooter() {
  return (
    <footer id="contact" className="sx-footer">
      <div className="sx-footer-inner">
        <div className="sx-footer-grid">
          <Reveal className="sx-footer-col sx-footer-col--lead">
            <h2>We&apos;d love to hear from you</h2>
            <p>
              We&apos;re always open to new ideas, partnerships, and opportunities.
            </p>
          </Reveal>

          <Reveal className="sx-footer-col" delay={0.08}>
            <h3>Mail us</h3>
            <p>Don&apos;t like the forms? Drop us a line via email</p>
            <a href="mailto:info@essixx.com" className="sx-footer-link">
              <span>info@essixx.com</span>
              <FooterArrowIcon />
            </a>
          </Reveal>

          <Reveal className="sx-footer-col" delay={0.14}>
            <h3>Book a call</h3>
            <p>Let&apos;s discuss your needs and KPI&apos;s in detail. Speak soon!</p>
            <a href="mailto:info@essixx.com?subject=Book%20a%20call" className="sx-footer-link">
              <span>Let&apos;s talk</span>
              <FooterArrowIcon />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="sx-footer-scene" aria-hidden="true">
        <FooterRocksReveal className="sx-footer-scene-reveal">
          <img src="/footer-rocks.png" alt="" draggable={false} />
        </FooterRocksReveal>
      </div>
    </footer>
  )
}
