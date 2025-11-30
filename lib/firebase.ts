import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDWy3AfEihq7pQXPS28HGn3yfblBlWpTEk",
  authDomain: "devconnect-2b1c3.firebaseapp.com",
  projectId: "devconnect-2b1c3",
  storageBucket: "devconnect-2b1c3.firebasestorage.app",
  messagingSenderId: "797107445086",
  appId: "1:797107445086:web:5fcb9ee7752a69c69783cf",
  measurementId: "G-0063ST1DBE"
}

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
