import { getAllBlogs } from "@/services/blog-service"
import { getUserByUid } from "@/lib/get-user-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, BookOpen } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Blogs | DevConnect",
  description: "Discover blog posts from developers in our community",
}

export default async function AllBlogsPage() {
  const blogs = await getAllBlogs()

  const blogsWithAuthors = await Promise.all(
    blogs.map(async (blog) => {
      const user = await getUserByUid(blog.uid)
      return {
        ...blog,
        createdAt: blog.createdAt.toDate().toISOString(),
        author: user
          ? {
              name: user.portfolioData.name || user.username,
              username: user.username,
              profileImage: user.portfolioData.profileImage,
            }
          : null,
      }
    })
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <BookOpen className="h-4 w-4" />
              Community Blogs
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl mb-4">
              Explore <span className="gradient-text">Developer Blogs</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover insights, tutorials, and stories from our developer community
            </p>
          </div>
        </div>
      </div>

      {/* Blogs Grid */}
      <div className="container mx-auto px-4 py-12">
        {blogsWithAuthors.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No blogs yet</h2>
            <p className="text-muted-foreground mb-6">Be the first to share your knowledge!</p>
            <Button asChild>
              <Link href="/dashboard/blogs">Create Your First Blog</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogsWithAuthors.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Cover Image */}
                {blog.coverImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{blog.content.substring(0, 120)}...</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Author Info */}
                  {blog.author && (
                    <Link
                      href={`/u/${blog.author.username}`}
                      className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={blog.author.profileImage} alt={blog.author.name} />
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{blog.author.name}</p>
                        <p className="text-xs text-muted-foreground truncate">@{blog.author.username}</p>
                      </div>
                    </Link>
                  )}

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>

                  {/* Read More Button */}
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/blog/${blog.slug}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
