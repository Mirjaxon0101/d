import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || 'AIzaSyDemoKeyPlaceholderForBlueContest',
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || 'bluecontest-app.firebaseapp.com',
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || 'bluecontest-app',
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || 'bluecontest-app.appspot.com',
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '1234567890',
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || '1:1234567890:web:abc123def456'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
