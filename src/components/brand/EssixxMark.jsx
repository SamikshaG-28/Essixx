import './EssixxMark.css'

/**
 * The Essixx "E" monogram.
 *
 * Geometry is the brand master — four rounded bars on a 262x280 glyph box.
 * Everything else (tile padding, extrusion depth, animation) is derived from
 * these numbers so the mark stays identical everywhere it appears.
 */
const BARS = [
  { x: 170, y: 160, w: 72, h: 280, part: 'stem' },
  { x: 256, y: 160, w: 176, h: 72, part: 'arm' },
  { x: 256, y: 264, w: 176, h: 72, part: 'arm' },
  { x: 256, y: 368, w: 176, h: 72, part: 'arm' },
]
const RX = 22

// Tight box around the glyph — used for inline (nav / footer) marks.
const GLYPH_BOX = '170 160 262 280'
// Full square canvas — used for the tile lockup and exported icons.
const TILE_BOX = '0 0 620 620'
// Optical centring inside the tile: glyph centre is (301, 300), canvas is (310, 310).
const TILE_SHIFT = 'translate(9 10)'

const DEPTH_LAYERS = 14

function Bars({ className }) {
  return (
    <g className={className}>
      {BARS.map((b, i) => (
        <rect
          key={i}
          className={`ex-bar ex-bar--${b.part}`}
          style={{ '--ex-i': i }}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={RX}
        />
      ))}
    </g>
  )
}

/**
 * @param {number}  size      rendered px (square)
 * @param {boolean} extrude   render the 3D depth stack behind the face
 * @param {boolean} tile      draw the mark inside a filled rounded-square tile
 * @param {boolean} animate   play the assemble-in animation on mount
 * @param {boolean} interactive  extrude on hover/focus of the nearest .ex-mark-host
 */
export default function EssixxMark({
  size = 32,
  extrude = false,
  tile = false,
  animate = false,
  interactive = false,
  title,
  className = '',
  ...rest
}) {
  const classes = [
    'ex-mark',
    tile ? 'ex-mark--tile' : 'ex-mark--inline',
    extrude || interactive ? 'ex-mark--extrude' : '',
    interactive ? 'ex-mark--interactive' : '',
    animate ? 'ex-mark--animate' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const face = (
    <>
      {(extrude || interactive) &&
        Array.from({ length: DEPTH_LAYERS }, (_, i) => (
          <g
            key={i}
            className="ex-layer"
            style={{ '--ex-d': DEPTH_LAYERS - i, '--ex-n': i }}
            aria-hidden="true"
          >
            <Bars className="ex-depth" />
          </g>
        ))}
      <Bars className="ex-face" />
    </>
  )

  return (
    <svg
      className={classes}
      width={size}
      height={size}
      viewBox={tile ? TILE_BOX : GLYPH_BOX}
      role={title ? 'img' : 'presentation'}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {tile ? (
        <>
          <rect className="ex-tile" x="0" y="0" width="620" height="620" rx="140" />
          <g transform={TILE_SHIFT}>{face}</g>
        </>
      ) : (
        face
      )}
    </svg>
  )
}

/** Mark + wordmark lockup. */
export function EssixxLogo({
  size = 26,
  tile = false,
  interactive = true,
  animate = false,
  showR = true,
  className = '',
}) {
  return (
    <span className={`ex-lockup ex-mark-host ${className}`}>
      <EssixxMark
        size={size}
        tile={tile}
        interactive={interactive}
        animate={animate}
        title="Essixx"
      />
      <span className="ex-wordmark">
        Essixx
        {showR ? <sup className="ex-r">®</sup> : null}
      </span>
    </span>
  )
}
