import { HashRouter, Routes, Route } from 'react-router-dom'
import Seo from './components/Seo.jsx'
import HomePage from './pages/HomePage.jsx'
import LaunchAppPage from './pages/LaunchAppPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import CareersPage from './pages/CareersPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import PaymentReturnPage from './pages/PaymentReturnPage.jsx'
import {
  siteConfig,
  buildPageJsonLd,
  buildBreadcrumbJsonLd,
  absoluteUrl,
} from './seo/siteConfig.js'

function App() {
  return (
    <HashRouter>
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
                ]}
              />
              <CareersPage />
            </>
          }
        />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/return" element={<PaymentReturnPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
