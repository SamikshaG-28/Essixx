import { useState } from 'react'
import { Reveal } from './Reveal.jsx'
import { BUILDS } from '../../data/downloads.js'
import './ScreensSection.css'

/**
 * What Essy actually looks like.
 *
 * Every image here is a photograph of the running editor at 2x, not a
 * rendering of what it might look like — the app's own components, its own
 * bundled typefaces, and a real Hinglish transcript. A caption tool whose
 * screenshots were mocked up in Figma would be advertising a product that
 * doesn't exist yet.
 *
 * Shown as a tabbed single frame rather than a grid of three: these are dense
 * interface shots, and three of them side by side would be three things too
 * small to read.
 */
const SHOTS = [
  {
    id: 'editor',
    tab: 'The editor',
    title: 'Transcript, picture and style in one window',
    blurb:
      'Words land on the timeline with their own timing. Click one to fix it, drag it to retime it — the caption on the picture follows immediately.',
    src: '/essy/editor',
    alt: 'The Essy editor: a Hinglish transcript on the left, the video with a stacked caption in the centre, the style gallery on the right, and a word-level timeline underneath.',
  },
  {
    id: 'styles',
    tab: '105 styles',
    title: 'Every caption style, drawn with real text',
    blurb:
      'Browse all 105 in a grid and pick by eye. Each preview is rendered by the same code that draws the caption on the video, in the typeface it exports with.',
    src: '/essy/styles-gallery',
    alt: 'Essy’s caption style gallery: a grid of 105 caption styles, each previewing the same sample line in a different typeface, colour and layout.',
  },
  {
    id: 'controls',
    tab: 'Fine control',
    title: 'Colour, motion and placement, per line',
    blurb:
      'Start from a style, then change the gradient, the entry animation or where the box sits — for the whole video, or for one line that needs to land differently.',
    src: '/essy/style-controls',
    alt: 'The Essy editor with the style rail and inspector open, showing gradient swatches and entry-animation options.',
  },
]

export default function ScreensSection() {
  // Opens on the gallery, not the editor: the hero already shows the editor,
  // and repeating it here would waste the one screenshot slot above the fold.
  const [active, setActive] = useState('styles')
  const shot = SHOTS.find((s) => s.id === active) ?? SHOTS[0]
  const mac = BUILDS.find((b) => b.os === 'mac')

  return (
    <section id="screens" className="sc-section">
      <div className="sc-inner">
        <Reveal>
          <p className="sc-eyebrow">Inside Essy</p>
          <h2 className="sc-title">
            A real editor, not a web form with an upload button.
          </h2>
          <p className="sc-lead">
            Your video never leaves the machine. Transcription, face tracking and
            rendering all happen locally — which is why there is no queue, no
            upload bar, and no per-minute bill.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="sc-tabs" role="tablist" aria-label="Essy screenshots">
            {SHOTS.map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={s.id === active}
                aria-controls={`sc-panel-${s.id}`}
                className={`sc-tab${s.id === active ? ' is-active' : ''}`}
                onClick={() => setActive(s.id)}
              >
                {s.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          {/* A window chrome around the shot, so a dark screenshot on a dark
              section still reads as an application rather than as a hole. */}
          <figure
            className="sc-frame"
            id={`sc-panel-${shot.id}`}
            role="tabpanel"
            aria-label={shot.tab}
          >
            <div className="sc-chrome" aria-hidden="true">
              <span className="sc-dot" />
              <span className="sc-dot" />
              <span className="sc-dot" />
              <span className="sc-chrome-title">Essy</span>
            </div>
            <picture>
              <source srcSet={`${shot.src}.webp`} type="image/webp" />
              <img
                src={`${shot.src}.png`}
                alt={shot.alt}
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="sc-caption">
              <strong>{shot.title}</strong>
              <span>{shot.blurb}</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="sc-foot">
            <a className="sc-foot-btn" href={mac.href} download>
              {mac.label}
            </a>
            <span className="sc-foot-note">{mac.note}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
