import { Reveal } from './Reveal.jsx'
import { Link } from 'react-router-dom'

const TEAM = [
  {
    name: 'Kartik Sabale',
    role: 'CEO, Founder & Chief Architect',
    image: '/team/kartik-sabale.webp',
  },
  {
    name: 'Tejas Khairnar',
    role: 'Chief Technology Officer (CTO)',
    image: '/team/tejas-khairnar.webp',
  },
  {
    name: 'Shilpa Shivamre',
    role: 'Chief Financial Officer (CFO)',
    image: '/team/shilpa-shivamre.webp',
  },
  {
    name: 'Ashish Shivmare',
    role: 'Head of Client Relations',
    image: '/team/ashish-shivmare.webp',
  },
  {
    name: 'Pratiksha Relekar',
    role: 'Head of Design',
    image: '/team/pratiksha-relekar.webp',
  },
]

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
              <h2>Our team</h2>
            </div>
            <p className="sx-team-desc">
              We craft solutions that amplify key characteristics, achieving a harmonious
              balance of function and intent. Through careful analysis and collaborative
              engagement, our spaces transcend the conventional.
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
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={0.06 + i * 0.08} className="sx-team-card">
              <div className="sx-team-photo">
                <img
                  src={member.image}
                  alt={`${member.name} — ${member.role} at Essixx`}
                  width={768}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
