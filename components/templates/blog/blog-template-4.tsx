"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Heart, Bookmark } from "lucide-react"
import type { BlogData } from "@/services/blog-service"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface BlogTemplate4Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate4({ blog, authorName }: BlogTemplate4Props) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date"

  return (
    <article ref={ref} className="min-h-screen bg-black text-white">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4"
      >
        <button className="w-12 h-12 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center hover:bg-purple-600 transition">
          <Heart className="h-5 w-5" />
        </button>
        <button className="w-12 h-12 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center hover:bg-purple-600 transition">
          <Bookmark className="h-5 w-5" />
        </button>
      </motion.div>

      {/* Hero with Parallax */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {blog.coverImage && (
          <>
            <motion.div style={{ y }} className="absolute inset-0">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </>
        )}

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blogs
            </Link>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight max-w-5xl mx-auto">
              {blog.title}
            </h1>

            <div className="flex flex-wrap gap-6 items-center justify-center text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {authorName}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-purple-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 bg-black">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              {blog.content.split('\n\n').map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="mb-6 text-xl leading-relaxed text-gray-300"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 p-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl"
            >
              <p className="text-sm text-gray-400 mb-2">Written by</p>
              <p className="text-2xl font-bold text-white">{authorName}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </article>
  )
}
