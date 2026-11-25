import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../../seo/siteConfig.js'
import EssixxMark from '../brand/EssixxMark.jsx'
import { Reveal } from '../home/Reveal.jsx'
import { PROJECT_MAILTO } from './links.js'
import './Site.css'

const COLUMNS = [
  {
    title: 'Menu',
    links: [
      { label: 'Work', to: '/?scroll=work' },
      { label: 'Services', to: '/?scroll=services' },
      { label: 'Pricing', to: '/?scroll=pricing' },
      { label: 'FAQ', to: '/?scroll=faq' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Essixx', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Products', to: '/launch' },
      { label: 'Pratiksha Relekar', to: '/pratiksha' },
    ],
  },
]

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    d: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z',
  },
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    d: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z',
  },
  {
    label: 'X (Twitter)',
    href: siteConfig.social.twitter,
    d: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24H16.17l-4.71-6.23-5.4 6.23H2.74l7.73-8.84L1.25 2.25H8.08l4.25 5.62 5.91-5.62zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z',
  },
  {
    label: 'GitHub',
    href: siteConfig.social.github,
    d: 'M12 .3a12 12 0 00-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 011.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0012 .3',
  },
]

/** Closing call-to-action that sits on the page, above the dark footer. */
function FooterCta() {
  return (
    <section className="wrap footer-cta">
      <Reveal>
        <p className="eyebrow">Available for new projects</p>
        <h2 className="footer-title">
          Have something <em>in mind?</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="footer-cta-side">
        <p className="lead">
          Tell us what you&rsquo;re building. We reply within a day with honest next
          steps — websites start from ₹19,999.
        </p>
        <a className="footer-mail" href={PROJECT_MAILTO}>
          {siteConfig.email}
          <ArrowUpRight size={22} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  )
}

export default function SiteFooter({ cta = true }) {
  const a = siteConfig.address

  return (
    <>
      {cta ? <FooterCta /> : null}

      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="footer-logo ex-mark-host" aria-label="Essixx home">
                <span className="footer-logo-tile">
                  <EssixxMark size={14} interactive />
                </span>
                Essixx
              </Link>
              <span className="footer-rule" aria-hidden="true" />
              <p>
                Design and development studio building websites, apps and brands from{' '}
                {a.addressLocality}.
              </p>
            </div>

            <nav className="footer-cols" aria-label="Footer">
              {COLUMNS.map((col) => (
                <div key={col.title} className="footer-col">
                  <h3>{col.title}</h3>
                  <ul>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.to}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="footer-col">
                <h3>Contact</h3>
                <ul>
                  <li>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </li>
                  {siteConfig.phone ? (
                    <li>
                      <a href={`tel:${siteConfig.phone}`}>
                        {siteConfig.phoneDisplay || siteConfig.phone}
                      </a>
                    </li>
                  ) : null}
                  <li>
                    <address>
                      {a.streetAddress},
                      <br />
                      {a.addressLocality}, {a.addressRegion}
                      <br />
                      {a.postalCode}
                    </address>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="footer-bottom">
            <p>Copyright © {new Date().getFullYear()} Essixx. All rights reserved.</p>
            <div className="footer-bottom-right">
              <Link to="/careers">Careers</Link>
              <Link to="/launch">Products</Link>
              <ul className="footer-socials">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                    >
                      <Icon d={s.d} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized wordmark, cropped by the page edge and blurred
            progressively towards the bottom. */}
        <div className="footer-word" aria-hidden="true">
          <span className="footer-word-text">Essixx</span>
          <span className="footer-word-blur footer-word-blur--1" />
          <span className="footer-word-blur footer-word-blur--2" />
          <span className="footer-word-blur footer-word-blur--3" />
          <span className="footer-word-blur footer-word-blur--4" />
        </div>
      </footer>
    </>
  )
}
