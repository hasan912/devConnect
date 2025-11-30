"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Terminal, User, Calendar } from "lucide-react"
import type { BlogData } from "@/services/blog-service"
import { motion } from "framer-motion"

interface BlogTemplate7Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate7({ blog, authorName }: BlogTemplate7Props) {
  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date"

  return (
    <article className="min-h-screen bg-emerald-950 text-emerald-50">
      {/* Terminal Header */}
      <div className="border-b border-emerald-800 bg-emerald-900/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 font-mono text-sm text-emerald-400">
              <Terminal className="h-4 w-4" />
              <span>blog/{blog.slug}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 font-mono text-sm"
        >
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition"
          >
            <span className="text-emerald-600">$</span>
            <ArrowLeft className="h-4 w-4" />
            cd ../blogs
          </Link>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Command Prompt */}
          <div className="font-mono text-sm mb-8 space-y-2">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-emerald-400"
            >
              <span className="text-emerald-600">$</span> cat article.md
            </motion.p>
          </div>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="border-l-2 border-emerald-700 pl-6 mb-8 font-mono text-sm space-y-1 text-emerald-300"
          >
            <p className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Author: {authorName}
            </p>
            <p className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date: {formattedDate}
            </p>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl md:text-6xl font-black mb-12 leading-tight text-emerald-300 font-mono"
          >
            # {blog.title}
          </motion.h1>

          {/* Cover Image */}
          {blog.coverImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="relative h-96 mb-12 rounded-lg overflow-hidden border-2 border-emerald-800"
            >
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-emerald-950/80 backdrop-blur-sm px-4 py-2 font-mono text-xs text-emerald-400">
                <span className="text-emerald-600">$</span> display cover-image.jpg
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            {blog.content.split('\n\n').map((paragraph, idx) => {
              // Check if it's a heading
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-3xl font-bold text-emerald-300 mt-12 mb-6 font-mono">
                    ## {paragraph.replace('# ', '')}
                  </h2>
                )
              }
              // Check if it's a code block
              if (paragraph.startsWith('```')) {
                return (
                  <pre key={idx} className="bg-emerald-900/50 border border-emerald-800 rounded-lg p-6 overflow-x-auto">
                    <code className="text-sm font-mono text-emerald-200">
                      {paragraph.replace(/```/g, '')}
                    </code>
                  </pre>
                )
              }
              return (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-lg leading-relaxed text-emerald-200 border-l-2 border-emerald-800/50 pl-6"
                >
                  {paragraph}
                </motion.p>
              )
            })}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-emerald-800"
          >
            <div className="font-mono text-sm space-y-2">
              <p className="text-emerald-400">
                <span className="text-emerald-600">$</span> echo "End of article"
              </p>
              <p className="text-emerald-600 pl-4">End of article</p>
              <p className="text-emerald-400 mt-4">
                <span className="text-emerald-600">$</span> Written by {authorName}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </article>
  )
}
