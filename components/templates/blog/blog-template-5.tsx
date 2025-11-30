"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Coffee } from "lucide-react"
import type { BlogData } from "@/services/blog-service"
import { motion } from "framer-motion"

interface BlogTemplate5Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate5({ blog, authorName }: BlogTemplate5Props) {
  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date"

  const readingTime = Math.ceil(blog.content.split(' ').length / 200)

  return (
    <article className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Minimal Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            All Articles
          </Link>
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <Coffee className="h-4 w-4" />
            {readingTime} min
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Meta */}
          <div className="mb-8 text-sm text-neutral-500 dark:text-neutral-400 space-y-1">
            <p className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {authorName}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-black mb-12 leading-tight text-neutral-900 dark:text-neutral-100">
            {blog.title}
          </h1>

          {/* Cover Image */}
          {blog.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-96 mb-12 -mx-4 md:mx-0 md:rounded-2xl overflow-hidden"
            >
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          )}

          {/* Article Content */}
          <div className="prose prose-xl dark:prose-invert max-w-none prose-headings:font-black prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed">
            {blog.content.split('\n\n').map((paragraph, idx) => {
              // Check if it's a heading
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-3xl font-black mt-12 mb-6 text-neutral-900 dark:text-neutral-100">
                    {paragraph.replace('# ', '')}
                  </h2>
                )
              }
              return (
                <p key={idx} className="mb-6 text-lg">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Divider */}
          <div className="my-16 flex items-center justify-center">
            <div className="w-16 h-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>

          {/* Author Section */}
          <div className="py-12 border-t border-b border-neutral-200 dark:border-neutral-800">
            <p className="text-sm uppercase tracking-wider text-neutral-500 mb-3">About the Author</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{authorName}</p>
          </div>
        </motion.article>
      </div>
    </article>
  )
}
