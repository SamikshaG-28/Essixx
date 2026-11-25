import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import SiteNav from '../components/site/SiteNav.jsx'
import './Pages.css'

export default function NotFoundPage() {
  return (
    <div className="page">
      <Seo
        title="Page not found — Essixx"
        description="The page you are looking for does not exist. Explore Essixx web development, app development, and digital marketing services."
        path="/404"
        robots="noindex, follow"
        jsonLd={[]}
      />
      <SiteNav />
      <main className="notfound">
        <div className="wrap">
          <p className="eyebrow">Error 404</p>
          <h1 className="display page-title">
            Nothing <em>here.</em>
          </h1>
          <p className="lead page-lead">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
          </p>
          <div className="notfound-actions">
            <Link className="btn btn--primary" to="/">
              <ArrowLeft size={16} aria-hidden="true" /> Back home
            </Link>
            <Link className="btn btn--ghost" to="/about">
              About us
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
