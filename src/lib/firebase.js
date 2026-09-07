import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

/**
 * Firebase web config, from the environment with the project's own values as
 * the fallback.
 *
 * These are identifiers, not secrets — a web API key names a project and
 * nothing more; access is decided by Firestore rules and Auth settings. They
 * live in env so a different project can be pointed at without a code change,
 * and they carry defaults so a missing .env cannot silently produce an app
 * that fails at runtime instead of at build time.
 */
const env = import.meta.env

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyDgX3mKtJSQ-mP32mzUMYihtnqRaRtnFcc',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'essy-bbd67.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'essy-bbd67',
  storageBucket:
    env.VITE_FIREBASE_STORAGE_BUCKET || 'essy-bbd67.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '926449643637',
  appId:
    env.VITE_FIREBASE_APP_ID || '1:926449643637:web:469e1dc85ce315a33f483c',
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || 'G-YNLHND1ZCV',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)

/**
 * Google is the only sign-in method.
 *
 * The desktop app sends people here rather than embedding a browser of its
 * own: an OAuth screen inside an app window is exactly what a phishing page
 * looks like, and users cannot check the address bar of a window that has none.
 */
export const googleProvider = new GoogleAuthProvider()

export const analyticsPromise =
  typeof window !== 'undefined'
    ? isSupported()
        .then((supported) => (supported ? getAnalytics(firebaseApp) : null))
        .catch(() => null)
    : Promise.resolve(null)

