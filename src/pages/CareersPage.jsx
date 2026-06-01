import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SynexNav from '../components/home/SynexNav.jsx'
import { Reveal } from '../components/home/Reveal.jsx'
import '../pages/HomePage.css'
import './CareersPage.css'

const DEPARTMENTS = ['All departments', 'Engineering', 'Design', 'Marketing', 'Operations']
const TYPES = ['All types', 'Full-time', 'Part-time', 'Contract', 'Remote']

const OPENINGS = [
  {
    id: 'fe-dev',
    title: 'Frontend Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Pune · Hybrid',
  },
  {
    id: 'mobile-dev',
    title: 'Mobile Developer — Gojira',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Pune · Remote',
  },
  {
    id: 'ui-designer',
    title: 'UI/UX Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Pune · Hybrid',
  },
  {
    id: 'pm',
    title: 'Project Manager',
    department: 'Operations',
    type: 'Full-time',
    location: 'Pune · On-site',
  },
  {
    id: 'marketing',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Pune · Hybrid',
  },
  {
    id: 'hrm-ops',
    title: 'HRM Platform Associate',
    department: 'Operations',
    type: 'Contract',
    location: 'Remote',
  },
]

function scrollToPositions() {
  document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function CareersPage() {
  const [department, setDepartment] = useState(DEPARTMENTS[0])
  const [type, setType] = useState(TYPES[0])

  const filtered = useMemo(() => {
    return OPENINGS.filter((job) => {
      const deptMatch = department === DEPARTMENTS[0] || job.department === department
      const typeMatch = type === TYPES[0] || job.type === type
      return deptMatch && typeMatch
    })
  }, [department, type])

  return (
    <div className="careers-page">
      <SynexNav />

      <div className="careers-hero-media" aria-hidden="true">
        <img
          src="/about-hero.png"
          alt=""
          className="careers-hero-people"
          draggable={false}
        />
        <div className="careers-hero-bottom-fade" />
      </div>

      <main className="careers-main">
        <section className="careers-hero">
          <Reveal className="careers-hero-copy">
            <p className="careers-eyebrow">Careers at Essixx</p>
            <h1>Join the team behind the future of work</h1>
            <p className="careers-lead">
              At Essixx, we are building the tools that help companies thrive — and we are
              looking for people who want to shape how teams connect, grow, and succeed.
            </p>

            <div className="careers-filters">
              <label className="careers-select-wrap">
                <span className="sr-only">Department</span>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  aria-label="Department"
                >
                  {DEPARTMENTS.map((item) => (
                    <option key={item} value={item}>
                      {item === DEPARTMENTS[0] ? 'Department' : item}
                    </option>
                  ))}
                </select>
              </label>

              <label className="careers-select-wrap">
                <span className="sr-only">Type</span>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  aria-label="Type"
                >
                  {TYPES.map((item) => (
                    <option key={item} value={item}>
                      {item === TYPES[0] ? 'Type' : item}
                    </option>
                  ))}
                </select>
              </label>

              <button type="button" className="careers-cta" onClick={scrollToPositions}>
                View open positions
              </button>
            </div>
          </Reveal>
        </section>

        <section id="open-positions" className="careers-positions">
          <Reveal>
            <div className="careers-positions-head">
              <h2>Open positions</h2>
              <p>
                {filtered.length} role{filtered.length === 1 ? '' : 's'} matching your filters
              </p>
            </div>
          </Reveal>

          <ul className="careers-jobs">
            {filtered.map((job, i) => (
              <motion.li
                key={job.id}
                className="careers-job"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="careers-job-main">
                  <h3>{job.title}</h3>
                  <p>{job.location}</p>
                </div>
                <div className="careers-job-meta">
                  <span>{job.department}</span>
                  <span>{job.type}</span>
                </div>
                <a
                  href={`mailto:careers@essixx.com?subject=${encodeURIComponent(`Application — ${job.title}`)}`}
                  className="careers-apply"
                >
                  Apply
                </a>
              </motion.li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="careers-empty">No roles match those filters right now. Try another combination.</p>
          )}
        </section>
      </main>
    </div>
  )
}
