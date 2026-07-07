import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const hostname = (env.VITE_SITE_URL || 'https://www.essixx.com').replace(/\/$/, '')

  return {
    plugins: [
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      Sitemap({
        hostname,
        changefreq: 'weekly',
        priority: 1,
        generateRobotsTxt: true,
        dynamicRoutes: ['/launch', '/about', '/careers'],
      }),
    ],
  }
})
