import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './LaunchAppPage.css'

const STATUS_STYLES = {
  launched: { label: 'Launched', className: 'is-launched' },
  beta: { label: 'In Beta', className: 'is-beta' },
  'early-access': { label: 'Early Access', className: 'is-early' },
  development: { label: 'In Development', className: 'is-dev' },
  'coming-soon': { label: 'Coming Soon', className: 'is-soon' },
}

const APPS = [
  {
    id: 'gojira',
    name: 'Gojira',
    tagline: 'Mobile delivery suite',
    status: 'launched',
    href: '#',
    icon: 'GJ',
    gradient: 'linear-gradient(145deg, #82c341 0%, #4a8f23 100%)',
  },
  {
    id: 'hrm',
    name: 'Essixx HRM',
    tagline: 'People & payroll ops',
    status: 'beta',
    href: '#',
    icon: 'HR',
    gradient: 'linear-gradient(145deg, #0091bf 0%, #005f99 100%)',
  },
  {
    id: 'genious-bots',
    name: 'Genious Bots',
    tagline: 'AI automation workflows',
    status: 'early-access',
    href: '#',
    icon: 'GB',
    gradient: 'linear-gradient(145deg, #7c5cff 0%, #4f2fd6 100%)',
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    tagline: 'Campaigns & growth stack',
    status: 'launched',
    href: '#',
    icon: 'DM',
    gradient: 'linear-gradient(145deg, #f97316 0%, #c2410c 100%)',
  },
]

function AppTile({ app, index }) {
  const status = STATUS_STYLES[app.status]
  const isDisabled = !app.href

  const content = (
    <>
      <motion.span
        className="launch-tile-icon"
        style={{ background: app.gradient }}
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <span>{app.icon}</span>
      </motion.span>
      <span className="launch-tile-name">{app.name}</span>
      <span className={`launch-tile-status ${status.className}`}>{status.label}</span>
      <span className="launch-tile-tagline">{app.tagline}</span>
    </>
  )

  return (
    <motion.li
      className={`launch-tile${isDisabled ? ' is-disabled' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      {isDisabled ? (
        <div className="launch-tile-btn" aria-disabled="true">
          {content}
        </div>
      ) : (
        <a
          className="launch-tile-btn"
          href={app.href}
          target={app.href.startsWith('http') ? '_blank' : undefined}
          rel={app.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      )}
    </motion.li>
  )
}

export default function LaunchAppPage() {
  useEffect(() => {
    const theme = document.querySelector('meta[name="theme-color"]')
    const previous = theme?.getAttribute('content')
    theme?.setAttribute('content', '#000000')

    return () => {
      if (theme && previous) theme.setAttribute('content', previous)
    }
  }, [])

  return (
    <div className="launch-page">
      <header className="launch-header">
        <Link to="/" className="launch-logo">
          essixx
        </Link>
        <Link to="/" className="launch-back">
          Back to site
        </Link>
      </header>

      <main className="launch-main">
        <motion.div
          className="launch-intro"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="launch-eyebrow">Essixx projects</p>
          <h1>Who&apos;s launching?</h1>
          <p className="launch-subtitle">Pick a project to open your workspace.</p>
        </motion.div>

        <ul className="launch-grid">
          {APPS.map((app, index) => (
            <AppTile key={app.id} app={app} index={index} />
          ))}
        </ul>

        <motion.a
          href="/?scroll=contact"
          className="launch-manage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          Request access to beta products
        </motion.a>
      </main>
    </div>
  )
}
