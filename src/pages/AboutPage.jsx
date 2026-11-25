import { ArrowRight } from 'lucide-react'
import SiteNav from '../components/site/SiteNav.jsx'
import SiteFooter from '../components/site/SiteFooter.jsx'
import TeamGrid from '../components/site/TeamGrid.jsx'
import { HeroReveal, Reveal } from '../components/home/Reveal.jsx'
import { PROJECT_MAILTO } from '../components/site/links.js'
import './Pages.css'

const VALUES = [
  {
    title: 'End-to-end delivery',
    body: 'One team from the first workshop to the last deploy — nothing lost in hand-offs.',
  },
  {
    title: 'Design that stays quiet',
    body: 'Interfaces that get out of the way, so your content and your customers come first.',
  },
  {
    title: 'Ship, then refine',
    body: 'Working software early and often. You see real progress every week, not a big reveal.',
  },
  {
    title: 'Built for your stack',
    body: 'We pick tools that fit your team and budget — and that someone else can maintain later.',
  },
]

export default function AboutPage() {
  return (
    <div className="page">
      <SiteNav />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <HeroReveal>
              <p className="eyebrow">About Essixx</p>
            </HeroReveal>
            <HeroReveal delay={0.08}>
              <h1 className="display page-title">
                Small studio,
                <br />
                <em>careful</em> work.
              </h1>
            </HeroReveal>
          </div>
        </section>

        <HeroReveal delay={0.18} className="wrap">
          <figure className="about-figure">
            <img
              src="/about-hero.webp"
              alt="The Essixx team at work, designing and building digital products"
              width={1536}
              height={1024}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </HeroReveal>

        <section className="section">
          <div className="wrap split">
            <Reveal>
              <p className="eyebrow">Our story</p>
            </Reveal>
            <Reveal delay={0.06} className="prose">
              <p className="prose-lead serif">
                It&rsquo;s hard to build a great digital product alone. Essixx exists to
                make that process easier, calmer and a lot less stressful.
              </p>
              <p>
                We started as freelancers with a simple idea: let people focus on their
                craft and their customers, not on technical headaches. Today we design and
                build websites, apps and brand systems for founders, small businesses and
                agencies across India.
              </p>
              <p>
                You work directly with the people doing the work — no account managers, no
                agency markup. Websites start from ₹19,999.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">What we value</p>
              <h2 className="h2">
                Less noise,
                <br />
                <em>more signal.</em>
              </h2>
            </Reveal>

            <ol className="values">
              {VALUES.map((v, i) => (
                <Reveal as="li" key={v.title} delay={i * 0.05} className="value">
                  <span className="index">0{i + 1}</span>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <Reveal className="section-head">
              <p className="eyebrow">The team</p>
              <h2 className="h2">
                Three people,
                <br />
                <em>one standard.</em>
              </h2>
            </Reveal>
            <TeamGrid />
          </div>
        </section>

        <section className="section section--sunken">
          <div className="wrap quote">
            <Reveal>
              <blockquote className="serif">
                &ldquo;Behind every launch is a real story. We built Essixx to make sure
                those stories shine.&rdquo;
              </blockquote>
              <p className="quote-by">Kartik Sabale, Pratiksha Relekar &amp; Kajal Sabale</p>
              <a className="btn btn--primary" href={PROJECT_MAILTO}>
                Work with us <ArrowRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
