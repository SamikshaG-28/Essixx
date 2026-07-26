import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SynexNav from '../components/home/SynexNav.jsx'
import { Reveal } from '../components/home/Reveal.jsx'
import {
  PRATIKSHA_PROFILE,
  PRATIKSHA_REPOS,
  LANG_COLORS,
} from '../data/pratikshaProfile.js'
import { PRODUCT_PROJECTS, CLIENT_PROJECTS } from '../data/projects.js'
import './PratikshaProfilePage.css'

function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.5 8.5H3.5V21h3V8.5zM5 3a1.75 1.75 0 100 3.5A1.75 1.75 0 005 3zm15.5 7.25c0-2.2-1.85-3.75-4.25-3.75-1.35 0-2.45.55-3.15 1.4V7.05h-3v13.95h3v-7.3c0-1.85 1.05-2.85 2.45-2.85 1.35 0 1.95.9 1.95 2.85V21h3v-8.25z"
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

function LangDot({ language }) {
  const color = LANG_COLORS[language] || '#86868b'
  return (
    <span className="pr-lang">
      <span className="pr-lang-dot" style={{ background: color }} aria-hidden="true" />
      {language}
    </span>
  )
}

const FEATURED = PRATIKSHA_REPOS.filter((r) => r.featured)
const MORE_REPOS = PRATIKSHA_REPOS.filter((r) => !r.featured)
const ESSIxx_WORK = [...PRODUCT_PROJECTS, ...CLIENT_PROJECTS]

