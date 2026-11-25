/**
 * The Essy builds this site serves.
 *
 * One source of truth, because the download appears in three places — the
 * hero, the pricing table and the dashboard — and three hard-coded paths is
 * three chances for one of them to point at a file that has been replaced.
 *
 * The macOS build is committed under `public/downloads/`, so it is served by
 * the same host as the site and needs no release infrastructure. Windows is
 * built by CI (`.github/workflows/windows-setup.yml` in the app repo) and is
 * not committed anywhere yet, so its URL comes from the environment: set
 * `VITE_WINDOWS_DOWNLOAD_URL` and the button becomes live without a code
 * change. Until then it says so rather than 404ing, which is the one thing a
 * download button must never do.
 */

export const ESSY_VERSION = '0.1.0'

const WINDOWS_URL = import.meta.env.VITE_WINDOWS_DOWNLOAD_URL || ''

export const MAC_BUILD = {
  os: 'mac',
  label: 'Download for macOS',
  /** Served from this origin, so no cross-origin download prompt. */
  href: `/downloads/Essy_${ESSY_VERSION}_aarch64.dmg`,
  /** What the file actually is, so nobody downloads the wrong architecture. */
  note: 'Apple silicon · 8.1 MB · .dmg',
  available: true,
}

export const WINDOWS_BUILD = {
  os: 'windows',
  label: 'Download for Windows',
  href: WINDOWS_URL,
  note: WINDOWS_URL ? `64-bit · .exe installer` : 'Coming soon',
  available: Boolean(WINDOWS_URL),
}

export const BUILDS = [MAC_BUILD, WINDOWS_BUILD]
