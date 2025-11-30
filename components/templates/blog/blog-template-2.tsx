import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import type { BlogData } from "@/services/blog-service"

interface BlogTemplate2Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate2({ blog, authorName }: BlogTemplate2Props) {
  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Unknown date"

  // Estimate reading time (average 200 words per minute)
  const wordCount = blog.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <article className="min-h-screen bg-foreground text-background">
      {/* Navigation */}
      <nav className="border-b border-background/10">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-background/60 transition-colors hover:text-background"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 flex items-center gap-4 text-sm text-background/50">
              <span>{formattedDate}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {readingTime} min read
              </span>
            </div>
            <h1 className="mb-8 text-4xl font-bold leading-tight md:text-6xl">{blog.title}</h1>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-background/20" />
              <span className="font-medium">{authorName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="container mx-auto px-4">
          <div className="relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-2xl">
            <Image
              src={blog.coverImage || "/placeholder.svg"}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              crossOrigin="anonymous"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 text-lg leading-relaxed text-background/80">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-background/10 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <p className="text-sm text-background/50">Thanks for reading</p>
              <p className="text-sm text-background/50">© {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </article>
  )
}
