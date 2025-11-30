"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Download, Sparkles, Code2, Rocket, Zap } from "lucide-react"
import type { PortfolioData } from "@/lib/get-user-data"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

interface SerializedBlog {
  id: string
  uid: string
  title: string
  content: string
  coverImage: string | null
  slug: string
  createdAt: string
}

interface Template4Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

export default function Template4({ data, blogs = [], username }: Template4Props) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div ref={ref} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div style={{ y }} className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            {data.availability && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-cyan-500/30 text-cyan-300 text-sm font-medium backdrop-blur-sm"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
                </span>
                {data.availability}
              </motion.div>
            )}
            {/* Profile Image with Glow */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="mb-8 inline-block relative"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-cyan-500/50 relative">
                {data.profileImage && data.profileImage.trim() !== "" ? (
                  <Image src={data.profileImage} alt={data.name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white text-5xl font-bold">
                    {data.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 blur-2xl -z-10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 flex items-center justify-center gap-2 text-cyan-400"
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-mono uppercase tracking-wider">
                {data.title || "Developer & Designer"}
              </span>
              <Sparkles className="h-5 w-5" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-6xl md:text-8xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
            >
              {data.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              {data.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex gap-4 justify-center mb-8"
            >
              {data.social.github && (
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href={data.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
              )}
              {data.social.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href={data.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center"
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
              )}
              {data.social.twitter && (
                <motion.a
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  href={data.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center"
                >
                  <Twitter className="h-6 w-6" />
                </motion.a>
              )}
            </motion.div>

            {data.resumeUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition"
                >
                  <Download className="h-5 w-5" />
                  Download Resume
                </a>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1 h-2 bg-cyan-500 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Tech Arsenal
              </h2>
              <p className="text-gray-400">Weapons I use to build amazing things</p>
            </motion.div>

            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 text-center font-semibold"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Epic Projects
              </h2>
              <p className="text-gray-400">Building the future, one project at a time</p>
            </motion.div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              {data.projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden"
                >
                  {project.image && project.image.trim() !== "" ? (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    </div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-500" />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-purple-600/50 hover:bg-purple-600 rounded-lg transition flex items-center gap-2"
                        >
                          <Code2 className="h-4 w-4" />
                          Code
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-cyan-600/50 hover:bg-cyan-600 rounded-lg transition flex items-center gap-2"
                        >
                          <Rocket className="h-4 w-4" />
                          Live
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {blogs && blogs.length > 0 && (
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Latest Thoughts
              </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/blog/${blog.slug}`} className="block group">
                    <div className="bg-gradient-to-br from-purple-900/20 to-cyan-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
                      {blog.coverImage && blog.coverImage.trim() !== "" ? (
                        <div className="relative h-48 overflow-hidden">
                          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover group-hover:scale-110 transition duration-300" />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-purple-500 to-cyan-500" />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-cyan-400 transition">{blog.title}</h3>
                        <p className="text-sm text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} {data.name}. Crafted with <span className="text-purple-400">passion</span>.</p>
        </div>
      </footer>
    </div>
  )
}
