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

const serviceAccount = getServiceAccount()

if (!admin.apps.length) {
  if (!serviceAccount) {
    throw new Error('Missing Firebase Admin credentials in environment.')
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const adminDb = admin.firestore()
export const serverTimestamp = admin.firestore.FieldValue.serverTimestamp

