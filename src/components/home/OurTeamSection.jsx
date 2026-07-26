import { Reveal } from './Reveal.jsx'
import { Link } from 'react-router-dom'

const TEAM = [
  {
    name: 'Kartik Sabale',
    role: 'Product & Engineering',
    image: '/team/kartik-sabale.webp',
    href: null,
  },
  {
    name: 'Pratiksha Relekar',
    role: 'Design',
    image: '/team/pratiksha-relekar.webp',
    href: '/pratiksha',
  },
  {
    name: 'Kajal Sabale',
    role: 'Operations',
    image: null,
    href: null,
  },
]

function initials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function OurTeamSection({ showReadMore = true }) {
  return (
    <section id="studio" className="sx-team">
      <div className="sx-team-inner">
        <div className="sx-team-header">
          <Reveal className="sx-team-header-copy">
            <div className="sx-team-title-row">
              <span className="sx-team-num" aria-hidden="true">
                04
              </span>
              <h2>Built by</h2>
            </div>
            <p className="sx-team-desc">
              We are freelancers — Kartik Sabale, Pratiksha Relekar, and Kajal Sabale.
              Want a website? Contact us. Development starts from ₹19,999 only.
            </p>
          </Reveal>

          {showReadMore && (
            <Reveal delay={0.08} className="sx-team-header-action">
              <Link to="/about" className="sx-team-more">
                Read more
              </Link>
            </Reveal>
          )}
        </div>

        <div className="sx-team-grid">
          {TEAM.map((member, i) => {
            const body = (
              <>
                <div className={`sx-team-photo${member.image ? '' : ' sx-team-photo--placeholder'}`}>
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      width={768}
                      height={1024}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  ) : (
                    <span className="sx-team-initials" aria-hidden="true">
                      {initials(member.name)}
                    </span>
                  )}
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </>
            )

            return (
              <Reveal key={member.name} delay={0.06 + i * 0.08} className="sx-team-card">
                {member.href ? (
                  <Link to={member.href} className="sx-team-card-link">
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
