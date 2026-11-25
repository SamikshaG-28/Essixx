import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react'

import { signOut } from '../lib/auth.js'
import { useAccount } from '../lib/useAccount.js'

export function SignOutButton({ className = 'db-ghost', icon = true }) {
  return (
    <button type="button" className={className} onClick={() => void signOut()}>
      {icon ? <LogOut size={13} aria-hidden="true" /> : null}
      Sign out
    </button>
  )
}

/** Sign in when logged out; Account + Sign out when logged in. */
export function NavAuthLinks({
  linkClass,
  signedOutTo = '/login',
  onNavigate,
}) {
  const { user, loading } = useAccount()

  if (loading || !user) {
    return (
      <Link to={signedOutTo} className={linkClass} onClick={onNavigate}>
        Sign in
      </Link>
    )
  }

  return (
    <>
      <Link to="/dashboard" className={linkClass} onClick={onNavigate}>
        Account
      </Link>
      <button
        type="button"
        className={linkClass}
        onClick={() => {
          onNavigate?.()
          void signOut()
        }}
      >
        Sign out
      </button>
    </>
  )
}
