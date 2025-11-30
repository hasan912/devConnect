import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "./firebase"

export async function signUp(email: string, password: string, username: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const user = userCredential.user

  // Create user document in Firestore
  await setDoc(doc(db, "users", user.uid), {
    username: username.toLowerCase(),
    email: user.email,
    portfolioTemplate: "1",
    blogTemplate: "1",
    portfolioData: {
      name: username,
      bio: "",
      about: "",
      title: "",
      location: "",
      email: user.email,
      phone: "",
      website: "",
      resumeUrl: "",
      availability: "",
      yearsOfExperience: 0,
      skills: [],
      social: {
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        youtube: "",
        discord: "",
      },
      projects: [],
      experience: [],
      education: [],
      certifications: [],
      testimonials: [],
      profileImage: "",
      coverImage: "",
    },
    createdAt: new Date(),
  })

  return user
}

export async function signIn(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  return userCredential.user
}

export async function signOut() {
  await firebaseSignOut(auth)
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const { collection, query, where, getDocs } = await import("firebase/firestore")
  const q = query(collection(db, "users"), where("username", "==", username.toLowerCase()))
  const snapshot = await getDocs(q)
  return snapshot.empty
}
