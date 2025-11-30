import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"

export interface BlogData {
  id: string
  uid: string
  title: string
  content: string
  coverImage: string | null
  slug: string
  createdAt: Timestamp
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export async function createBlog(
  uid: string,
  data: { title: string; content: string; coverImage?: string },
): Promise<string> {
  const slug = generateSlug(data.title) + "-" + Date.now().toString(36)

  const blogRef = await addDoc(collection(db, "blogs"), {
    uid,
    title: data.title,
    content: data.content,
    coverImage: data.coverImage || null,
    slug,
    createdAt: Timestamp.now(),
  })

  return blogRef.id
}

export async function updateBlog(blogId: string, data: Partial<Omit<BlogData, "id" | "uid" | "createdAt">>) {
  const blogRef = doc(db, "blogs", blogId)
  await updateDoc(blogRef, data)
}

export async function deleteBlog(blogId: string) {
  const blogRef = doc(db, "blogs", blogId)
  await deleteDoc(blogRef)
}

export async function getBlogBySlug(slug: string): Promise<BlogData | null> {
  const q = query(collection(db, "blogs"), where("slug", "==", slug))
  const snapshot = await getDocs(q)

  if (snapshot.empty) return null

  const doc = snapshot.docs[0]
  return {
    id: doc.id,
    ...doc.data(),
  } as BlogData
}

export async function getBlogsByUser(uid: string): Promise<BlogData[]> {
  const q = query(collection(db, "blogs"), where("uid", "==", uid), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogData[]
}

export async function getAllBlogs(): Promise<BlogData[]> {
  const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as BlogData[]
}

export async function uploadBlogImage(uid: string, file: File): Promise<string> {
  const storageRef = ref(storage, `blogs/${uid}/${Date.now()}_${file.name}`)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
