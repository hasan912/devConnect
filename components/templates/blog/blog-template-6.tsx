"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Share2, ThumbsUp, MessageCircle } from "lucide-react"
import type { BlogData } from "@/services/blog-service"
import { motion } from "framer-motion"

interface BlogTemplate6Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate6({ blog, authorName }: BlogTemplate6Props) {
  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date"

  return (
    <article className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 dark:from-orange-950 dark:via-rose-950 dark:to-pink-950">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-orange-200/50 dark:border-orange-800/50"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/blogs"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition">
              <ThumbsUp className="h-4 w-4 text-orange-700 dark:text-orange-300" />
            </button>
            <button className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition">
              <Share2 className="h-4 w-4 text-orange-700 dark:text-orange-300" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Category Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-2 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full text-sm font-semibold mb-6"
          >
            Featured Article
          </motion.span>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600"
          >
            {blog.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-6 items-center text-sm text-neutral-600 dark:text-neutral-400 mb-12"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {authorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{authorName}</p>
                <p className="text-xs">{formattedDate}</p>
              </div>
            </div>
          </motion.div>

          {/* Cover Image */}
          {blog.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-16"
            >
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-black prose-headings:bg-clip-text prose-headings:text-transparent prose-headings:bg-gradient-to-r prose-headings:from-orange-600 prose-headings:to-pink-600
              prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
              prose-code:text-pink-600 prose-code:bg-pink-50 dark:prose-code:bg-pink-900/20 prose-code:px-2 prose-code:py-1 prose-code:rounded">
              {blog.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="mb-6 text-lg first-letter:text-6xl first-letter:font-black first-letter:text-orange-600 first-letter:mr-2 first-letter:float-left">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Engagement */}
            <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-900/50 transition">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                </div>
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white font-semibold hover:shadow-lg transition">
                  Share
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  )
}
