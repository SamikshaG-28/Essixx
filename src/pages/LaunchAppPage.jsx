import SiteNav from '../components/site/SiteNav.jsx'
import SiteFooter from '../components/site/SiteFooter.jsx'
import { HeroReveal, Reveal } from '../components/home/Reveal.jsx'
import ProjectCard from '../components/site/ProjectCard.jsx'
import { PRODUCT_PROJECTS } from '../data/projects.js'
import './Pages.css'

export default function LaunchAppPage() {
  return (
    <div className="page">
      <SiteNav />

      <main>
        <section className="page-hero">
          <div className="wrap">
            <HeroReveal>
              <p className="eyebrow">Products</p>
            </HeroReveal>
            <HeroReveal delay={0.08}>
              <h1 className="display page-title">
                Made <em>in-house.</em>
              </h1>
            </HeroReveal>
            <HeroReveal delay={0.16}>
              <p className="lead page-lead">
                Products designed and built by Kartik Sabale &amp; Pratiksha Relekar. Pick
                one to open.
              </p>
            </HeroReveal>
          </div>
        </section>

        <section className="section section--tight">
          <div className="wrap">
            <ul className="pc-grid products-grid">
              {PRODUCT_PROJECTS.map((app, i) => (
                <Reveal as="li" key={app.id} delay={i * 0.06}>
                  <ProjectCard project={app} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
