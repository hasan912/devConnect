import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { db } from "./firebase"

export interface PortfolioData {
  name: string
  bio: string
  about: string
  title?: string
  location?: string
  email?: string
  phone?: string
  website?: string
  resumeUrl?: string
  yearsOfExperience?: number
  availability?: string
  skills: string[]
  social: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    youtube?: string
    dribbble?: string
    behance?: string
  }
  experience?: {
    company: string
    position: string
    duration: string
    description: string
    location?: string
  }[]
  education?: {
    institution: string
    degree: string
    duration: string
    description?: string
  }[]
  certifications?: string[]
  projects: {
    title: string
    description: string
    techStack: string[]
    github?: string
    live?: string
    image?: string
  }[]
  testimonials?: {
    name: string
    role: string
    company: string
    text: string
    image?: string
  }[]
  profileImage: string
  coverImage?: string
}

export interface UserData {
  uid: string
  username: string
  email: string
  portfolioTemplate: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
  blogTemplate: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
  portfolioData: PortfolioData
}

export async function getUserByUid(uid: string): Promise<UserData | null> {
  const docRef = doc(db, "users", uid)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) return null

  return {
    uid,
    ...docSnap.data(),
  } as UserData
}

export async function getUserByUsername(username: string): Promise<UserData | null> {
  const q = query(collection(db, "users"), where("username", "==", username.toLowerCase()))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return null

  const doc = snapshot.docs[0]
  return {
    uid: doc.id,
    ...doc.data(),
  } as UserData
}
