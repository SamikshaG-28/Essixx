import { motion } from 'framer-motion'
import { PRODUCT_PROJECTS, CLIENT_PROJECTS } from '../../data/projects.js'
import './ProjectsSection.css'

const EASE = [0.22, 1, 0.36, 1]

function FadeUp({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function PlayStoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3.18 2.5c-.45.24-.68.66-.68 1.2v16.6c0 .54.23.96.68 1.2l10.2-9.5L3.18 2.5zm12.02 7.05L6.1 3.45l8.4 4.85.7 1.25zm1.05 1.55-1.35 1.35 1.35 1.35 4.55-2.55c.55-.3.55-1.05 0-1.35l-4.55-2.55-1.35 1.35 1.35 2.4zM6.1 20.55l8.4-5.75.7 1.25-9.1 4.5z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 5h5v5M19 5l-9 9M10 6H6a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1v-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectCard({ project, delay = 0, variant = 'product' }) {
  return (
    <FadeUp delay={delay} className={`pw-card pw-card--${variant}`}>
      <div className="pw-card-glow" style={{ background: project.gradient }} aria-hidden="true" />

      <div className="pw-card-top">
        <span className="pw-icon" style={{ background: project.gradient }} aria-hidden="true">
          {project.icon}
        </span>
        <span className={`pw-status pw-status--${project.status}`}>{project.statusLabel}</span>
      </div>

      <h3>{project.name}</h3>
      <p className="pw-tagline">{project.tagline}</p>
      <p className="pw-desc">{project.description}</p>
      <p className="pw-credit">{project.credit}</p>

      <div className="pw-actions">
        {project.liveUrl && (
          <a
            className="pw-btn pw-btn--primary"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit <ExternalIcon />
          </a>
        )}
        {project.githubUrl && (
          <a
            className="pw-btn pw-btn--ghost"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
            {project.status === 'free' ? 'Free download' : 'GitHub'}
          </a>
        )}
        {project.playStoreUrl && (
          <a
            className="pw-btn pw-btn--play"
            href={project.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayStoreIcon />
            Play Store
          </a>
        )}
      </div>
    </FadeUp>
  )
}

function SectionHeader({ badge, title, titleAccent, description, delay = 0 }) {
  return (
    <FadeUp delay={delay} className="pw-head">
      <span className="pw-pill">
        <span className="pw-pill-dot" />
        {badge}
      </span>
      <h2>
        {title}
        {titleAccent ? (
          <>
            <br />
            <span className="pw-title-accent">{titleAccent}</span>
          </>
        ) : null}
      </h2>
      <p>{description}</p>
    </FadeUp>
  )
}

export default function ProjectsSection() {
  return (
    <>
      <section id="projects" className="pw-section">
        <div className="pw-inner">
          <SectionHeader
            badge="Projects"
            title="Products we built"
            titleAccent="from kit to Play Store."
            description="Apps and tools developed by Kartik Sabale and Pratiksha Relekar — from free UI kits to live Play Store apps."
          />

          <div className="pw-grid pw-grid--products">
            {PRODUCT_PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={0.06 + i * 0.06}
                variant="product"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="pw-section pw-section--clients">
        <div className="pw-inner">
          <SectionHeader
            badge="Client work"
            title="Client projects"
            titleAccent="shipped for real businesses."
            description="Websites and platforms built for clients by Kartik Sabale and Pratiksha Relekar."
            delay={0.05}
          />

          <div className="pw-grid pw-grid--clients">
            {CLIENT_PROJECTS.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                delay={0.08 + i * 0.07}
                variant="client"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
