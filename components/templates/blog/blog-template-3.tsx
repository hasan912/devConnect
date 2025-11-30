"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react"
import type { BlogData } from "@/services/blog-service"
import { motion } from "framer-motion"

interface BlogTemplate3Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate3({ blog, authorName }: BlogTemplate3Props) {
  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date"

  const readingTime = Math.ceil(blog.content.split(' ').length / 200)

  return (
    <article className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950">
      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-8 left-8 z-50"
      >
        <Link
          href="/blogs"
          className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 items-center text-sm text-slate-600 dark:text-slate-400 mb-6">
            <span className="flex items-center gap-2 px-3 py-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-full">
              <User className="h-4 w-4" />
              {authorName}
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-full">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2 px-3 py-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-full">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
          >
            {blog.title}
          </motion.h1>

          {/* Cover Image */}
          {blog.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-12"
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
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {blog.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed text-slate-700 dark:text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600 dark:text-slate-400">Share this article</p>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition">
                  <Share2 className="h-4 w-4" />
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
