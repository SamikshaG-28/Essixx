import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const KEY = 'essixx-theme'

function systemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function currentTheme() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme || systemTheme()
}

/**
 * Light / dark switch.
 *
 * The choice is written to <html data-theme> and remembered per browser; the
 * inline script in index.html applies it before first paint so a dark-mode
 * visitor never sees a flash of paper.
 */
export default function ThemeToggle({ className = '' }) {
  // Client-rendered (createRoot), so the DOM can be read on first render.
  const [theme, setTheme] = useState(currentTheme)

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* private mode — the switch still works for this visit */
    }
    setTheme(next)
  }

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <Sun size={16} strokeWidth={1.75} className="theme-toggle-sun" aria-hidden="true" />
      <Moon size={16} strokeWidth={1.75} className="theme-toggle-moon" aria-hidden="true" />
    </button>
  )
}
