import { ArrowUpRight, Globe } from 'lucide-react'
import { TEAM, initials } from '../../data/team.js'
import './ProjectCard.css'

/* The two brand colours in a project's `gradient` tint its painted sky. */
function tints(gradient = '') {
  const [c1 = '#4f6bd8', c2 = c1] = gradient.match(/#[0-9a-f]{6}/gi) || []
  return { '--c1': c1, '--c2': c2 }
}

/* Small deterministic variation so no two skies are identical. */
function seed(id = '') {
  let h = 0
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return {
    '--cloud-x': `${8 + (h % 30)}%`,
    '--cloud-y': `${40 + ((h >> 4) % 10)}%`,
    '--hill-x': `${-20 + ((h >> 8) % 30)}%`,
    '--drift': `${14 + ((h >> 12) % 10)}s`,
  }
}

function people(credit = '') {
  return credit
    .split(/&|,/)
    .map((n) => n.trim())
    .filter(Boolean)
    .map((name) => TEAM.find((m) => m.name === name) || { name, image: null })
}

function PlayStoreGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M4.2 2.6 13.6 12l-9.4 9.4c-.3-.2-.5-.6-.5-1.1V3.7c0-.5.2-.9.5-1.1z" fill="#00d7fe" />
      <path d="m16.7 8.9-3.1 3.1 3.1 3.1 3.7-2.1c.9-.5.9-1.6 0-2.1l-3.7-2z" fill="#ffce00" />
      <path d="M13.6 12 4.2 21.4c.3.3.9.3 1.4.1l11.1-6.4-3.1-3.1z" fill="#ff3a44" />
      <path d="M13.6 12 16.7 8.9 5.6 2.5c-.5-.3-1.1-.2-1.4.1L13.6 12z" fill="#00f076" />
    </svg>
  )
}

function GitHubGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.8-2.3 4.6-4.6 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"
      />
    </svg>
  )
}

function linksFor(project) {
  return [
    project.liveUrl && {
      key: 'web',
      label: `Open ${project.name} website`,
      href: project.liveUrl,
      icon: <Globe size={17} strokeWidth={1.75} aria-hidden="true" />,
    },
    project.playStoreUrl && {
      key: 'play',
      label: `${project.name} on Google Play`,
      href: project.playStoreUrl,
      icon: <PlayStoreGlyph />,
    },
    project.githubUrl && {
      key: 'github',
      label: `${project.name} on GitHub`,
      href: project.githubUrl,
      icon: <GitHubGlyph />,
    },
  ].filter(Boolean)
}

/**
 * A project as a small poster: a painted sky in the project's colours, the
 * name and status over it, and the people and places it lives along the foot.
 */
export default function ProjectCard({ project }) {
  const links = linksFor(project)
  const primary = links[0]
  const team = people(project.credit)

  return (
    <article
      className={`pc${primary ? ' pc--link' : ''}`}
      style={{ ...tints(project.gradient), ...seed(project.id) }}
    >
      <div className="pc-art" aria-hidden="true">
        <span className="pc-sky" />
        <span className="pc-stars" />
        <span className="pc-clouds" />
        <span className="pc-hill" />
        <span className="pc-grain" />
        <span className="pc-scrim" />
      </div>

      {primary ? (
        <a
          className="pc-cover"
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.name}`}
        />
      ) : null}

      {primary ? (
        <span className="pc-open" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2} />
        </span>
      ) : null}

      <span className={`pc-status pc-status--${project.status}`}>{project.statusLabel}</span>

      <div className="pc-body">
        <p className="pc-meta">{project.tagline}</p>
        <h3 className="pc-title">{project.name}</h3>

        <div className="pc-foot">
          <ul className="pc-people" aria-label={`Built by ${project.credit}`}>
            {team.map((m) => (
              <li key={m.name} title={m.name}>
                {m.image ? (
                  <img src={m.image} alt="" width={36} height={36} loading="lazy" />
                ) : (
                  <span>{initials(m.name)}</span>
                )}
              </li>
            ))}
          </ul>

          {links.length ? (
            <ul className="pc-links">
              {links.map((l) => (
                <li key={l.key}>
                  <a
                    className={`pc-link pc-link--${l.key}`}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={l.label}
                    title={l.label}
                  >
                    {l.icon}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  )
}
