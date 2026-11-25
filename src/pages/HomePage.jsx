import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import SiteNav from '../components/site/SiteNav.jsx'
import SiteFooter from '../components/site/SiteFooter.jsx'
import { PROJECT_MAILTO } from '../components/site/links.js'
import { HeroReveal, Reveal } from '../components/home/Reveal.jsx'
import { PRODUCT_PROJECTS, CLIENT_PROJECTS } from '../data/projects.js'
import { FAQS } from '../data/faqs.js'
import TeamGrid from '../components/site/TeamGrid.jsx'
import ProjectCard from '../components/site/ProjectCard.jsx'
import './HomePage.css'

const SERVICES = [
  {
    title: 'Web design',
    body: 'Calm, considered interfaces with a clear hierarchy — designed in the browser, tuned for every screen.',
    tags: ['UI / UX', 'Design systems', 'Prototypes'],
  },
  {
    title: 'Web development',
    body: 'Fast, SEO-ready websites and web apps on modern stacks, built to be easy to change after launch.',
    tags: ['React', 'Next.js', 'CMS'],
  },
  {
    title: 'App development',
    body: 'Android and iOS apps from first sketch to store listing, with the backend they need to run.',
    tags: ['React Native', 'Flutter', 'Firebase'],
  },
  {
    title: 'Brand & identity',
    body: 'Marks, type and colour that hold together from a favicon to a storefront.',
    tags: ['Logo', 'Iconography', 'Guidelines'],
  },
]

const PROCESS = [
  { title: 'Discover', body: 'Workshops, research and a sharp scope — the problem is mapped before a line of code.' },
  { title: 'Design', body: 'Wireframes become a clickable prototype you can review, question and refine.' },
  { title: 'Build', body: 'Weekly progress you can open in a browser, tested as it goes, never a big reveal.' },
  { title: 'Launch', body: 'Deploy, measure and hand over — with support after go-live when you need it.' },
]

const STACK = [
  'React',
  'Next.js',
  'React Native',
  'Flutter',
  'Firebase',
  'Supabase',
  'Stripe',
  'Razorpay',
  'Cashfree',
  'OpenAI',
  'Claude',
  'Figma',
]

const PLANS = [
  {
    name: 'Website',
    price: '19,999',
    was: '1,70,000',
    note: 'One project, freelancer rates. Everything a business site needs.',
    features: [
      { text: 'Responsive business website', on: true },
      { text: 'SEO-friendly pages', on: true },
      { text: 'Contact & enquiry flows', on: true },
      { text: 'Custom web app features', on: false },
      { text: 'Mobile app (iOS / Android)', on: false },
    ],
  },
  {
    name: 'Website + Product',
    price: '49,999',
    was: '2,50,000',
    note: 'For startups that need more than a brochure site.',
    featured: true,
    features: [
      { text: 'Responsive business website', on: true },
      { text: 'SEO-friendly pages', on: true },
      { text: 'Contact & enquiry flows', on: true },
      { text: 'Custom web app features', on: true },
      { text: 'Mobile app (iOS / Android)', on: true },
    ],
  },
]

const STATS = [
  { value: '₹19,999', label: 'Websites from' },
  { value: '2–4 wk', label: 'Typical launch' },
  { value: `${PRODUCT_PROJECTS.length + CLIENT_PROJECTS.length}`, label: 'Products shipped' },
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const CELL = 56

/**
 * Flat square grid behind the hero. The cell under the pointer fills with a
 * light ink tint and fades out over ~0.8s, leaving a short trail. Drawn on a
 * canvas that is aligned to the CSS grid lines; idle when nothing is fading,
 * and inert on touch screens.
 */
function useHeroGrid() {
  const ref = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const host = ref.current
    const canvas = canvasRef.current
    if (!host || !canvas || !window.matchMedia?.('(hover: hover)').matches) return
    const ctx = canvas.getContext('2d')
    const cells = new Map()
    const FADE = 800
    let frame = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = host.clientWidth
      h = host.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const now = performance.now()
      const ink = getComputedStyle(host).getPropertyValue('--ink').trim() || '#1d1d1f'
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = ink
      for (const [key, t] of cells) {
        const age = (now - t) / FADE
        if (age >= 1) {
          cells.delete(key)
          continue
        }
        const [c, r] = key.split(':').map(Number)
        ctx.globalAlpha = 0.07 * (1 - age)
        ctx.fillRect(c * CELL + 1, r * CELL + 1, CELL - 1, CELL - 1)
      }
      ctx.globalAlpha = 1
      frame = cells.size ? requestAnimationFrame(draw) : 0
    }

    const onMove = (e) => {
      const r = host.getBoundingClientRect()
      const c = Math.floor((e.clientX - r.left) / CELL)
      const row = Math.floor((e.clientY - r.top) / CELL)
      cells.delete(`${c}:${row}`)
      cells.set(`${c}:${row}`, performance.now())
      if (!frame) frame = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)
    host.addEventListener('pointermove', onMove)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      host.removeEventListener('pointermove', onMove)
    }
  }, [])

  return { ref, canvasRef }
}

