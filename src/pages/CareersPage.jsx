import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import SiteNav from '../components/site/SiteNav.jsx'
import SiteFooter from '../components/site/SiteFooter.jsx'
import { HeroReveal, Reveal } from '../components/home/Reveal.jsx'
import { OPENINGS } from '../data/openings.js'
import './Pages.css'

const DEPARTMENTS = ['All departments', 'Engineering', 'Design', 'Marketing', 'Operations']
const TYPES = ['All types', 'Full-time', 'Part-time', 'Contract', 'Remote']

const PERKS = [
  { title: 'Real products', body: 'Ship work that goes live — on the web and on the Play Store.' },
  { title: 'Small team', body: 'Your decisions matter and your name is on what you build.' },
  { title: 'Flexible setup', body: 'Hybrid and remote roles based around Pune.' },
]

function applyHref(job) {
  return `mailto:careers@essixx.com?subject=${encodeURIComponent(`Application — ${job.title}`)}`
}

export default function CareersPage() {
  const [department, setDepartment] = useState(DEPARTMENTS[0])
  const [type, setType] = useState(TYPES[0])

  const filtered = useMemo(
    () =>
      OPENINGS.filter((job) => {
        const deptMatch = department === DEPARTMENTS[0] || job.department === department
        const typeMatch = type === TYPES[0] || job.type === type
        return deptMatch && typeMatch
      }),
    [department, type],
  )

  return (
    <div className="page">
      <SiteNav />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <HeroReveal>
              <p className="eyebrow">Careers</p>
            </HeroReveal>
            <HeroReveal delay={0.08}>
              <h1 className="display page-title">
                Do the best work
                <br />
                <em>of your career.</em>
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.16}>
              <p className="lead page-lead">
                We&rsquo;re a small studio building websites, apps and products for real
                businesses. If you care about craft and like shipping, we&rsquo;d love to
                hear from you.
              </p>
            </HeroReveal>
          </div>
        </section>

        <section className="section section--tight">
          <div className="wrap">
            <ul className="perks">
              {PERKS.map((p, i) => (
                <Reveal as="li" key={p.title} delay={i * 0.05}>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <section id="open-positions" className="section">
          <div className="wrap">
            <Reveal className="jobs-head">
              <div>
                <p className="eyebrow">Open positions</p>
                <h2 className="h2 jobs-title">
                  {filtered.length} open role{filtered.length === 1 ? '' : 's'}
                </h2>
              </div>
              <div className="jobs-filters">
                <label className="field">
                  <span className="sr-only">Department</span>
                  <select
                    className="select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    {DEPARTMENTS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span className="sr-only">Type</span>
                  <select
                    className="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    {TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </Reveal>

            <ul className="jobs">
              {filtered.map((job) => (
                <li key={job.id}>
                  <a className="job" href={applyHref(job)}>
                    <span className="job-title serif">{job.title}</span>
                    <span className="job-meta">{job.department}</span>
                    <span className="job-meta">{job.type}</span>
                    <span className="job-meta">{job.location}</span>
                    <span className="job-apply">
                      Apply <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {filtered.length === 0 && (
              <p className="jobs-empty">
                No roles match those filters right now. Try another combination — or write
                to <a className="link" href="mailto:careers@essixx.com">careers@essixx.com</a>{' '}
                anyway.
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
