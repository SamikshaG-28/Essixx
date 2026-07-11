import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Firebase (analytics) loads after idle so it never blocks first paint.
const loadFirebase = () => import('./lib/firebase.js')
if ('requestIdleCallback' in window) {
  requestIdleCallback(loadFirebase, { timeout: 4000 })
} else {
  setTimeout(loadFirebase, 2500)
}