export default function PratikshaProfilePage() {
  const p = PRATIKSHA_PROFILE

  return (
    <div className="pr-page">
      <SynexNav />

      <main>
        <section className="pr-hero">
          <div className="pr-hero-bg" aria-hidden="true">
            <div className="pr-hero-grid" />
            <div className="pr-hero-glow" />
          </div>

          <div className="pr-hero-inner">
            <Reveal className="pr-hero-photo-wrap">
              <motion.div
                className="pr-hero-photo-frame"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.role} at Essixx`}
                  width={768}
                  height={1024}
                  className="pr-hero-photo"
                  fetchPriority="high"
                />
                <span className="pr-hero-badge">Available for work</span>
              </motion.div>
            </Reveal>

            <Reveal delay={0.1} className="pr-hero-copy">
              <Link to="/" className="pr-back">
                <span aria-hidden="true">←</span> Essixx
              </Link>

              <div className="pr-identity">
                <span className="pr-eyebrow">Essixx freelancer</span>
                <h1>{p.name}</h1>
                <p className="pr-handle">@{p.handle}</p>
                <p className="pr-role">
                  {p.title}
                  <span className="pr-role-sep" aria-hidden="true">
                    ·
                  </span>
                  {p.role}
                </p>
              </div>

              <p className="pr-bio">{p.bio}</p>

              <ul className="pr-focus" aria-label="Focus areas">
                {p.focus.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="pr-stats" role="list">
                <div role="listitem">
                  <strong>{p.publicRepos}</strong>
                  <span>Public repos</span>
                </div>
                <div role="listitem">
                  <strong>{FEATURED.length}</strong>
                  <span>Live demos</span>
                </div>
                <div role="listitem">
                  <strong>{ESSIxx_WORK.length}</strong>
                  <span>With Essixx</span>
                </div>
              </div>

              <div className="pr-actions">
                <a
                  className="pr-btn pr-btn--primary"
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                  View GitHub
                </a>
                <a
                  className="pr-btn"
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <Link className="pr-btn pr-btn--soft" to="/?scroll=contact">
                  Hire via Essixx
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="pr-section pr-section--skills">
          <div className="pr-section-inner">
            <Reveal className="pr-section-head">
              <span className="pr-kicker">Stack</span>
              <h2>Skills from real shipped work</h2>
            </Reveal>
            <Reveal delay={0.08} className="pr-skills">
              {p.skills.map((skill) => (
                <span key={skill} className="pr-skill">
                  <span
                    className="pr-skill-dot"
                    style={{ background: LANG_COLORS[skill.split('/')[0]] || '#82c341' }}
                    aria-hidden="true"
                  />
                  {skill}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="pr-section pr-section--featured">
          <div className="pr-section-inner">
            <Reveal className="pr-section-head pr-section-head--row">
              <div>
                <span className="pr-kicker">Live demos</span>
                <h2>Featured work</h2>
                <p>
                  Public projects with a live preview — from her{' '}
                  <a href={p.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </Reveal>

            <div className="pr-featured-grid">
              {FEATURED.map((repo, i) => (
                <Reveal key={repo.id} delay={0.06 + i * 0.08} className="pr-featured-card">
                  <div className="pr-featured-top">
                    <LangDot language={repo.language} />
                    <span className="pr-live-pill">Live</span>
                  </div>
                  <h3>{repo.name}</h3>
                  <p>{repo.description}</p>
                  <div className="pr-featured-actions">
                    <a
                      className="pr-btn pr-btn--primary pr-btn--sm"
                      href={repo.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open demo <ExternalIcon />
                    </a>
                    <a
                      className="pr-btn pr-btn--sm"
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GitHubIcon size={15} />
                      Code
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pr-section pr-section--repos">
          <div className="pr-section-inner">
            <Reveal className="pr-section-head">
              <span className="pr-kicker">Repositories</span>
              <h2>More public projects</h2>
              <p>Selected repos across web, Flutter, PHP, and Python.</p>
            </Reveal>

            <div className="pr-repo-grid">
              {MORE_REPOS.map((repo, i) => (
                <Reveal key={repo.id} delay={0.03 + i * 0.03} className="pr-repo-card">
                  <div className="pr-repo-top">
                    <h3>
                      <a href={repo.githubUrl} target="_blank" rel="noopener noreferrer">
                        {repo.name}
                      </a>
                    </h3>
                  </div>
                  <p>{repo.description}</p>
                  <div className="pr-repo-foot">
                    <LangDot language={repo.language} />
                    <a
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pr-repo-link"
                    >
                      <GitHubIcon size={14} />
                      View
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pr-section pr-section--essixx">
          <div className="pr-section-inner">
            <Reveal className="pr-section-head">
              <span className="pr-kicker">Collaboration</span>
              <h2>Built with Essixx</h2>
              <p>Products and client sites developed with Kartik Sabale.</p>
            </Reveal>

            <div className="pr-essixx-grid">
              {ESSIxx_WORK.map((project, i) => {
                const href = project.liveUrl || project.playStoreUrl || project.githubUrl
                return (
                  <Reveal key={project.id} delay={0.04 + i * 0.04} className="pr-essixx-card">
                    <span
                      className="pr-essixx-icon"
                      style={{ background: project.gradient }}
                      aria-hidden="true"
                    >
                      {project.icon}
                    </span>
                    <div className="pr-essixx-body">
                      <div className="pr-essixx-meta">
                        <h3>{project.name}</h3>
                        <span>{project.statusLabel}</span>
                      </div>
                      <p>{project.tagline}</p>
                      {href && (
                        <a href={href} target="_blank" rel="noopener noreferrer">
                          Open project <ExternalIcon />
                        </a>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="pr-cta">
          <div className="pr-cta-inner">
            <Reveal>
              <span className="pr-kicker pr-kicker--on-dark">Next step</span>
              <h2>Work with Pratiksha</h2>
              <p>
                Need UI design or a website? Contact Essixx — freelancers, development from
                ₹19,999.
              </p>
              <div className="pr-actions pr-actions--center">
                <Link className="pr-btn pr-btn--accent" to="/?scroll=contact">
                  Contact Essixx
                </Link>
                <a className="pr-btn pr-btn--ghost" href={`mailto:${p.email}`}>
                  {p.email}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  )
}
