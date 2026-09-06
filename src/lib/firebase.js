import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDgX3mKtJSQ-mP32mzUMYihtnqRaRtnFcc',
  authDomain: 'essy-bbd67.firebaseapp.com',
  projectId: 'essy-bbd67',
  storageBucket: 'essy-bbd67.firebasestorage.app',
  messagingSenderId: '926449643637',
  appId: '1:926449643637:web:d6add8aa82ee011a3f483c',
  measurementId: 'G-5QZJYRJZM8',
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

