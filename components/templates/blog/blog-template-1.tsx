import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"
import type { BlogData } from "@/services/blog-service"

interface BlogTemplate1Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate1({ blog, authorName }: BlogTemplate1Props) {
  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date"

  return (
    <article className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Cover Image */}
      {blog.coverImage && (
        <div className="relative h-64 w-full md:h-96 lg:h-[500px]">
          <Image
            src={blog.coverImage || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Title & Meta */}
          <div className={blog.coverImage ? "-mt-32 relative z-10" : ""}>
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-5xl">{blog.title}</h1>
            <div className="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-medium">{authorName}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground">
            {blog.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Written by {authorName} • © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </article>
  )
}
