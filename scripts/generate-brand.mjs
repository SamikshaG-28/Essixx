/**
 * Renders every raster brand asset from the SVG masters in public/brand/.
 *
 * Icons are pure geometry, so sharp rasterises them directly. The OG card
 * needs real type, so it is screenshotted from HTML in headless Chrome.
 *
 * Usage: node scripts/generate-brand.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import puppeteer from 'puppeteer'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(ROOT, 'public')

const INK = '#0B0E15'
const PAPER = '#FFFFFF'

const BARS = `
    <rect x="170" y="160" width="72" height="280" rx="22"/>
    <rect x="256" y="160" width="176" height="72" rx="22"/>
    <rect x="256" y="264" width="176" height="72" rx="22"/>
    <rect x="256" y="368" width="176" height="72" rx="22"/>`

/**
 * @param {object} o
 * @param {number} o.radius  tile corner radius in the 620 canvas
 * @param {number} o.scale   glyph scale about the canvas centre (1 = master size)
 */
function tileSvg({ radius = 140, scale = 1, bg = INK, fg = PAPER } = {}) {
  // Glyph centre is (301, 300); canvas centre is (310, 310).
  const cx = 310
  const cy = 310
  const transform = `translate(${cx} ${cy}) scale(${scale}) translate(${-301} ${-300})`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 620" width="620" height="620">
  <rect width="620" height="620" rx="${radius}" fill="${bg}"/>
  <g transform="${transform}" fill="${fg}">${BARS}
  </g>
</svg>`
}

const ICONS = [
  { file: 'favicon-16x16.png', size: 16, svg: tileSvg({ radius: 0, scale: 1.02 }) },
  { file: 'favicon-32x32.png', size: 32, svg: tileSvg({ radius: 0, scale: 1.02 }) },
  { file: 'apple-touch-icon.png', size: 180, svg: tileSvg({ radius: 0, scale: 0.9 }) },
  { file: 'brand/icon-192.png', size: 192, svg: tileSvg({ radius: 44, scale: 0.95 }) },
  { file: 'brand/icon-512.png', size: 512, svg: tileSvg({ radius: 116, scale: 0.95 }) },
  // Maskable icons get cropped to a circle — keep the glyph inside the 80% safe zone.
  { file: 'brand/icon-maskable-512.png', size: 512, svg: tileSvg({ radius: 0, scale: 0.62 }) },
  { file: 'essixx-logo.png', size: 512, svg: tileSvg({ radius: 116, scale: 0.95 }) },
]

/** Minimal .ico container — the format allows raw PNG payloads. */
function buildIco(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0) // reserved
  header.writeUInt16LE(1, 2) // type: icon
  header.writeUInt16LE(pngs.length, 4)

  let offset = 6 + pngs.length * 16
  const entries = []
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16)
    e.writeUInt8(size >= 256 ? 0 : size, 0) // width
    e.writeUInt8(size >= 256 ? 0 : size, 1) // height
    e.writeUInt8(0, 2) // palette
    e.writeUInt8(0, 3) // reserved
    e.writeUInt16LE(1, 4) // colour planes
    e.writeUInt16LE(32, 6) // bits per pixel
    e.writeUInt32LE(data.length, 8)
    e.writeUInt32LE(offset, 12)
    offset += data.length
    entries.push(e)
  }

  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)])
}

async function renderIcons() {
  for (const { file, size, svg } of ICONS) {
    const out = join(PUBLIC, file)
    await mkdir(dirname(out), { recursive: true })
    await sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toFile(out)
    console.log(`icon  ${file} (${size}px)`)
  }

  const icoSizes = [16, 32, 48]
  const pngs = []
  for (const size of icoSizes) {
    const data = await sharp(Buffer.from(tileSvg({ radius: 0, scale: 1.02 })))
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer()
    pngs.push({ size, data })
  }
  await writeFile(join(PUBLIC, 'favicon.ico'), buildIco(pngs))
  console.log(`icon  favicon.ico (${icoSizes.join(', ')}px)`)
}

const OG_HTML = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Instrument+Sans:wght@400;500&display=swap" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; background: ${INK};
    font-family: 'Instrument Sans', system-ui, sans-serif;
    color: #fff; display: flex; flex-direction: column;
    justify-content: space-between; padding: 72px 80px;
    position: relative; overflow: hidden;
  }
  .glow {
    position: absolute; width: 780px; height: 780px; border-radius: 50%;
    right: -220px; top: -300px;
    background: radial-gradient(circle, rgba(255,255,255,.14) 0%, rgba(255,255,255,0) 68%);
  }
  .row { display: flex; align-items: center; gap: 20px; position: relative; }
  .mark { width: 56px; height: 60px; }
  .word { font-family: 'Bricolage Grotesque', sans-serif; font-size: 44px; font-weight: 700; letter-spacing: -.035em; }
  .word sup { font-size: 17px; font-weight: 500; opacity: .65; vertical-align: super; margin-left: 3px; }
  h1 {
    font-family: 'Bricolage Grotesque', sans-serif;
    font-size: 82px; font-weight: 600; line-height: 1.02;
    letter-spacing: -.038em; max-width: 940px; position: relative;
  }
  h1 em { font-style: normal; color: rgba(255,255,255,.42); }
  .meta {
    display: flex; align-items: center; gap: 14px; position: relative;
    font-size: 24px; color: rgba(255,255,255,.62); letter-spacing: -.01em;
  }
  .dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(255,255,255,.34); }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="row">
    <svg class="mark" viewBox="170 160 262 280" xmlns="http://www.w3.org/2000/svg">
      <g fill="#fff">${BARS}</g>
    </svg>
    <span class="word">Essixx<sup>®</sup></span>
  </div>
  <h1>Premium creative<br>and engineering,<br><em>on demand.</em></h1>
  <div class="meta">
    <span>Web · Apps · Brand</span><span class="dot"></span>
    <span>Pune, India</span><span class="dot"></span>
    <span>essixx.com</span>
  </div>
</body>
</html>`

async function renderOg() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.setContent(OG_HTML, { waitUntil: 'networkidle0' })
    await page.evaluate(() => document.fonts.ready)
    const buf = await page.screenshot({ type: 'png' })
    await writeFile(join(PUBLIC, 'og-image.png'), buf)
    console.log('og    og-image.png (1200x630)')
  } finally {
    await browser.close()
  }
}

await renderIcons()
await renderOg()
console.log('Brand assets generated.')
