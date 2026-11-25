import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '../home/Reveal.jsx'
import { TEAM, initials } from '../../data/team.js'
import './Site.css'

/** Compact profile cards: a small round portrait, name and role. */
export default function TeamGrid() {
  return (
    <ul className="team">
      {TEAM.map((m, i) => {
        const body = (
          <>
            <span className="team-photo">
              {m.image ? (
                <img
                  src={m.image}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="team-initials" aria-hidden="true">
                  {initials(m.name)}
                </span>
              )}
            </span>
            <span className="team-meta">
              <span className="team-name">{m.name}</span>
              <span className="team-role">{m.role}</span>
            </span>
          </>
        )
        return (
          <Reveal as="li" key={m.name} delay={i * 0.06} className="team-card">
            {m.href ? (
              <Link to={m.href} className="team-link">
                {body}
                <ArrowUpRight className="team-go" size={18} aria-label="View profile" />
              </Link>
            ) : (
              <div className="team-link">{body}</div>
            )}
          </Reveal>
        )
      })}
    </ul>
  )
}
