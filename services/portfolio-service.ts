import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import type { PortfolioData } from "@/lib/get-user-data"

export async function updatePortfolio(uid: string, data: Partial<PortfolioData>) {
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, {
    portfolioData: data,
  })
}

export async function updatePortfolioField(uid: string, field: string, value: unknown) {
  const userRef = doc(db, "users", uid)
  await updateDoc(userRef, {
    [`portfolioData.${field}`]: value,
  })
}

export async function uploadImage(uid: string, file: File, path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // Check file size (max 500KB for base64 storage)
    if (file.size > 500 * 1024) {
      reject(new Error('Image size should be less than 500KB'))
      return
    }

    const reader = new FileReader()
    
    reader.onloadend = () => {
      const base64String = reader.result as string
      resolve(base64String)
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read image file'))
    }
    
    reader.readAsDataURL(file)
  })
}

export async function updateTemplate(uid: string, type: "portfolio" | "blog", templateId: string) {
  const userRef = doc(db, "users", uid)
  const field = type === "portfolio" ? "portfolioTemplate" : "blogTemplate"
  await updateDoc(userRef, {
    [field]: templateId,
  })
}
