import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PRODUCT_PROJECTS } from '../data/projects.js'
import './LaunchAppPage.css'

const STATUS_CLASS = {
  free: 'is-launched',
  live: 'is-launched',
  testing: 'is-beta',
  development: 'is-dev',
}

function AppTile({ app, index }) {
  const href = app.liveUrl || app.playStoreUrl || app.githubUrl
  const isDisabled = !href

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
      <span className={`launch-tile-status ${STATUS_CLASS[app.status] || 'is-soon'}`}>
        {app.statusLabel}
      </span>
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
        <a className="launch-tile-btn" href={href} target="_blank" rel="noopener noreferrer">
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
          <h1>Open a product</h1>
          <p className="launch-subtitle">
            Built by Kartik Sabale &amp; Pratiksha Relekar — pick a project to visit.
          </p>
        </motion.div>

        <ul className="launch-grid">
          {PRODUCT_PROJECTS.map((app, index) => (
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
          Want a website? Contact us
        </motion.a>
      </main>
    </div>
  )
}
