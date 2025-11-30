"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Trash2, Edit2, Eye } from "lucide-react"
import { createBlog, updateBlog, deleteBlog, uploadBlogImage, type BlogData } from "@/services/blog-service"

interface BlogFormProps {
  uid: string
  blogs: BlogData[]
  onSave?: () => void
}

export default function BlogForm({ uid, blogs: initialBlogs, onSave }: BlogFormProps) {
  const [blogs, setBlogs] = useState<BlogData[]>(initialBlogs)
  const [editingBlog, setEditingBlog] = useState<BlogData | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setTitle("")
    setContent("")
    setCoverImage("")
    setEditingBlog(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const url = await uploadBlogImage(uid, file)
      setCoverImage(url)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return

    setLoading(true)
    try {
      if (editingBlog) {
        await updateBlog(editingBlog.id, { title, content, coverImage: coverImage || null })
      } else {
        await createBlog(uid, { title, content, coverImage: coverImage || undefined })
      }
      resetForm()
      onSave?.()
    } catch (error) {
      console.error("Error saving blog:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog: BlogData) => {
    setEditingBlog(blog)
    setTitle(blog.title)
    setContent(blog.content)
    setCoverImage(blog.coverImage || "")
  }

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    setLoading(true)
    try {
      await deleteBlog(blogId)
      setBlogs(blogs.filter((b) => b.id !== blogId))
      onSave?.()
    } catch (error) {
      console.error("Error deleting blog:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Existing Blogs */}
      {blogs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Blog Posts</h3>
          <div className="space-y-3">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <h4 className="font-semibold">{blog.title}</h4>
                    <p className="text-sm text-muted-foreground">/{blog.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" asChild>
                      <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(blog)}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(blog.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Create/Edit Blog Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingBlog ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex items-center gap-4">
              {coverImage && (
                <img
                  src={coverImage || "/placeholder.svg"}
                  alt="Cover"
                  className="h-20 w-32 rounded object-cover"
                  crossOrigin="anonymous"
                />
              )}
              <Label
                htmlFor="blog-cover-upload"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
              >
                <Upload className="h-4 w-4" />
                Upload Cover
              </Label>
              <input
                id="blog-cover-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="blog-title">Title</Label>
            <Input
              id="blog-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Amazing Blog Post"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="blog-content">Content</Label>
            <Textarea
              id="blog-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              rows={10}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={loading || !title.trim() || !content.trim()}>
              {loading ? "Saving..." : editingBlog ? "Update Post" : "Publish Post"}
            </Button>
            {editingBlog && (
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
