import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import EssixxMark from '../brand/EssixxMark.jsx'
import { NavAuthLinks } from '../AccountControls.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { PROJECT_MAILTO } from './links.js'
import './Site.css'

const LINKS = [
  { label: 'Work', to: '/?scroll=work', section: 'work' },
  { label: 'Services', to: '/?scroll=services', section: 'services' },
  { label: 'Pricing', to: '/?scroll=pricing', section: 'pricing' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
]

export function Logo() {
  return (
    <Link to="/" className="logo ex-mark-host" aria-label="Essixx home">
      <EssixxMark size={18} interactive />
      <span>Essixx</span>
    </Link>
  )
}

export default function SiteNav() {
  const location = useLocation()
  // The sheet is open for one route only, so any navigation closes it.
  const routeKey = location.pathname + location.search
  const [openAt, setOpenAt] = useState(null)
  const open = openAt === routeKey
  const setOpen = (next) => {
    const value = typeof next === 'function' ? next(open) : next
    setOpenAt(value ? routeKey : null)
  }
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // On the home page a section link scrolls in place rather than routing.
  const onSectionClick = (e, section) => {
    setOpen(false)
    if (!section || location.pathname !== '/') return
    const el = document.getElementById(section)
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // On the home page, light up the link for the section in view.
  const [section, setSection] = useState(null)
  const onHome = location.pathname === '/'

  useEffect(() => {
    if (!onHome || typeof IntersectionObserver === 'undefined') return
    const ids = LINKS.map((l) => l.section).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setSection(e.target.id)
          else setSection((cur) => (cur === e.target.id ? null : cur))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [onHome])

  const isActive = (link) =>
    link.section ? onHome && section === link.section : location.pathname === link.to

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap">
        <div className="nav-bar">
          <Logo />

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={isActive(link) ? 'is-active' : undefined}
                aria-current={isActive(link) ? 'true' : undefined}
                onClick={(e) => onSectionClick(e, link.section)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggle />
            <span className="nav-auth">
              <NavAuthLinks linkClass="nav-text-link" />
            </span>
            <a className="btn btn--primary btn--sm nav-cta" href={PROJECT_MAILTO}>
              Start a project
            </a>
            <button
              type="button"
              className="nav-burger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-sheet"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div id="nav-sheet" className="nav-sheet" aria-hidden={!open}>
        <nav className="wrap nav-sheet-links" aria-label="Mobile">
          {LINKS.map((link, i) => (
            <Link
              key={link.label}
              to={link.to}
              tabIndex={open ? 0 : -1}
              style={{ '--i': i }}
              onClick={(e) => onSectionClick(e, link.section)}
            >
              <span className="index">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="wrap nav-sheet-foot">
          <span className="nav-auth nav-auth--sheet">
            <NavAuthLinks linkClass="nav-text-link" onNavigate={() => setOpen(false)} />
          </span>
          <a className="btn btn--primary" href={PROJECT_MAILTO} tabIndex={open ? 0 : -1}>
            Start a project <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  )
}
