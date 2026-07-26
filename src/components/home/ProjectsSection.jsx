import { Reveal } from './Reveal.jsx'
import { PRODUCT_PROJECTS, CLIENT_PROJECTS } from '../../data/projects.js'

function PlayStoreIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3.18 2.5c-.45.24-.68.66-.68 1.2v16.6c0 .54.23.96.68 1.2l10.2-9.5L3.18 2.5zm12.02 7.05L6.1 3.45l8.4 4.85.7 1.25zm1.05 1.55-1.35 1.35 1.35 1.35 4.55-2.55c.55-.3.55-1.05 0-1.35l-4.55-2.55-1.35 1.35 1.35 2.4zM6.1 20.55l8.4-5.75.7 1.25-9.1 4.5z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
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

function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal delay={delay} className="sx-proj-card">
      <div className="sx-proj-card-top">
        <span className="sx-proj-icon" style={{ background: project.gradient }} aria-hidden="true">
          {project.icon}
        </span>
        <span className={`sx-proj-status sx-proj-status--${project.status}`}>
          {project.statusLabel}
        </span>
      </div>

      <h3>{project.name}</h3>
      <p className="sx-proj-tagline">{project.tagline}</p>
      <p className="sx-proj-desc">{project.description}</p>
      <p className="sx-proj-credit">{project.credit}</p>

      <div className="sx-proj-actions">
        {project.liveUrl && (
          <a
            className="sx-proj-action"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit <ExternalIcon />
          </a>
        )}
        {project.githubUrl && (
          <a
            className="sx-proj-action sx-proj-action--ghost"
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
            className="sx-proj-action sx-proj-action--play"
            href={project.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PlayStoreIcon />
            Play Store
          </a>
        )}
      </div>
    </Reveal>
  )
}

export default function ProjectsSection() {
  return (
    <>
      <section id="projects" className="sx-proj">
        <div className="sx-proj-inner">
          <Reveal className="sx-proj-head">
            <span className="sx-badge sx-badge--outline">Projects</span>
            <h2>Products we built</h2>
            <p>
              Apps and tools developed by Kartik Sabale and Pratiksha Relekar — from free
              UI kits to live Play Store apps.
            </p>
          </Reveal>

          <div className="sx-proj-grid">
            {PRODUCT_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={0.06 + i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="sx-proj sx-proj--clients">
        <div className="sx-proj-inner">
          <Reveal className="sx-proj-head">
            <span className="sx-badge sx-badge--outline">Client work</span>
            <h2>Client projects</h2>
            <p>
              Websites and platforms built for clients by Kartik Sabale and Pratiksha
              Relekar.
            </p>
          </Reveal>

          <div className="sx-proj-grid sx-proj-grid--clients">
            {CLIENT_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={0.06 + i * 0.06} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