function Hero() {
  const { ref, canvasRef } = useHeroGrid()

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-grid" />
        <canvas className="hero-cells" ref={canvasRef} />
      </div>
      <div className="wrap hero-inner">
        <HeroReveal>
          <p className="hero-badge">
            <span className="status-dot" aria-hidden="true" />
            Booking projects · Pune, India
          </p>
        </HeroReveal>

        <HeroReveal delay={0.08}>
          <h1 className="display hero-title">
            Websites &amp; apps,
            <br />
            <em>beautifully built.</em>
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.16}>
          <p className="lead hero-lead">
            Essixx is a small studio of designers and engineers crafting websites, apps
            and brands for founders and growing businesses.
          </p>
        </HeroReveal>

        <HeroReveal delay={0.24} className="hero-actions">
          <a className="btn btn--accent" href={PROJECT_MAILTO}>
            Start a project <ArrowRight size={16} aria-hidden="true" />
          </a>
          <button type="button" className="btn btn--ghost" onClick={() => scrollToId('work')}>
            See our work
          </button>
        </HeroReveal>

        <HeroReveal delay={0.32} className="hero-stats-wrap">
          <dl className="hero-stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
        </HeroReveal>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <div className="stack" aria-label="Technologies we build with">
      <div className="stack-track">
        {[...STACK, ...STACK].map((name, i) => (
          <span key={`${name}-${i}`} aria-hidden={i >= STACK.length || undefined}>
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">What we do</p>
          <h2 className="h2">
            Four crafts.
            <br />
            <em>One small team.</em>
          </h2>
          <p>
            You work directly with the people designing and building your product — no
            account managers, no hand-offs, no agency markup.
          </p>
        </Reveal>

        <ul className="bento">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="bento-card">
              <span className="bento-num grad">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <ul className="service-tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Selected work</p>
          <h2 className="h2">
            Shipped,
            <br />
            <em>not just designed.</em>
          </h2>
          <p>
            Our own products — from a free UI kit to live Play Store apps — and sites
            shipped for clients.
          </p>
        </Reveal>

        <div className="work-group">
          <h3 className="work-label">Our products</h3>
          <ul className="pc-grid">
            {PRODUCT_PROJECTS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
        </div>

        <div id="clients" className="work-group">
          <h3 className="work-label">Client work</h3>
          <ul className="pc-grid">
            {CLIENT_PROJECTS.map((p, i) => (
              <Reveal as="li" key={p.id} delay={i * 0.06}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="section section--sunken">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">How we work</p>
          <h2 className="h2">
            Clarity
            <br />
            <em>at every step.</em>
          </h2>
          <p>
            A simple, visible process. You always know what&rsquo;s being built, what&rsquo;s
            next, and when it ships.
          </p>
        </Reveal>

        <ol className="process">
          {PROCESS.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.06} className="process-step">
                <span className="process-num grad">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Pricing</p>
          <h2 className="h2">
            Honest prices.
            <br />
            <em>Clear scope.</em>
          </h2>
          <p>
            Freelancer rates without the agency overhead. Larger builds are quoted after
            a fifteen-minute chat.
          </p>
        </Reveal>

        <div className="plans">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <article className={`plan${plan.featured ? ' plan--featured' : ''}`}>
                <header className="plan-head">
                  <h3>{plan.name}</h3>
                  {plan.featured ? <span className="plan-badge">Best value</span> : null}
                </header>
                <p className="plan-price">
                  <span className="plan-amount">₹{plan.price}</span>
                  <s>₹{plan.was}</s>
                </p>
                <p className="plan-note">{plan.note}</p>
                <ul className="plan-features">
                  {plan.features.map((f) => (
                    <li key={f.text} className={f.on ? undefined : 'is-off'}>
                      {f.on ? (
                        <Check size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Minus size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                      <span>
                        {f.text}
                        {f.on ? null : <span className="sr-only"> (not included)</span>}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  className={`btn ${plan.featured ? 'btn--accent' : 'btn--ghost'} plan-cta`}
                  href={PROJECT_MAILTO}
                >
                  Get started <ArrowRight size={16} aria-hidden="true" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
      {/* keep old #hire deep links working */}
      <span id="hire" aria-hidden="true" />
    </section>
  )
}

function Studio() {
  return (
    <section id="studio" className="section">
      <div className="wrap">
        <Reveal className="section-head">
          <p className="eyebrow">Studio</p>
          <h2 className="h2">
            The people
            <br />
            <em>behind Essixx.</em>
          </h2>
          <p>
            Three freelancers who care about the details.{' '}
            <Link to="/about" className="link">
              More about us <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </p>
        </Reveal>

        <TeamGrid />
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq" className="section">
      <div className="wrap faq-wrap">
        <Reveal className="section-head section-head--left faq-head">
          <p className="eyebrow">FAQ</p>
          <h2 className="h2">
            Questions?
            <br />
            <em>Answers.</em>
          </h2>
        </Reveal>

        <div className="faq">
          {FAQS.map((f, i) => (
            <Reveal key={f.question} delay={i * 0.03}>
              <details className="faq-item" open={i === 0}>
                <summary>
                  <span>{f.question}</span>
                  <Plus className="faq-icon" size={20} strokeWidth={1.5} aria-hidden="true" />
                </summary>
                <p>{f.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const id = new URLSearchParams(location.search).get('scroll')
    if (!id) return
    const timer = window.setTimeout(() => scrollToId(id), 120)
    return () => window.clearTimeout(timer)
  }, [location.search])

  return (
    <div className="page home">
      <SiteNav />
      <main>
        <Hero />
        <Stack />
        <Services />
        <Work />
        <Process />
        <Pricing />
        <Studio />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  )
}
