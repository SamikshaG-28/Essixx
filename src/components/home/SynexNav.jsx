import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Projects', target: 'projects' },
  { label: 'Marketing', target: 'digital-marketing' },
  { label: 'Plans', target: 'plans' },
  { label: 'Studio', target: 'studio' },
  { label: 'Contact', target: 'contact' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function SynexNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const activeScroll = new URLSearchParams(location.search).get('scroll')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (target) => {
    setOpen(false)
    if (isHome) {
      scrollTo(target)
      return
    }
    navigate(`/?scroll=${target}`)
  }

  const goHome = () => {
    setOpen(false)
    if (isHome) {
      scrollTo('home')
      return
    }
    navigate('/')
  }

  const isActive = (item) => {
    if (item.href) return location.pathname === item.href
    return isHome && activeScroll === item.target
  }

  return (
    <header className={`sx-nav sx-nav--light ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="sx-nav-inner">
        <button type="button" className="sx-logo" onClick={goHome}>
          essixx
        </button>

        <nav className="sx-nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                to={item.href}
                className={isActive(item) ? 'is-active' : undefined}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                className={isActive(item) ? 'is-active' : undefined}
                onClick={() => go(item.target)}
              >
                {item.label}
              </button>
            ),
          )}
        </nav>

        <div className="sx-nav-actions">
          <button type="button" className="sx-nav-ghost" onClick={() => go('contact')}>
            Request access
          </button>
          <Link to="/launch" className="sx-nav-cta sx-nav-cta--dark">
            <span className="sx-nav-cta-icon sx-nav-cta-icon--light" aria-hidden="true">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <path d="M3.5 2.5 L7 5 L3.5 7.5 Z" />
              </svg>
            </span>
            Launch app
          </Link>
          <button
            type="button"
            className={`sx-nav-burger ${open ? 'is-open' : ''}`}
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`sx-nav-mobile ${open ? 'is-open' : ''}`}>
        {NAV_ITEMS.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              to={item.href}
              className={isActive(item) ? 'is-active' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              className={isActive(item) ? 'is-active' : undefined}
              onClick={() => go(item.target)}
            >
              {item.label}
            </button>
          ),
        )}
        <Link to="/launch" className="sx-nav-mobile-launch" onClick={() => setOpen(false)}>
          Launch app
        </Link>
        <button type="button" onClick={() => go('contact')}>
          Contact
        </button>
      </div>
    </header>
  )
}
