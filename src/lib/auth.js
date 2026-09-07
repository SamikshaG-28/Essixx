/**
 * Google sign-in, and the user record behind it.
 *
 * Loaded on demand like Firestore: the Auth SDK is another ~150 kB that a
 * marketing pageview should never pay for.
 *
 * The user document is keyed by email rather than by uid. That is what the
 * desktop app and the Cashfree webhook both have to work with — a payment
 * arrives with an email on it, not a Firebase uid — and keying by anything
 * else would mean a lookup table just to reconcile the two.
 */
let cached

function loadAuth() {
  if (!cached) {
    cached = Promise.all([import('firebase/auth'), import('./firebase.js')]).then(
      ([mod, { auth, googleProvider }]) => ({ mod, auth, googleProvider }),
    )
  }
  return cached
}

/** The document id for an account. Emails are case-insensitive in practice. */
export function accountKey(email) {
  return String(email || '').trim().toLowerCase()
}

/**
 * Create the user record if this is a first sign-in, and return it.
 *
 * Existing records are never overwritten with defaults — doing so on every
 * sign-in would silently reset a paying customer to the free tier.
 */
export async function ensureUserDoc(user) {
  const { loadFirestore } = await import('./firestore.js')
  const fs = await loadFirestore()
  const firestore = await import('firebase/firestore')
  const key = accountKey(user.email)
  const ref = firestore.doc(fs.db, 'users', key)
  const snap = await firestore.getDoc(ref)

  if (!snap.exists()) {
    const record = {
      email: key,
      name: user.displayName || '',
      photoURL: user.photoURL || '',
      plan: 'free',
      planExpiresAt: null,
      createdAt: firestore.serverTimestamp(),
      updatedAt: firestore.serverTimestamp(),
    }
    await firestore.setDoc(ref, record)
    return { ...record, createdAt: null, updatedAt: null }
  }

  // Refresh only the profile fields; the plan belongs to the webhook.
  await firestore.setDoc(
    ref,
    {
      name: user.displayName || snap.data().name || '',
      photoURL: user.photoURL || snap.data().photoURL || '',
      updatedAt: firestore.serverTimestamp(),
    },
    { merge: true },
  )
  return snap.data()
}

/**
 * Turn Firebase's error codes into something worth reading.
 *
 * `auth/invalid-credential` tells a person nothing about what to do next.
 */
function readableAuthError(error) {
  const code = error?.code || ''
  if (code.includes('email-already-in-use'))
    return 'That email already has an account. Try signing in instead.'
  if (code.includes('invalid-credential') || code.includes('wrong-password'))
    return "That email and password don't match."
  if (code.includes('user-not-found'))
    return 'No account with that email yet.'
  if (code.includes('weak-password')) return 'Use at least six characters.'
  if (code.includes('invalid-email')) return "That doesn't look like an email address."
  if (code.includes('too-many-requests'))
    return 'Too many attempts. Wait a minute and try again.'
  if (code.includes('operation-not-allowed'))
    return 'Email sign-in is not enabled for this project yet.'
  return error?.message || 'Something went wrong.'
}

export async function signUpWithEmail(email, password, name) {
  const { mod, auth } = await loadAuth()
  try {
    const result = await mod.createUserWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    )
    if (name) await mod.updateProfile(result.user, { displayName: name })
    await ensureUserDoc({ ...result.user, displayName: name || '' })
    return result.user
  } catch (error) {
    throw new Error(readableAuthError(error))
  }
}

export async function signInWithEmail(email, password) {
  const { mod, auth } = await loadAuth()
  try {
    const result = await mod.signInWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    )
    await ensureUserDoc(result.user)
    return result.user
  } catch (error) {
    throw new Error(readableAuthError(error))
  }
}

export async function signInWithGoogle() {
  const { mod, auth, googleProvider } = await loadAuth()
  const result = await mod.signInWithPopup(auth, googleProvider)
  await ensureUserDoc(result.user)
  return result.user
}

export async function signOut() {
  const { mod, auth } = await loadAuth()
  await mod.signOut(auth)
}

/** Subscribe to sign-in state. Returns an unsubscribe function. */
export function onAuthChange(callback) {
  let stop = () => {}
  let cancelled = false
  loadAuth().then(({ mod, auth }) => {
    if (cancelled) return
    stop = mod.onAuthStateChanged(auth, callback)
  })
  return () => {
    cancelled = true
    stop()
  }
}

/** Read the account record for a signed-in user. */
export async function fetchAccount(email) {
  const { loadFirestore } = await import('./firestore.js')
  const fs = await loadFirestore()
  const firestore = await import('firebase/firestore')
  const snap = await firestore.getDoc(
    firestore.doc(fs.db, 'users', accountKey(email)),
  )
  return snap.exists() ? snap.data() : null
}

/** Orders placed by this account, newest first. */
export async function fetchOrders(email) {
  const { loadFirestore } = await import('./firestore.js')
  const fs = await loadFirestore()
  const firestore = await import('firebase/firestore')
  const q = firestore.query(
    firestore.collection(fs.db, 'orders'),
    firestore.where('email', '==', accountKey(email)),
    firestore.limit(20),
  )
  const snap = await firestore.getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0))
}
