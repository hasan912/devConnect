"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Eye } from "lucide-react"
import type { BlogData } from "@/services/blog-service"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface BlogTemplate8Props {
  blog: BlogData
  authorName: string
}

export default function BlogTemplate8({ blog, authorName }: BlogTemplate8Props) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  const formattedDate = blog.createdAt?.toDate
    ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown date"

  return (
    <article ref={containerRef} className="min-h-screen bg-zinc-950 text-white">
      {/* Floating Header */}
      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {Math.ceil(scrollYProgress.get() * 100)}%
            </span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {blog.coverImage && (
          <>
            <div className="absolute inset-0">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/80 to-zinc-950" />
          </>
        )}

        <div className="relative z-10 container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition"
              >
                <ArrowLeft className="h-4 w-4" />
                All Articles
              </Link>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight"
            >
              {blog.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 items-center justify-center text-sm text-zinc-400"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                  {authorName.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-white">{authorName}</p>
                  <p className="text-xs">{formattedDate}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex items-center justify-center"
          >
            <motion.div
              className="w-1.5 h-2 bg-purple-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative bg-zinc-950">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {/* Featured Image Section */}
            {blog.coverImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative h-[600px] rounded-3xl overflow-hidden mb-16"
              >
                <Image
                  src={blog.coverImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              </motion.div>
            )}

            {/* Article Text */}
            <div className="prose prose-xl prose-invert max-w-none
              prose-headings:font-black prose-headings:text-white prose-headings:mb-8
              prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-8
              prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300
              prose-strong:text-white
              prose-code:text-purple-400 prose-code:bg-purple-900/20 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-zinc-400">
              {blog.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <motion.h2
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="text-4xl font-black mt-20 mb-8"
                    >
                      {paragraph.replace('# ', '')}
                    </motion.h2>
                  )
                }
                return (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl leading-relaxed mb-8 first-letter:text-7xl first-letter:font-black first-letter:text-purple-500 first-letter:mr-3 first-letter:float-left first-letter:leading-none"
                  >
                    {paragraph}
                  </motion.p>
                )
              })}
            </div>

            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-24 p-12 bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-3xl"
            >
              <p className="text-sm uppercase tracking-wider text-zinc-500 mb-4">Written By</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-black text-2xl">
                  {authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{authorName}</p>
                  <p className="text-zinc-400">{formattedDate}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center text-zinc-600">
          <p>© {new Date().getFullYear()} DevConnect. All rights reserved.</p>
        </div>
      </footer>
    </article>
  )
}
