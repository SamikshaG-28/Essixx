import './IntroSection.css'

const PROMPT_PARTS = [
  { text: 'Workshops, research and a ', bold: false },
  { text: 'sharp scope', bold: true },
  { text: ' — we map the ', bold: false },
  { text: 'problem before', bold: true },
  { text: ' a ', bold: false },
  { text: 'single line of code', bold: true },
  { text: '.', bold: false },
]

export default function IntroSection() {
  return (
    <section className="c1-section" aria-labelledby="c1-title">
      <div className="c1-container">
        <p className="c1-badge">Essixx studio</p>
        <h2 id="c1-title" className="c1-title">
          From concept to launch, with clarity at every step.
        </h2>
        <p className="c1-subtitle">
          We help startups and growing businesses ship modern websites, apps,
          <br />
          and digital products — fast, focused, and built to last.
        </p>

        <div className="c1-grid">
          <article className="c1-card c1-card-1">
            <div className="c1-prompt">
              {PROMPT_PARTS.map((part, i) =>
                part.bold ? (
                  <strong key={i} className="c1-blur-text">
                    {part.text}
                  </strong>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </div>

            <div className="c1-details-pill">
              <span className="c1-spark" aria-hidden="true">
                ✦
              </span>
              Add more details
            </div>

            <svg
              className="c1-cursor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M4 2L20 11L11 13L9 22L4 2Z"
                fill="#0f172a"
                stroke="#ffffff"
                strokeWidth="1"
              />
            </svg>

            <h3>Discover</h3>
          </article>

          <article className="c1-card c1-card-2">
            <div className="c1-api-visual">
              <img
                className="c1-network-img"
                src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/network.svg"
                alt=""
                width={400}
                height={180}
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3>Design</h3>
          </article>

          <article className="c1-card c1-card-3">
            <div className="c1-mesh" aria-hidden="true" />
            <img
              className="c1-folder"
              src="https://pub-f170a2592d2c4a1485466404c36807be.r2.dev/viktor/library%20icon.svg"
              alt=""
              width={170}
              height={170}
              loading="lazy"
              decoding="async"
            />
            <div className="c1-search">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" stroke="#64748b" strokeWidth="2" />
                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Search projects
            </div>
            <h3>Build</h3>
          </article>
        </div>
      </div>
    </section>
  )
}
