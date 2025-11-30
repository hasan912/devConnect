"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Send, Award, Briefcase } from "lucide-react"
import type { PortfolioData } from "@/lib/get-user-data"
import { motion, useScroll, useTransform } from "framer-motion"
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

interface Template8Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

export default function Template8({ data, blogs = [], username }: Template8Props) {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  return (
    <div ref={targetRef} className="bg-zinc-950">
      {/* Fixed Hero */}
      <motion.div 
        style={{ opacity, scale }}
        className="h-screen  sticky top-10 flex items-center justify-center text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.15),transparent_50%)]" />
        <div className="text-center z-10 px-4">
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl md:text-9xl font-black mb-6 tracking-tighter"
          >
            {data.name}
          </motion.h1>

          {data.title && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl md:text-3xl text-purple-400 mb-8 font-light"
            >
              {data.title}
            </motion.p>
          )}

          {data.availability && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 text-purple-300 text-sm font-bold"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-400"></span>
              </span>
              {data.availability}
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12"
          >
            {data.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto"
          >
            {data.yearsOfExperience && (
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-4 border border-purple-500/20 text-center">
                <div className="text-3xl font-black text-purple-400 mb-1">{data.yearsOfExperience}+</div>
                <div className="text-xs text-zinc-500">Years Experience</div>
              </div>
            )}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-4 border border-purple-500/20 text-center">
              <div className="text-3xl font-black text-purple-400 mb-1">{data.projects.length}+</div>
              <div className="text-xs text-zinc-500">Projects</div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-4 border border-purple-500/20 text-center">
              <div className="text-3xl font-black text-purple-400 mb-1">{data.skills.length}+</div>
              <div className="text-xs text-zinc-500">Skills</div>
            </div>
            {data.certifications && (
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-4 border border-purple-500/20 text-center">
                <div className="text-3xl font-black text-purple-400 mb-1">{data.certifications.length}+</div>
                <div className="text-xs text-zinc-500">Certificates</div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex gap-6 justify-center"
          >
            {data.social.github && (
              <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-purple-600 transition">
                <Github className="h-6 w-6" />
              </a>
            )}
            {data.social.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-purple-600 transition">
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {data.social.twitter && (
              <a href={data.social.twitter} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-purple-600 transition">
                <Twitter className="h-6 w-6" />
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative bg-zinc-950 z-10">
        {/* About */}
        {data.about && (
          <section className="py-32 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-6xl font-black mb-12 text-white">About</h2>
                <p className="text-2xl leading-relaxed text-zinc-400">{data.about}</p>
              </motion.div>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="py-32 px-4 bg-zinc-900/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-6xl font-black mb-20 text-white text-center">Journey</h2>
              <div className="space-y-16">
                {data.experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                  >
                    <div className={idx % 2 === 0 ? "md:order-1" : "md:order-2"}>
                      <div className="p-8 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl border border-purple-500/20">
                        <Briefcase className="h-12 w-12 text-purple-400 mb-4" />
                        <h3 className="text-3xl font-bold text-white mb-2">{exp.position}</h3>
                        <p className="text-xl text-purple-400 mb-2">{exp.company}</p>
                        <p className="text-sm text-zinc-500 mb-4">{exp.duration}</p>
                        <p className="text-zinc-400 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                    <div className={idx % 2 === 0 ? "md:order-2" : "md:order-1"}>
                      <div className="text-9xl font-black text-purple-900/30 text-center">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-6xl font-black mb-20 text-white text-center">Arsenal</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {data.skills.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.03 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-purple-500/20 flex items-center justify-center p-4 text-center font-bold text-white"
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
          <section className="py-32 px-4 bg-zinc-900/50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-6xl font-black mb-20 text-white text-center">Creations</h2>
              <div className="grid lg:grid-cols-2 gap-12">
                {data.projects.map((project, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-3xl border border-purple-500/20 overflow-hidden">
                      {project.image && project.image.trim() !== "" ? (
                        <div className="relative h-80 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-110 transition duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60" />
                        </div>
                      ) : (
                        <div className="h-80 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500" />
                      )}
                      <div className="p-8">
                        <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
                        <p className="text-zinc-400 mb-6 leading-relaxed">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.techStack.map((tech, i) => (
                            <span key={i} className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition flex items-center gap-2 text-white">
                              <Github className="h-4 w-4" />
                              Code
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full font-semibold transition flex items-center gap-2 text-white">
                              <Send className="h-4 w-4" />
                              Live
                            </a>
                          )}
                        </div>
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
          <section className="py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-6xl font-black mb-20 text-white text-center">Writings</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.slice(0, 6).map((blog, idx) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${blog.slug}`} className="block group">
                      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-500/20 overflow-hidden">
                        {blog.coverImage && blog.coverImage.trim() !== "" ? (
                          <div className="relative h-48 overflow-hidden">
                            <Image src={blog.coverImage} alt={blog.title} fill className="object-cover group-hover:scale-110 transition duration-500" />
                          </div>
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500" />
                        )}
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-white line-clamp-2 group-hover:text-purple-400 transition">{blog.title}</h3>
                          <p className="text-sm text-zinc-500">{new Date(blog.createdAt).toLocaleDateString()}</p>
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
        <footer className="py-12 text-center border-t border-zinc-800">
          <p className="text-zinc-600">© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}
