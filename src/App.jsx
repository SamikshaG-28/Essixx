import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Seo from './components/Seo.jsx'
import HomePage from './pages/HomePage.jsx'
import { FAQS } from './data/faqs.js'
import { OPENINGS } from './data/openings.js'
import {
  siteConfig,
  buildPageJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildJobPostingJsonLd,
  buildMarketingOffersJsonLd,
  absoluteUrl,
} from './seo/siteConfig.js'

// Route-level code splitting: the homepage stays in the main bundle,
// everything else (including Firebase on checkout pages) loads on demand.
const LaunchAppPage = lazy(() => import('./pages/LaunchAppPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const CareersPage = lazy(() => import('./pages/CareersPage.jsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const PaymentReturnPage = lazy(() => import('./pages/PaymentReturnPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

// Legacy HashRouter URLs (e.g. /#/checkout?orderId=X from old UrbanCart links)
// are rewritten to real path URLs before the router mounts.
if (typeof window !== 'undefined' && window.location.hash.startsWith('#/')) {
  const raw = window.location.hash.slice(1)
  const [hashPath, hashQuery = ''] = raw.split('?')
  const search = window.location.search.replace(/^\?/, '')
  const combined = [search, hashQuery].filter(Boolean).join('&')
  window.history.replaceState(null, '', hashPath + (combined ? `?${combined}` : ''))
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
        <Route
          path="/"
          element={
            <>
              <Seo
                path="/"
                jsonLd={[
                  buildPageJsonLd({
                    path: '/',
                    title: siteConfig.title,
                    description: siteConfig.description,
                  }),
                  buildFaqJsonLd(FAQS),
                  buildMarketingOffersJsonLd(),
                ]}
              />
              <a href="/?scroll=home" className="skip-link">
                Skip to main content
              </a>
              <HomePage />
            </>
          }
        />
        <Route
          path="/launch"
          element={
            <>
              <Seo
                title="Launch Essixx Projects — Gojira, HRM, Genious Bots & Digital Marketing"
                description="Explore Essixx projects including Gojira, Essixx HRM, Genious Bots, and Digital Marketing solutions."
                path="/launch"
                keywords={[
                  ...siteConfig.keywords,
                  'Essixx projects',
                  'Gojira',
                  'Essixx HRM',
                  'Genious Bots',
                  'Digital Marketing',
                ]}
                ogImage={absoluteUrl('/essixx-logo.png')}
                ogImageAlt="Essixx projects launch page preview"
                jsonLd={[
                  buildPageJsonLd({
                    path: '/launch',
                    title: 'Launch Essixx Projects',
                    description:
                      'Open and explore Essixx products and project workspaces from a single launch page.',
                  }),
                  buildBreadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Launch', path: '/launch' },
                  ]),
                ]}
              />
              <LaunchAppPage />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Seo
                title="About Essixx — Our Story, Mission & Team"
                description="Learn about Essixx, our mission, values, and the team building modern digital products for startups and growing businesses."
                path="/about"
                keywords={[
                  ...siteConfig.keywords,
                  'About Essixx',
                  'Essixx team',
                  'digital product studio Pune',
                ]}
                jsonLd={[
                  buildPageJsonLd({
                    path: '/about',
                    title: 'About Essixx — Our Story, Mission & Team',
                    description:
                      'Meet the Essixx team and discover the mission behind our modern digital delivery approach.',
                    type: 'AboutPage',
                  }),
                  buildBreadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'About', path: '/about' },
                  ]),
                ]}
              />
              <AboutPage />
            </>
          }
        />
        <Route
          path="/careers"
          element={
            <>
              <Seo
                title="Careers at Essixx — Join Our Team"
                description="Explore open roles at Essixx across engineering, design, marketing, and operations. Build the future of digital products with us."
                path="/careers"
                keywords={[
                  ...siteConfig.keywords,
                  'Essixx careers',
                  'jobs in Pune',
                  'engineering jobs',
                  'design jobs',
                ]}
                jsonLd={[
                  buildPageJsonLd({
                    path: '/careers',
                    title: 'Careers at Essixx — Join Our Team',
                    description:
                      'Find open positions at Essixx and apply to roles across product, engineering, design, and operations.',
                    type: 'CollectionPage',
                  }),
                  buildBreadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Careers', path: '/careers' },
                  ]),
                  ...OPENINGS.map((job) => buildJobPostingJsonLd(job)),
                ]}
              />
              <CareersPage />
            </>
          }
        />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/payment/return" element={<PaymentReturnPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
