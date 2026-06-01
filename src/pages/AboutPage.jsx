import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SynexNav from '../components/home/SynexNav.jsx'
import OurTeamSection from '../components/home/OurTeamSection.jsx'
import { siteConfig } from '../seo/siteConfig.js'
import '../pages/HomePage.css'
import './AboutPage.css'

const INTRO_VIDEOS = [
  '/videos/intro/intro-1.mp4',
  '/videos/intro/intro-2.mp4',
  '/videos/intro/intro-3.mp4',
]

const VALUES = [
  { label: 'End-to-end delivery', emoji: '🚀' },
  { label: 'Modern product design', emoji: '✨' },
  { label: 'Ship faster', emoji: '⏳' },
  { label: 'Built for your stack', emoji: '🛠' },
]

const FOOTER_LINKS = [
  ['About Us', 'Pricing'],
  ['FAQ', 'Blog'],
  ['Terms & Conditions', 'Privacy Policy'],
]

function IntroVideo() {
  const videoRef = useRef(null)
  const [videoIndex, setVideoIndex] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.load()
    video.play().catch(() => {})
  }, [videoIndex])

  return (
    <div className="about-video-shell">
      <video
        ref={videoRef}
        key={INTRO_VIDEOS[videoIndex]}
        className="about-video"
        src={INTRO_VIDEOS[videoIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setVideoIndex((current) => (current + 1) % INTRO_VIDEOS.length)}
      />
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <SynexNav />

      <main>
        <section className="about-hero">
          <p className="about-hero-eyebrow">This is why we started building Essixx</p>
          <h1>We&apos;re here to help you shine</h1>

          <IntroVideo />

          <div className="about-intro-copy">
            <p>
              It&apos;s hard to build a great digital product alone. That&apos;s exactly why
              Essixx was born, to make the process easier, smarter, and way less stressful.
            </p>
            <p>
              We started Essixx with a simple idea: help people focus on their skills,
              experience, and dreams, not technical headaches. We trusted that by building
              the right tools, we could remove the stress and bring out the best in every
              product story.
            </p>
          </div>
        </section>

        <section className="about-values">
          <h2>Our value.</h2>
          <p className="about-values-lead">Less &ldquo;ugh&rdquo;, more &ldquo;yay!&rdquo;</p>

          <ul className="about-values-list">
            {VALUES.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <span aria-hidden="true">{item.emoji}</span>
              </li>
            ))}
          </ul>

          <p className="about-values-foot">Made for real growth 📈</p>
        </section>

        <OurTeamSection showReadMore={false} />

        <section className="about-closing">
          <p>
            We built Essixx to remove the stress from product delivery. It&apos;s not just a
            studio, it&apos;s a way to help people dream bigger and move forward faster.
          </p>
          <p>
            Behind every launch is a real story, a real team. That&apos;s why we created
            Essixx, to make sure those stories shine.
          </p>
          <p className="about-signature">— The Essixx team</p>
        </section>

        <section className="about-subscribe">
          <div className="about-subscribe-row">
            <form
              className="about-subscribe-form"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <span>Stay updated with us</span>
              <div className="about-subscribe-fields">
                <input type="email" name="email" placeholder="Email address" required />
                <button type="submit">Subscribe</button>
              </div>
            </form>

            <div className="about-subscribe-side">
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <Link to="/launch" className="about-store-btn">
                Launch Essixx app
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="about-footer">
        <div className="about-footer-links">
          {FOOTER_LINKS.map((column) => (
            <ul key={column[0]}>
              {column.map((link) => (
                <li key={link}>
                  <a href="/?scroll=contact">{link}</a>
                </li>
              ))}
            </ul>
          ))}

          <div className="about-footer-socials">
            <a href={siteConfig.social.linkedin} aria-label="LinkedIn">in</a>
            <a href={siteConfig.social.instagram} aria-label="Instagram">ig</a>
            <a href={siteConfig.social.twitter} aria-label="Twitter">x</a>
          </div>
        </div>

        <div className="about-footer-banner">
          <p>Fast, smart, easy.</p>
          <div className="about-footer-bottom">
            <Link to="/" className="about-footer-logo">essixx</Link>
            <span>Essixx © {new Date().getFullYear()}. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
