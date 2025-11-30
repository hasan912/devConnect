"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Code, Coffee, Heart } from "lucide-react"
import type { PortfolioData } from "@/lib/get-user-data"
import { motion } from "framer-motion"

interface SerializedBlog {
  id: string
  uid: string
  title: string
  content: string
  coverImage: string | null
  slug: string
  createdAt: string
}

interface Template7Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

export default function Template7({ data, blogs = [], username }: Template7Props) {
  return (
    <div className="min-h-screen bg-emerald-950 text-emerald-50">
      {/* Terminal Header */}
      <div className="border-b border-emerald-800">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 font-mono text-sm text-emerald-400">~/{data.name?.toLowerCase().replace(' ', '-')}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-16"
        >
          <div className="font-mono space-y-2 text-sm md:text-base">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-emerald-400"
            >
              <span className="text-emerald-600">$</span> cat introduction.txt
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pl-4 space-y-4 text-emerald-200"
            >
              {data.availability && (
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded bg-emerald-900/50 border border-emerald-700 text-emerald-300 text-sm font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  {data.availability}
                </div>
              )}
              <div className="flex gap-4 items-center mb-8">
                <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-emerald-700">
                  {data.profileImage && data.profileImage.trim() !== "" ? (
                    <Image src={data.profileImage} alt={data.name} width={96} height={96} className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white text-3xl font-bold font-mono">
                      {data.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-emerald-300">{data.name}</h1>
                  {data.title && <p className="text-xl text-emerald-500 mt-1">{data.title}</p>}
                </div>
              </div>
              
              <p className="leading-relaxed max-w-3xl">{data.bio}</p>
              
              {data.about && (
                <p className="leading-relaxed border-l-2 border-emerald-700 pl-4 mt-4">
                  {data.about}
                </p>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="text-emerald-400 mt-6"
            >
              <span className="text-emerald-600">$</span> <span className="animate-pulse">_</span>
            </motion.p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            {data.yearsOfExperience && (
              <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
                <div className="text-3xl font-bold text-emerald-300 mb-1">{data.yearsOfExperience}+</div>
                <div className="text-sm text-emerald-500">Years_Exp</div>
              </div>
            )}
            <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-1">{data.projects.length}+</div>
              <div className="text-sm text-emerald-500">Projects</div>
            </div>
            <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-1">{data.skills.length}+</div>
              <div className="text-sm text-emerald-500">Skills</div>
            </div>
            {data.certifications && (
              <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
                <div className="text-3xl font-bold text-emerald-300 mb-1">{data.certifications.length}+</div>
                <div className="text-sm text-emerald-500">Certificates</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-16 font-mono text-sm"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + idx * 0.05 }}
                  className="flex items-center gap-2 text-emerald-300"
                >
                  <span className="text-emerald-600">▸</span>
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            {data.yearsOfExperience && (
              <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
                <div className="text-3xl font-bold text-emerald-300 mb-1">{data.yearsOfExperience}+</div>
                <div className="text-sm text-emerald-500">Years_Exp</div>
              </div>
            )}
            <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-1">{data.projects.length}+</div>
              <div className="text-sm text-emerald-500">Projects</div>
            </div>
            <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-1">{data.skills.length}+</div>
              <div className="text-sm text-emerald-500">Skills</div>
            </div>
            {data.certifications && (
              <div className="border border-emerald-800 rounded-lg p-4 bg-emerald-950/50 text-center">
                <div className="text-3xl font-bold text-emerald-300 mb-1">{data.certifications.length}+</div>
                <div className="text-sm text-emerald-500">Certificates</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 }}
              className="font-mono text-sm text-emerald-400 mb-6"
            >
              <span className="text-emerald-600">$</span> cat projects.json
            </motion.p>

            <div className="space-y-8">
              {data.projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border border-emerald-800 rounded-lg p-6 bg-emerald-950/50 hover:bg-emerald-900/30 transition"
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    {project.image && project.image.trim() !== "" ? (
                      <div className="relative h-48 lg:h-full rounded-lg overflow-hidden border border-emerald-800">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-48 lg:h-full rounded-lg border border-emerald-800 bg-gradient-to-br from-emerald-700 to-emerald-900" />
                    )}
                    <div className={project.image ? "lg:col-span-2" : "lg:col-span-3"}>
                      <h3 className="text-2xl font-bold text-emerald-300 mb-2 font-mono">{project.title}</h3>
                      <p className="text-emerald-200 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="px-3 py-1 bg-emerald-900/50 border border-emerald-700 rounded text-xs font-mono text-emerald-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4 font-mono text-sm">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                            <Github className="h-4 w-4" /> Code
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                            <Code className="h-4 w-4" /> Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-sm text-emerald-400 mb-6"
            >
              <span className="text-emerald-600">$</span> git log --experience
            </motion.p>

            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-2 border-emerald-700 pl-6"
                >
                  <p className="font-mono text-xs text-emerald-600 mb-1">{exp.duration}</p>
                  <h3 className="text-xl font-bold text-emerald-300">{exp.position}</h3>
                  <p className="text-emerald-500 mb-2">{exp.company}</p>
                  <p className="text-emerald-200 text-sm">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Blogs */}
        {blogs && blogs.length > 0 && (
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-mono text-sm text-emerald-400 mb-6"
            >
              <span className="text-emerald-600">$</span> ls ./blog/
            </motion.p>

            <div className="space-y-3">
              {blogs.slice(0, 5).map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/blog/${blog.slug}`} className="block hover:bg-emerald-900/30 p-3 rounded transition font-mono">
                    <span className="text-emerald-600">▸</span>{' '}
                    <span className="text-emerald-300 hover:text-emerald-200">{blog.title}</span>
                    <span className="text-emerald-700 text-xs ml-3">{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono"
        >
          <p className="text-sm text-emerald-400 mb-4">
            <span className="text-emerald-600">$</span> connect --social
          </p>
          <div className="flex gap-6 pl-4">
            {data.social.github && (
              <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition">
                <Github className="h-6 w-6" />
              </a>
            )}
            {data.social.linkedin && (
              <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition">
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {data.social.twitter && (
              <a href={data.social.twitter} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition">
                <Twitter className="h-6 w-6" />
              </a>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-emerald-800 font-mono text-sm text-emerald-600 flex items-center gap-2"
        >
          <Coffee className="h-4 w-4" />
          <span>Made with</span>
          <Heart className="h-4 w-4 text-red-500" />
          <span>by {data.name}</span>
        </motion.div>
      </div>
    </div>
  )
}
