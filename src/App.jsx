import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Seo from './components/Seo.jsx'
import HomePage from './pages/HomePage.jsx'
// Checkout / payment return stay eager — UrbanCart lands here; must never 404
// while a lazy chunk fails or Suspense is still empty.
import CheckoutPage from './pages/CheckoutPage.jsx'
import PaymentReturnPage from './pages/PaymentReturnPage.jsx'
import { FAQS } from './data/faqs.js'
import { OPENINGS } from './data/openings.js'
import {
  siteConfig,
  buildPageJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildJobPostingJsonLd,
  buildWebsiteOfferJsonLd,
  absoluteUrl,
} from './seo/siteConfig.js'

// Route-level code splitting for marketing pages only.
const LaunchAppPage = lazy(() => import('./pages/LaunchAppPage.jsx'))
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'))
const CareersPage = lazy(() => import('./pages/CareersPage.jsx'))
const PratikshaProfilePage = lazy(() => import('./pages/PratikshaProfilePage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))
const DashboardPage = lazy(() => import('./pages/DashboardPage.jsx'))
const PlanCheckout = lazy(() => import('./pages/PlanCheckout.jsx'))
const AppLoginPage = lazy(() => import('./pages/AppLoginPage.jsx'))
const SignupPage = lazy(() => import('./pages/AuthPages.jsx'))
const LoginPage = lazy(() =>
  import('./pages/AuthPages.jsx').then((m) => ({ default: m.LoginPage })),
)

// Hash URLs from UrbanCart stubs (/#/checkout?orderId=…) or old links
// are rewritten to real path URLs before the router mounts.
if (typeof window !== 'undefined') {
  const hash = window.location.hash || ''
  if (hash.startsWith('#/')) {
    const raw = hash.slice(1)
    const [hashPath, hashQuery = ''] = raw.split('?')
    const search = window.location.search.replace(/^\?/, '')
    const combined = [search, hashQuery].filter(Boolean).join('&')
    window.history.replaceState(null, '', hashPath + (combined ? `?${combined}` : ''))
  }
}

/**
 * Which checkout to show.
 *
 * `?plan=` is an Essy purchase, where no order exists yet; `?orderId=` is the
 * relay for an order another storefront already created. The choice is made
 * here, at the route, so neither page ever sees a conditional hook order.
 */
function CheckoutRoute() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const plan = params.get('plan')
  const orderId = params.get('orderId')
  return plan && !orderId ? <PlanCheckout planId={plan} /> : <CheckoutPage />
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
                  buildWebsiteOfferJsonLd(),
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
                title="Launch Essixx Projects — XiPay, Ferron, Motvyn & Kasbill"
                description="Explore Essixx products including XiPay, Ferron laundry billing, Motvyn, and Kasbill — built by Kartik Sabale and Pratiksha Relekar."
                path="/launch"
                keywords={[
                  ...siteConfig.keywords,
                  'Essixx projects',
                  'XiPay',
                  'Ferron',
                  'Motvyn',
                  'Kasbill',
                ]}
                ogImage={absoluteUrl('/essixx-logo.png')}
                ogImageAlt="Essixx projects launch page preview"
                jsonLd={[
                  buildPageJsonLd({
                    path: '/launch',
                    title: 'Launch Essixx Projects',
                    description:
                      'Open and explore Essixx products — XiPay, Ferron, Motvyn, and Kasbill.',
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
        <Route
          path="/pratiksha"
          element={
            <>
              <Seo
                title="Pratiksha Relekar — Design | Essixx"
                description="Pratiksha Relekar is a freelance designer and developer at Essixx. Explore her GitHub projects, skills, and work with Kartik Sabale."
                path="/pratiksha"
                keywords={[
                  ...siteConfig.keywords,
                  'Pratiksha Relekar',
                  'Essixx design',
                  'freelance designer India',
                ]}
                ogImage={absoluteUrl('/team/pratiksha-relekar.webp')}
                ogImageAlt="Pratiksha Relekar — Design at Essixx"
                jsonLd={[
                  buildPageJsonLd({
                    path: '/pratiksha',
                    title: 'Pratiksha Relekar — Design | Essixx',
                    description:
                      'Profile of Pratiksha Relekar — freelance designer and developer building products with Essixx.',
                    type: 'ProfilePage',
                  }),
                  buildBreadcrumbJsonLd([
                    { name: 'Home', path: '/' },
                    { name: 'Pratiksha Relekar', path: '/pratiksha' },
                  ]),
                  {
                    '@context': 'https://schema.org',
                    '@type': 'Person',
                    '@id': `${siteConfig.url}/pratiksha#person`,
                    name: 'Pratiksha Relekar',
                    jobTitle: 'Design',
                    url: `${siteConfig.url}/pratiksha`,
                    image: absoluteUrl('/team/pratiksha-relekar.webp'),
                    worksFor: { '@id': `${siteConfig.url}/#organization` },
                    sameAs: [
                      'https://github.com/pratiksha-relekar',
                      'https://in.linkedin.com/in/pratiksha-relekar-0a49471b4',
                    ],
                  },
                ]}
              />
              <PratikshaProfilePage />
            </>
          }
        />
          {/* The dashboard carries its own <Seo>, since it renders two very
              different states and only one of them is a page worth titling. */}
          <Route path="/app-login" element={<AppLoginPage />} />
          <Route path="/app-login/" element={<AppLoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/" element={<DashboardPage />} />
          <Route path="/checkout" element={<CheckoutRoute />} />
          <Route path="/checkout/" element={<CheckoutRoute />} />
          <Route path="/payment/return" element={<PaymentReturnPage />} />
          <Route path="/payment/return/" element={<PaymentReturnPage />} />
          <Route
            path="/signup"
            element={
              <>
                <Seo
                  title="Sign up — Essixx"
                  description="Create your Essixx profile to get started with freelance website and product development."
                  path="/signup"
                  robots="noindex, nofollow"
                />
                <SignupPage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Seo
                  title="Log in — Essixx"
                  description="Log in to your Essixx account."
                  path="/login"
                  robots="noindex, nofollow"
                />
                <LoginPage />
              </>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
