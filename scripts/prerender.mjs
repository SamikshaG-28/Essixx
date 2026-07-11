/**
 * Post-build prerender: renders each public route in headless Chrome and
 * writes the fully rendered HTML into dist/ so crawlers get complete
 * content + meta + JSON-LD without executing JavaScript.
 *
 * Usage: npm run build && node scripts/prerender.mjs
 */
import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { preview } from 'vite'
import puppeteer from 'puppeteer'

const ROUTES = ['/', '/about', '/careers', '/launch']
const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

/**
 * The static template tags in index.html and the React-rendered Seo tags
 * both end up in the prerendered head. Keep exactly one tag per key:
 * first <title> (React hoists its page title to the front) and the last
 * occurrence of every canonical/meta/hreflang (React's page-specific ones
 * render after the template ones). Identical JSON-LD blocks are deduped too.
 */
function dedupeHead(html) {
  const headEnd = html.indexOf('</head>')
  if (headEnd === -1) return html
  let head = html.slice(0, headEnd)
  const rest = html.slice(headEnd)

  const tagRe =
    /<title>[\s\S]*?<\/title>|<link\s[^>]*rel="(?:canonical|alternate)"[^>]*>|<meta\s[^>]*(?:name|property)="[^"]+"[^>]*>|<script type="application\/ld\+json">[\s\S]*?<\/script>/g

  const keyOf = (tag) => {
    if (tag.startsWith('<title>')) return 'title'
    if (tag.startsWith('<script')) return `jsonld:${tag}`
    if (/rel="canonical"/.test(tag)) return 'link:canonical'
    if (/rel="alternate"/.test(tag)) {
      const hreflang = tag.match(/hreflang="([^"]+)"/)?.[1] || ''
      return `link:alternate:${hreflang}`
    }
    const name = tag.match(/(?:name|property)="([^"]+)"/)?.[1] || ''
    // viewport/charset style tags appear once anyway; skip dedupe for empty keys
    return name ? `meta:${name}` : null
  }

  const matches = [...head.matchAll(tagRe)].map((m) => ({
    tag: m[0],
    index: m.index,
    key: keyOf(m[0]),
  }))

  const keep = new Map()
  for (const m of matches) {
    if (!m.key) continue
    if (m.key === 'title') {
      if (!keep.has('title')) keep.set('title', m.index)
    } else {
      keep.set(m.key, m.index) // last occurrence wins
    }
  }

  const toRemove = matches
    .filter((m) => m.key && keep.get(m.key) !== m.index)
    .sort((a, b) => b.index - a.index)

  for (const m of toRemove) {
    head = head.slice(0, m.index) + head.slice(m.index + m.tag.length)
  }

  return head + rest
}

async function main() {
  try {
    await access(join(DIST, 'index.html'))
  } catch {
    console.error('dist/index.html not found — run `npm run build` first.')
    process.exit(1)
  }

  const server = await preview({
    root: join(DIST, '..'),
    preview: { port: 4173, strictPort: false },
  })
  const origin = server.resolvedUrls.local[0].replace(/\/$/, '')
  console.log(`Preview server at ${origin}`)

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  })

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage()
      await page.setViewport({ width: 1366, height: 900 })
      // Reduced motion so reveal animations render in their final state
      await page.emulateMediaFeatures([
        { name: 'prefers-reduced-motion', value: 'reduce' },
      ])

      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle0', timeout: 60000 })
      // Give framer-motion reveals a moment to settle
      await new Promise((resolve) => setTimeout(resolve, 1200))

      let html = await page.content()
      if (!html.startsWith('<!doctype') && !html.startsWith('<!DOCTYPE')) {
        html = `<!doctype html>\n${html}`
      }
      html = dedupeHead(html)

      const outFile =
        route === '/' ? join(DIST, 'index.html') : join(DIST, route.slice(1), 'index.html')
      await mkdir(dirname(outFile), { recursive: true })
      await writeFile(outFile, html, 'utf8')
      console.log(`Prerendered ${route} -> ${outFile.replace(`${DIST}/`, 'dist/')}`)
      await page.close()
    }
  } finally {
    await browser.close()
    await server.close()
  }

  console.log('Prerender complete.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
