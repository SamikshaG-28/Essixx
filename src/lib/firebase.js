import { initializeApp } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBCHgNb0rH_7tImSX-Fc9XTinDrRpTV7Wg',
  authDomain: 'urbancart-cc45c.firebaseapp.com',
  projectId: 'urbancart-cc45c',
  storageBucket: 'urbancart-cc45c.firebasestorage.app',
  messagingSenderId: '941827103153',
  appId: '1:941827103153:web:a9cf5944eeb4d2ce4b8590',
  measurementId: 'G-YXJNZK9ZS1',
}

export const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)

export const analyticsPromise =
  typeof window !== 'undefined'
    ? isSupported()
        .then((supported) => (supported ? getAnalytics(firebaseApp) : null))
        .catch(() => null)
    : Promise.resolve(null)

