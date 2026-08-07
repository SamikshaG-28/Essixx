import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../seo/siteConfig.js'
import './ContactFooter.css'

const NAV_LINKS = [
  { label: 'Projects', to: '/?scroll=projects' },
  { label: 'Clients', to: '/?scroll=clients' },
  { label: 'Hire us', to: '/?scroll=pricing' },
  { label: 'Studio', to: '/?scroll=studio' },
  { label: 'FAQ', to: '/?scroll=faq' },
]

const COMPANY_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Pratiksha', to: '/pratiksha' },
  { label: 'Launch', to: '/launch' },
]

const SOCIAL = [
  {
    label: 'Instagram',
    href: siteConfig.social.instagram,
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'X',
    href: siteConfig.social.twitter,
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.social.linkedin,
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    href: siteConfig.social.github,
    path: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
  },
]

function fitWatermark(svg, text) {
  if (!svg || !text) return
  try {
    const bbox = text.getBBox()
    svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`)
  } catch {
    // ignore until fonts paint
  }
}

export default function ContactFooter() {
  const svgRef = useRef(null)
  const textRef = useRef(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const run = () => fitWatermark(svgRef.current, textRef.current)
    if (document.fonts?.ready) {
      document.fonts.ready.then(run)
    } else {
      window.addEventListener('load', run)
    }
    window.addEventListener('resize', run)
    run()
    return () => window.removeEventListener('resize', run)
  }, [])

  const onSubscribe = (e) => {
    e.preventDefault()
    const value = email.trim()
    const subject = encodeURIComponent('Essixx enquiry')
    const body = value ? encodeURIComponent(`Please contact me at ${value}`) : ''
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}${body ? `&body=${body}` : ''}`
  }

  return (
    <section id="contact" className="footer-section">
      <div className="footer-wrapper">
        <div className="footer-left">
          <video
            className="footer-left-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4"
              type="video/mp4"
            />
          </video>

          <div className="footer-logo">
            <div className="footer-logo-mark" aria-hidden="true">
              E
            </div>
            <span className="footer-logo-name">Essixx</span>
          </div>

          <div className="footer-tagline-container">
            <p className="footer-tagline">
              Freelance websites &amp; apps,
              <br />
              <span>from ₹19,999 only.</span>
            </p>
          </div>

          <div className="footer-social-row">
            <span className="footer-social-label">Stay in touch!</span>
            <div className="footer-social-icons">
              {SOCIAL.map((item) => (
                <a
                  key={item.label}
                  className="social-icon"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
                    <path fill="currentColor" d={item.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-lucky-graphic" aria-hidden="true">
            <div className="lucky-cube">
              <span className="lucky-cube-mark">E</span>
            </div>
            <div className="lucky-text-row">
              <span className="lucky-arrow">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 20 C 6 14, 10 9, 18 5" />
                  <path d="M18 5 L 12 5" />
                  <path d="M18 5 L 18 11" />
                </svg>
              </span>
              <span className="lucky-text">Feeling lucky?</span>
            </div>
          </div>

          <div className="footer-right-top">
            <div className="footer-nav-cols">
              <div className="footer-col">
                <h3 className="footer-col-title">Navigation</h3>
                {NAV_LINKS.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="footer-col">
                <h3 className="footer-col-title">Company</h3>
                {COMPANY_LINKS.map((link) => (
                  <Link key={link.label} to={link.to}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © {new Date().getFullYear()} Essixx. All rights reserved.
            </p>

            <div className="footer-cta-mini">
              <h4>
                Need a website?
                <br />
                <strong>Start from ₹19,999.</strong>
              </h4>
              <form className="footer-subscribe-row" onSubmit={onSubscribe}>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-watermark" aria-hidden="true">
        <svg
          ref={svgRef}
          id="watermarkSvg"
          viewBox="62 95 876 175"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            ref={textRef}
            id="watermarkText"
            x="500"
            y="240"
            textAnchor="middle"
            fontSize="320"
          >
            Essixx
          </text>
        </svg>
      </div>
    </section>
  )
}
