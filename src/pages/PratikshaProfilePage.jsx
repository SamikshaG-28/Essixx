import { ArrowRight, ArrowUpRight } from 'lucide-react'
import SiteNav from '../components/site/SiteNav.jsx'
import SiteFooter from '../components/site/SiteFooter.jsx'
import { HeroReveal, Reveal } from '../components/home/Reveal.jsx'
import { PRATIKSHA_PROFILE, PRATIKSHA_REPOS, LANG_COLORS } from '../data/pratikshaProfile.js'
import { PRODUCT_PROJECTS, CLIENT_PROJECTS } from '../data/projects.js'
import './Pages.css'

const FEATURED = PRATIKSHA_REPOS.filter((r) => r.featured)
const MORE_REPOS = PRATIKSHA_REPOS.filter((r) => !r.featured)
const ESSIXX_WORK = [...PRODUCT_PROJECTS, ...CLIENT_PROJECTS]

function Lang({ language }) {
  return (
    <span className="lang">
      <span
        className="lang-dot"
        style={{ background: LANG_COLORS[language] || 'var(--ink-3)' }}
        aria-hidden="true"
      />
      {language}
    </span>
  )
}

export default function PratikshaProfilePage() {
  const p = PRATIKSHA_PROFILE

  return (
    <div className="page">
      <SiteNav />

      <main>
        <section className="page-hero">
          <div className="wrap profile">
            <HeroReveal className="profile-photo">
              <img
                src={p.image}
                alt={`${p.name} — ${p.role} at Essixx`}
                width={768}
                height={1024}
                fetchPriority="high"
              />
            </HeroReveal>

            <div className="profile-copy">
              <HeroReveal>
                <p className="eyebrow">{p.title}</p>
              </HeroReveal>
              <HeroReveal delay={0.08}>
                <h1 className="display profile-name">{p.name}</h1>
              </HeroReveal>
              <HeroReveal delay={0.16}>
                <p className="lead">{p.bio}</p>
                <ul className="profile-focus" aria-label="Focus areas">
                  {p.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <dl className="profile-stats">
                  <div>
                    <dt>Public repos</dt>
                    <dd className="serif">{p.publicRepos}</dd>
                  </div>
                  <div>
                    <dt>Live demos</dt>
                    <dd className="serif">{FEATURED.length}</dd>
                  </div>
                  <div>
                    <dt>With Essixx</dt>
                    <dd className="serif">{ESSIXX_WORK.length}</dd>
                  </div>
                </dl>
                <div className="profile-actions">
                  <a className="btn btn--primary" href={p.github} target="_blank" rel="noopener noreferrer">
                    GitHub <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a className="btn btn--ghost" href={p.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </HeroReveal>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">Stack</p>
              <h2 className="h2">
                Skills from
                <br />
                <em>shipped work.</em>
              </h2>
            </Reveal>
            <Reveal className="skills">
              {p.skills.map((skill) => (
                <Lang key={skill} language={skill} />
              ))}
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">Live demos</p>
              <h2 className="h2">
                Featured
                <br />
                <em>work.</em>
              </h2>
            </Reveal>
            <ul className="cards">
              {FEATURED.map((repo, i) => (
                <Reveal as="li" key={repo.id} delay={i * 0.06} className="card">
                  <Lang language={repo.language} />
                  <h3 className="serif">{repo.name}</h3>
                  <p>{repo.description}</p>
                  <div className="card-links">
                    <a className="link" href={repo.liveUrl} target="_blank" rel="noopener noreferrer">
                      Open demo <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                    <a className="link" href={repo.githubUrl} target="_blank" rel="noopener noreferrer">
                      Code <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">Repositories</p>
              <h2 className="h2">
                More public
                <br />
                <em>projects.</em>
              </h2>
              <p>Selected repos across web, Flutter, PHP and Python.</p>
            </Reveal>
            <ul className="repo-list">
              {MORE_REPOS.map((repo) => (
                <li key={repo.id}>
                  <a className="repo" href={repo.githubUrl} target="_blank" rel="noopener noreferrer">
                    <span className="repo-name">{repo.name}</span>
                    <span className="repo-desc">{repo.description}</span>
                    <Lang language={repo.language} />
                    <ArrowUpRight className="repo-go" size={18} strokeWidth={1.5} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section--sunken">
          <div className="wrap quote">
            <Reveal>
              <p className="eyebrow">Next step</p>
              <blockquote className="serif">Need UI design or a website? Work with Pratiksha through Essixx.</blockquote>
              <a className="btn btn--primary" href={`mailto:${p.email}`}>
                {p.email} <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter cta={false} />
    </div>
  )
}
