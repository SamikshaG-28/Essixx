/**
 * The browser half of signing in to the desktop app.
 *
 * The app opens this page with a nonce it invented, then polls for the result.
 * Signing in here writes the account against that nonce; the app's next poll
 * collects it and the server deletes it. The nonce never travels anywhere the
 * app did not put it, and it only works once.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'

import Seo from '../components/Seo.jsx'
import { signInWithGoogle } from '../lib/auth.js'
import { useAccount } from '../lib/useAccount.js'
import './DashboardPage.css'

const EASE = [0.22, 1, 0.36, 1]

function nonceFromUrl() {
  // Accept the nonce from the hash as well as the query. Static hosts vary in
  // what they do with an unknown path, and a hash always survives whatever
  // rewriting or redirecting happens in between.
  const search = new URLSearchParams(window.location.search)
  const hash = window.location.hash.replace(/^#\/?/, '')
  const fromHash = new URLSearchParams(hash.split('?')[1] || hash)
  const value = search.get('nonce') || fromHash.get('nonce') || ''
  return /^[a-f0-9]{16,64}$/.test(value) ? value : ''
}

export default function AppLoginPage() {
  const { user, loading } = useAccount()
  const [nonce] = useState(nonceFromUrl)
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')

  /** Hand the signed-in account to whichever app opened this page. */
  const publish = useCallback(
    async (account) => {
      if (!nonce || !account?.email) return
      try {
        // The first state change happens after this await, so the auto-publish
        // effect below never sets state synchronously during its own render.
        const { loadFirestore } = await import('../lib/firestore.js')
        setState('publishing')
        const fs = await loadFirestore()
        const firestore = await import('firebase/firestore')
        await firestore.setDoc(firestore.doc(fs.db, 'appSessions', nonce), {
          email: account.email.toLowerCase(),
          name: account.displayName || '',
          createdAt: firestore.serverTimestamp(),
        })
        setState('done')
      } catch (e) {
        setError(e?.message || 'Could not hand the session to Essy')
        setState('idle')
      }
    },
    [nonce],
  )

  // Someone already signed in on this browser should not have to click again.
  //
  // Guarded by a ref rather than by reading `state`: keying the effect on the
  // state it causes is what turns "publish once" into a render loop.
  const published = useRef(false)
  useEffect(() => {
    if (published.current || loading || !user || !nonce) return
    published.current = true
    void publish(user)
  }, [loading, user, nonce, publish])

  const signIn = async () => {
    setError('')
    try {
      const account = await signInWithGoogle()
      await publish(account)
    } catch (e) {
      const code = e?.code || ''
      if (!code.includes('popup-closed') && !code.includes('cancelled')) {
        setError(e?.message || 'Sign-in failed')
      }
    }
  }

  return (
    <>
      <Seo
        title="Sign in to Essy — Essixx"
        description="Connect your Essixx account to the Essy desktop app."
        path="/app-login"
        robots="noindex, nofollow"
      />

      <main className="db-page">
        <motion.div
          className="db-container"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="db-signin">
            {!nonce ? (
              <>
                <ShieldCheck className="db-signin-icon" aria-hidden="true" />
                <h1 className="db-signin-title">Open this from Essy</h1>
                <p className="db-signin-lead">
                  This page finishes a sign-in that the desktop app starts. Open
                  Essy and choose <strong>Continue in browser</strong>.
                </p>
                <a className="db-google-btn" href="/dashboard">
                  Go to your dashboard
                </a>
              </>
            ) : state === 'done' ? (
              <>
                <Check className="db-signin-icon" aria-hidden="true" />
                <h1 className="db-signin-title">You're signed in</h1>
                <p className="db-signin-lead">
                  Essy has your account. You can close this tab and go back to
                  the app.
                </p>
              </>
            ) : (
              <>
                <ShieldCheck className="db-signin-icon" aria-hidden="true" />
                <h1 className="db-signin-title">Sign in to Essy</h1>
                <p className="db-signin-lead">
                  Signing in here connects your plan to the desktop app. Nothing
                  you edit ever leaves your machine.
                </p>
                <button
                  type="button"
                  className="db-google-btn"
                  onClick={signIn}
                  disabled={loading || state === 'publishing'}
                >
                  {state === 'publishing'
                    ? 'Connecting Essy…'
                    : 'Continue with Google'}
                </button>
              </>
            )}

            {error && <p className="db-error">{error}</p>}
          </div>
        </motion.div>
      </main>
    </>
  )
}
