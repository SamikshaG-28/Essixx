import './BenefitsSection.css'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4'

export default function BenefitsSection() {
  return (
    <section id="capabilities" className="bn-section">
      <div className="bn-wrap">
        <div className="bn-inner">
          <h2 className="bn-heading">Key Benefits</h2>

          <div className="bn-grid">
            <article className="bn-card bn-card--text bn-card--left">
              <div className="bn-blob bn-blob--left" aria-hidden="true" />
              <div className="bn-card-body">
                <h3>
                  Unified
                  <br />
                  infrastructure
                </h3>
                <p className="bn-body bn-body--mid">
                  All layers connected into one structured system — websites, apps,
                  and cloud backends that stay coherent from first commit to launch.
                </p>
              </div>
            </article>

            <article className="bn-card bn-card--video">
              <div className="bn-video-region">
                <video autoPlay loop muted playsInline preload="metadata">
                  <source src={VIDEO_SRC} type="video/mp4" />
                </video>
                <div className="bn-video-fade" aria-hidden="true" />
              </div>
              <div className="bn-video-caption">
                <h3>
                  Cross-market
                  <br />
                  intelligence
                </h3>
              </div>
            </article>

            <article className="bn-card bn-card--text bn-card--right">
              <div className="bn-blob bn-blob--right" aria-hidden="true" />
              <div className="bn-card-body">
                <h3>
                  Seamless
                  <br />
                  execution
                </h3>
                <p className="bn-body bn-body--bottom">
                  From insight to action — design, build, and ship in one environment
                  with clear progress every sprint and support after go-live.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
