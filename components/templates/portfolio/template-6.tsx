"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, ArrowRight, Star, Zap, Target } from "lucide-react"
import type { PortfolioData } from "@/lib/get-user-data"
import { motion, useAnimation } from "framer-motion"
import { useEffect } from "react"

interface SerializedBlog {
  id: string
  uid: string
  title: string
  content: string
  coverImage: string | null
  slug: string
  createdAt: string
}

interface Template6Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

export default function Template6({ data, blogs = [], username }: Template6Props) {
  const controls = useAnimation()

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }))
  }, [controls])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-pink-50 dark:from-orange-950 dark:via-rose-950 dark:to-pink-950">
      {/* Floating Nav */}
      <nav className="fixed top-8 right-8 z-50">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl flex gap-4"
        >
          {data.social.github && (
            <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">
              <Github className="h-5 w-5" />
            </a>
          )}
          {data.social.linkedin && (
            <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {data.social.twitter && (
            <a href={data.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition">
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {data.availability ? (
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="h-4 w-4" />
                {data.availability}
              </motion.div>
            ) : (
              <motion.div
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="h-4 w-4" />
                Available for work
              </motion.div>
            )}

            <h1 className="text-6xl lg:text-8xl font-black mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-rose-600 to-pink-600">
                {data.name}
              </span>
            </h1>

            {data.title && (
              <p className="text-2xl font-semibold text-neutral-700 dark:text-neutral-300 mb-4">
                {data.title}
              </p>
            )}

            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              {data.bio}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {data.yearsOfExperience && (
                <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-orange-200 dark:border-orange-900">
                  <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 mb-1">{data.yearsOfExperience}+</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">Years</div>
                </div>
              )}
              <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-orange-200 dark:border-orange-900">
                <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 mb-1">{data.projects.length}+</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Projects</div>
              </div>
              <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-orange-200 dark:border-orange-900">
                <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 mb-1">{data.skills.length}+</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Skills</div>
              </div>
              {data.certifications && (
                <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-orange-200 dark:border-orange-900">
                  <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 mb-1">{data.certifications.length}+</div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">Certs</div>
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full font-semibold shadow-2xl shadow-orange-500/30 flex items-center gap-2"
            >
              Let's Work Together
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-[3rem] blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl">
                <Image src={data.profileImage} alt={data.name} fill className="object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      {data.yearsOfExperience && (
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, label: "Years Experience", value: data.yearsOfExperience },
              { icon: Target, label: "Projects Completed", value: data.projects?.length || 0 },
              { icon: Star, label: "Skills Mastered", value: data.skills?.length || 0 }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600 mb-2">
                  {stat.value}+
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600"
            >
              Expertise
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-4">
              {data.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl p-6 text-center font-bold text-neutral-800 dark:text-neutral-200 shadow-lg"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600"
            >
              Featured Work
            </motion.h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {data.projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl"
                >
                  {project.image && project.image.trim() !== "" ? (
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-orange-400 via-pink-400 to-rose-400" />
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-neutral-900 dark:text-white">{project.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 rounded-full text-xs font-semibold text-orange-700 dark:text-orange-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-semibold">
                          View Code →
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline font-semibold">
                          Live Demo →
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

      {/* Blogs */}
      {blogs && blogs.length > 0 && (
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-pink-600"
            >
              Latest Articles
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6">
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
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">
                      {blog.coverImage && blog.coverImage.trim() !== "" ? (
                        <div className="relative h-48 overflow-hidden">
                          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover group-hover:scale-110 transition duration-300" />
                        </div>
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-orange-400 to-pink-500" />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-orange-600 transition">{blog.title}</h3>
                        <p className="text-sm text-neutral-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
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
      <footer className="py-12 text-center">
        <p className="text-neutral-600 dark:text-neutral-400">
          © {new Date().getFullYear()} {data.name}. Made with ❤️
        </p>
      </footer>
    </div>
  )
}
