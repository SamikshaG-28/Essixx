/**
 * One-off image optimizer: writes .webp versions of the heavy PNGs
 * referenced in the UI (originals are kept for og/social fallbacks).
 *
 * Usage: node scripts/optimize-images.mjs
 */
import { stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const TARGETS = [
  'left.png',
  'right.png',
  'about-hero.png',
  'footer-rocks.png',
  'careers/people.png',
  'team/kartik-sabale.png',
  'team/pratiksha-relekar.png',
]

const kb = (bytes) => `${Math.round(bytes / 1024)}K`

for (const rel of TARGETS) {
  const src = join(PUBLIC, rel)
  const out = src.replace(/\.png$/, '.webp')
  try {
    const before = (await stat(src)).size
    await sharp(src).webp({ quality: 82 }).toFile(out)
    const after = (await stat(out)).size
    console.log(`${rel}: ${kb(before)} -> ${kb(after)} (webp)`)
  } catch (err) {
    console.error(`Failed ${rel}:`, err.message)
  }
}
