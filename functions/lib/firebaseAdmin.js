import admin from 'firebase-admin'

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
    const json = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf8')
    return JSON.parse(json)
  }

  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    return {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }
  }

  return null
}

function ensureAdmin() {
  if (admin.apps.length) return

  const serviceAccount = getServiceAccount()
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    return
  }

  // On deployed Cloud Functions in the same GCP project, ADC is available.
  admin.initializeApp()
}

export function getAdminDb() {
  ensureAdmin()
  return admin.firestore()
}

export function getServerTimestamp() {
  ensureAdmin()
  return admin.firestore.FieldValue.serverTimestamp
}
