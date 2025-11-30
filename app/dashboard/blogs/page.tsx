"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import BlogForm from "@/components/forms/blog-form"
import { getBlogsByUser, type BlogData } from "@/services/blog-service"
import { Loader2 } from "lucide-react"

export default function BlogsPage() {
  const { user } = useAuth()
  const [blogs, setBlogs] = useState<BlogData[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBlogs = async () => {
    if (!user) return
    setLoading(true)
    try {
      const userBlogs = await getBlogsByUser(user.uid)
      setBlogs(userBlogs)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return <div>Error loading user data</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="mt-1 text-muted-foreground">Share your thoughts and tutorials</p>
      </div>

      <BlogForm uid={user.uid} blogs={blogs} onSave={fetchBlogs} />
    </div>
  )
}
