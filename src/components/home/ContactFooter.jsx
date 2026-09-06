import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../seo/siteConfig.js'
import { prefersReducedMotion } from '../../lib/utils.js'
import EssixxMark from '../brand/EssixxMark.jsx'
import './ContactFooter.css'

function LinkedinIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

const SOCIALS = [
  { label: 'LinkedIn', href: siteConfig.social.linkedin, Icon: LinkedinIcon },
  { label: 'Twitter', href: siteConfig.social.twitter, Icon: TwitterIcon },
  { label: 'Instagram', href: siteConfig.social.instagram, Icon: InstagramIcon },
]

const PRODUCT_LINKS = [
  { label: 'Projects', to: '/?scroll=projects' },
  { label: 'Capabilities', to: '/?scroll=capabilities' },
  { label: 'Pricing', to: '/?scroll=pricing' },
  { label: 'FAQ', to: '/?scroll=faq' },
]

const SCIENCE_LINKS = [
  { label: 'Studio', to: '/?scroll=studio' },
  { label: 'Launch', to: '/launch' },
  { label: 'Clients', to: '/?scroll=clients' },
  { label: 'Hire us', to: '/?scroll=pricing' },
]

const COMPANY_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Pratiksha', to: '/pratiksha' },
]

function LogoIcon() {
  return <EssixxMark className="ft-logo-icon" size={34} tile interactive title="Essixx" />
}

function FooterLink({ to, children }) {
  if (to.startsWith('/?') || to.startsWith('/#')) {
    return (
      <Link to={to} className="ft-link">
        {children}
      </Link>
    )
  }
  return (
    <Link to={to} className="ft-link">
      {children}
    </Link>
  )
}

function FooterCard() {
  return (
    <div className="ft-card-wrap">
      <div className="ft-card-outer">
        <div className="ft-card-inner">
          <div className="ft-grid">
            <div className="ft-brand">
              <div className="ft-brand-row ex-mark-host">
                <LogoIcon />
                <span className="ft-brand-name">Essixx</span>
              </div>
              <p className="ft-brand-desc">
                Freelance web development in Pune — modern websites, apps, and digital
                products from ₹19,999 only.
              </p>
              <div className="ft-socials">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ft-social"
                    aria-label={label}
                  >
                    <Icon className="ft-social-icon" />
                  </a>
                ))}
              </div>
            </div>

            <div className="ft-col">
              <h4>Product</h4>
              <ul>
                {PRODUCT_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-col">
              <h4>Studio</h4>
              <ul>
                {SCIENCE_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ft-col">
              <h4>Company</h4>
              <ul>
                {COMPANY_LINKS.map((link) => (
                  <li key={link.label}>
                    <FooterLink to={link.to}>{link.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="ft-legal">
          <p>© {new Date().getFullYear()} Essixx. All rights reserved.</p>
          <div className="ft-legal-right">
            <Link to="/login" className="ft-legal-link">
              Log in
            </Link>
            <div className="ft-sep" aria-hidden="true" />
            <Link to="/signup" className="ft-legal-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Brand signature above the footer: the monogram extrudes into depth as it
 * scrolls into view, then settles. Runs once — it's punctuation, not a loop.
 */
function SignatureMark() {
  const ref = useRef(null)
  const [deep, setDeep] = useState(prefersReducedMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDeep(true)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`ft-signature${deep ? ' is-deep' : ''}`}>
      <EssixxMark size={132} extrude interactive={false} title="Essixx monogram" />
    </div>
  )
}

function GlassText() {
  return (
    <div className="ft-glass">
      <svg className="ft-glass-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000000"
              floodOpacity="0.25"
              result="outer-shadow"
            />
            <feComponentTransfer in="SourceAlpha" result="alpha">
              <feFuncA type="linear" slope="1" />
            </feComponentTransfer>
            <feOffset in="alpha" dx="0" dy="4" result="offset-white" />
            <feGaussianBlur in="offset-white" stdDeviation="4" result="blur-white" />
            <feComposite in="alpha" in2="blur-white" operator="out" result="inner-white-mask" />
            <feFlood floodColor="#ffffff" floodOpacity="0.25" result="white-fill" />
            <feComposite
              in="white-fill"
              in2="inner-white-mask"
              operator="in"
              result="inner-white-final"
            />
            <feGaussianBlur in="alpha" stdDeviation="6" result="blur-black" />
            <feComposite in="alpha" in2="blur-black" operator="out" result="inner-black-mask" />
            <feFlood floodColor="#000000" floodOpacity="0.25" result="black-fill" />
            <feComposite
              in="black-fill"
              in2="inner-black-mask"
              operator="in"
              result="inner-black-final"
            />
            <feMerge>
              <feMergeNode in="outer-shadow" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="inner-white-final" />
              <feMergeNode in="inner-black-final" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="ft-glass-motion"
      >
        <h2 className="ft-glass-text" style={{ filter: 'url(#glass-effect)' }}>
          Essixx
        </h2>
      </motion.div>
    </div>
  )
}

export default function ContactFooter() {
  return (
    <footer id="contact" className="ft-section">
      <SignatureMark />
      <FooterCard />
      <GlassText />
    </footer>
  )
}
