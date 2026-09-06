/**
 * Lazy handle on Firestore.
 *
 * The checkout and payment-return routes stay eagerly bundled so a failed
 * chunk load can never turn a paying customer's redirect into a blank page.
 * The Firebase SDK behind them does not need that guarantee — pulling it in
 * on demand keeps ~500 kB of Firestore out of every marketing pageview.
 */
let cached

export function loadFirestore() {
  if (!cached) {
    cached = Promise.all([import('firebase/firestore'), import('./firebase.js')]).then(
      ([firestore, { db }]) => ({
        db,
        doc: firestore.doc,
        getDoc: firestore.getDoc,
        updateDoc: firestore.updateDoc,
        serverTimestamp: firestore.serverTimestamp,
      }),
    )
  }
  return cached
}
