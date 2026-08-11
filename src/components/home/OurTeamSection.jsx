import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import './OurTeamSection.css'

const EASE = [0.22, 1, 0.36, 1]

const TEAM = [
  {
    name: 'Kartik Sabale',
    role: 'Product & Engineering',
    image: '/team/kartik-sabale.webp',
    href: null,
    accent: 'linear-gradient(145deg, #82c341 0%, #2ba7ff 100%)',
  },
  {
    name: 'Pratiksha Relekar',
    role: 'Design',
    image: '/team/pratiksha-relekar.webp',
    href: '/pratiksha',
    accent: 'linear-gradient(145deg, #ca45ff 0%, #a068ff 100%)',
  },
  {
    name: 'Kajal Sabale',
    role: 'Operations',
    image: null,
    href: null,
    accent: 'linear-gradient(145deg, #fe881b 0%, #f59e0b 100%)',
  },
]

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
    <section id="studio" className="bt-section">
      <div className="bt-inner">
        <div className="bt-header">
          <FadeUp className="bt-header-copy">
            <span className="bt-pill">
              <span className="bt-pill-dot" />
              Studio
            </span>
            <div className="bt-title-row">
              <span className="bt-num" aria-hidden="true">
                04
              </span>
              <h2>
                Built by
                <br />
                <span className="bt-title-accent">people who ship.</span>
              </h2>
            </div>
            <p className="bt-desc">
              We are freelancers — Kartik Sabale, Pratiksha Relekar, and Kajal Sabale.
              Want a website? Contact us. Development starts from ₹19,999 only.
            </p>
          </FadeUp>

          {showReadMore && (
            <FadeUp delay={0.1} className="bt-header-action">
              <Link to="/about" className="bt-more">
                Read more
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </FadeUp>
          )}
        </div>

        <div className="bt-grid">
          {TEAM.map((member, i) => {
            const body = (
              <>
                <div
                  className={`bt-photo${member.image ? '' : ' bt-photo--placeholder'}`}
                  style={{ '--bt-accent': member.accent }}
                >
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
                    <span className="bt-initials" aria-hidden="true">
                      {initials(member.name)}
                    </span>
                  )}
                  <span className="bt-photo-glow" aria-hidden="true" />
                </div>
                <div className="bt-meta">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  {member.href ? <span className="bt-view">View profile</span> : null}
                </div>
              </>
            )

            return (
              <FadeUp key={member.name} delay={0.08 + i * 0.08} className="bt-card">
                {member.href ? (
                  <Link to={member.href} className="bt-card-link">
                    {body}
                  </Link>
                ) : (
                  <div className="bt-card-static">{body}</div>
                )}
              </FadeUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}
