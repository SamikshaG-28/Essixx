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
        dynamicRoutes: ['/launch', '/about', '/careers'],
        exclude: ['/checkout', '/payment/return', '/payment'],
        changefreq: {
          '/': 'weekly',
          '/about': 'monthly',
          '/careers': 'weekly',
          '/launch': 'monthly',
          '*': 'weekly',
        },
        priority: {
          '/': 1.0,
          '/about': 0.8,
          '/careers': 0.7,
          '/launch': 0.7,
          '*': 0.7,
        },
        generateRobotsTxt: true,
        robots: [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/checkout', '/payment/'],
          },
        ],
      }),
    ],
  }
})
