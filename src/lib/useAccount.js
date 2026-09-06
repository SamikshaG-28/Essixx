/**
 * Sign-in state and the plan behind it, as one hook.
 *
 * `user` is who Firebase says is signed in; `account` is the Firestore record
 * that carries the plan. They are fetched separately because the plan can
 * change without a sign-in event — a Cashfree webhook writes it while the tab
 * is open — so the dashboard needs to be able to refetch on demand.
 */
import { useCallback, useEffect, useState } from 'react'

import { ensureUserDoc, fetchAccount, onAuthChange } from './auth.js'

export function useAccount() {
  const [user, setUser] = useState(null)
  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async (email) => {
    if (!email) {
      setAccount(null)
      return
    }
    try {
      setAccount(await fetchAccount(email))
    } catch {
      // A read failure should leave the dashboard on the free tier rather
      // than showing a plan the server never confirmed.
      setAccount(null)
    }
  }, [])

  useEffect(() => {
    return onAuthChange(async (next) => {
      setUser(next)
      if (next) {
        try {
          await ensureUserDoc(next)
        } catch {
          /* the record may already exist, or rules may block it */
        }
        await refresh(next.email)
      } else {
        setAccount(null)
      }
      setLoading(false)
    })
  }, [refresh])

  return {
    user,
    account,
    loading,
    plan: account?.plan || 'free',
    refresh: () => refresh(user?.email),
  }
}
