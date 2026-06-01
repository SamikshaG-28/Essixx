import { motion } from 'framer-motion'
import { Reveal } from './Reveal.jsx'

const METRICS = [
  { label: 'Web', value: 72 },
  { label: 'Mobile', value: 58 },
  { label: 'Cloud', value: 84 },
]

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function IntroSection() {
  return (
    <section className="sx-intro">
      <div className="sx-intro-inner">
        <Reveal className="sx-intro-copy">
          <span className="sx-badge sx-badge--outline">Essixx studio</span>
          <h2>
            From concept to launch,
            <br />
            with clarity at every step.
          </h2>
          <p>
            We help startups and growing businesses ship modern websites, apps,
            and digital products — fast, focused, and built to last.
          </p>
          <button type="button" className="sx-intro-cta" onClick={scrollToContact}>
            Start a project
          </button>
        </Reveal>

        <Reveal delay={0.1} className="sx-intro-panel-wrap">
          <motion.div
            className="sx-intro-panel"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="sx-intro-panel-top">
              <span className="sx-intro-panel-label">Delivery snapshot</span>
              <span className="sx-intro-panel-period">Live overview</span>
            </div>

            <div className="sx-intro-highlight">
              <strong>+24%</strong>
              <span>Faster time to market</span>
            </div>

            <div className="sx-intro-bars" aria-hidden="true">
              {METRICS.map((item) => (
                <div key={item.label} className="sx-intro-bar-col">
                  <div className="sx-intro-bar-track">
                    <span style={{ height: `${item.value}%` }} />
                  </div>
                  <small>{item.label}</small>
                </div>
              ))}
            </div>

            <div className="sx-intro-panel-foot">
              <div>
                <strong>48</strong>
                <span>Active milestones</span>
              </div>
              <div>
                <strong>99.2%</strong>
                <span>On-time delivery</span>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
