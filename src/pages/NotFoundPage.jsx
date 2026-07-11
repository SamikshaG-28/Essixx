import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import './CheckoutPage.css'

export default function NotFoundPage() {
  return (
    <div className="checkout-page">
      <Seo
        title="Page not found — Essixx"
        description="The page you are looking for does not exist. Explore Essixx web development, app development, and digital marketing services."
        path="/404"
        robots="noindex, follow"
        jsonLd={[]}
      />
      <main className="checkout-main">
        <div className="checkout-card">
          <p className="checkout-eyebrow">Error 404</p>
          <h1>Page not found</h1>
          <p className="checkout-note">
            The page you are looking for doesn&apos;t exist or has moved.{' '}
            <Link to="/">Go back to the Essixx homepage</Link> or explore{' '}
            <Link to="/about">about us</Link> and <Link to="/careers">careers</Link>.
          </p>
        </div>
      </main>
    </div>
  )
}
