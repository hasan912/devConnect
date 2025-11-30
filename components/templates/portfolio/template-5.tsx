"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Briefcase, Calendar, ExternalLink } from "lucide-react"
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

interface Template5Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

export default function Template5({ data, blogs = [], username }: Template5Props) {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Side Navigation */}
      <aside className="fixed left-0 top-0 h-screen w-20 bg-neutral-900 dark:bg-neutral-900 flex flex-col items-center py-8 z-50">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
          className="w-12 h-12 rounded-full overflow-hidden mb-8"
        >
          {data.profileImage && data.profileImage.trim() !== "" ? (
            <Image src={data.profileImage} alt={data.name} width={48} height={48} className="object-cover" />
          ) : (
            <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-bold text-xl">
              {data.name.charAt(0).toUpperCase()}
            </div>
          )}
        </motion.div>

        <div className="flex-1 flex flex-col gap-6">
          {data.social.github && (
            <motion.a
              whileHover={{ scale: 1.2 }}
              href={data.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              <Github className="h-5 w-5" />
            </motion.a>
          )}
          {data.social.linkedin && (
            <motion.a
              whileHover={{ scale: 1.2 }}
              href={data.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
          )}
          {data.social.twitter && (
            <motion.a
              whileHover={{ scale: 1.2 }}
              href={data.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition"
            >
              <Twitter className="h-5 w-5" />
            </motion.a>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-20">
        {/* Hero */}
        <section className="min-h-screen flex items-center px-12 lg:px-24">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {data.availability && (
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white dark:bg-neutral-900 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white dark:bg-neutral-900"></span>
                  </span>
                  {data.availability}
                </div>
              )}
              <p className="text-neutral-600 dark:text-neutral-400 mb-4 tracking-widest uppercase text-sm">
                {data.title || "Creative Professional"}
              </p>
              <h1 className="text-7xl lg:text-9xl font-black mb-6 text-neutral-900 dark:text-white">
                {data.name?.split(' ')[0]}<br/>
                <span className="text-neutral-300 dark:text-neutral-700">{data.name?.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl leading-relaxed">
                {data.bio}
              </p>
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
                {data.email && (
                  <a href={`mailto:${data.email}`} className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition">
                    <Mail className="h-4 w-4" />
                    {data.email}
                  </a>
                )}
                {data.phone && (
                  <a href={`tel:${data.phone}`} className="flex items-center gap-2 hover:text-neutral-900 dark:hover:text-white transition">
                    <Phone className="h-4 w-4" />
                    {data.phone}
                  </a>
                )}
                {data.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {data.location}
                  </div>
                )}
                {data.yearsOfExperience && (
                  <div className="flex items-center gap-2 font-medium">
                    💼 {data.yearsOfExperience}+ Years Experience
                  </div>
                )}
              </div>
              {(data.resumeUrl || data.website) && (
                <div className="flex flex-wrap gap-4">
                  {data.resumeUrl && (
                    <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition font-medium">
                      Download Resume
                    </a>
                  )}
                  {data.website && (
                    <a href={data.website} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition font-medium">
                      Visit Website
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* About */}
        {data.about && (
          <section className="py-24 px-12 lg:px-24 bg-neutral-50 dark:bg-neutral-900/50">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl"
            >
              <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">About</h2>
              <p className="text-2xl lg:text-3xl leading-relaxed text-neutral-700 dark:text-neutral-300 font-light">
                {data.about}
              </p>
            </motion.div>
          </section>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <section className="py-24 px-12 lg:px-24">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-12">Experience</h2>
            <div className="space-y-12 max-w-5xl">
              {data.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="grid lg:grid-cols-3 gap-6"
                >
                  <div className="text-neutral-500">
                    <p className="font-mono text-sm">{exp.duration}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">{exp.position}</h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-3">{exp.company}</p>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <section className="py-24 px-12 lg:px-24 bg-neutral-50 dark:bg-neutral-900/50">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-12">Selected Work</h2>
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl">
              {data.projects.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  {project.image && project.image.trim() !== "" ? (
                    <div className="relative h-80 mb-6 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-700"
                      />
                    </div>
                  ) : (
                    <div className="h-80 mb-6 bg-gradient-to-br from-neutral-700 to-neutral-900" />
                  )}
                  <h3 className="text-3xl font-bold mb-3 text-neutral-900 dark:text-white">{project.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="text-xs font-mono text-neutral-500 border border-neutral-300 dark:border-neutral-700 px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                        View Code
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                        Live Site
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <section className="py-24 px-12 lg:px-24">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-12">Skills & Tools</h2>
            <div className="flex flex-wrap gap-4 max-w-4xl">
              {data.skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.03 }}
                  className="text-lg font-light text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 px-6 py-3 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <section className="py-24 px-12 lg:px-24 bg-neutral-50 dark:bg-neutral-900/50">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-12">Education</h2>
            <div className="space-y-10 max-w-4xl">
              {data.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-b border-neutral-200 dark:border-neutral-800 pb-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">{edu.degree}</h3>
                    <span className="text-neutral-500 font-mono text-sm">{edu.duration}</span>
                  </div>
                  <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-2">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-neutral-600 dark:text-neutral-400">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="py-24 px-12 lg:px-24">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-12">Certifications</h2>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
              {data.certifications.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="border border-neutral-300 dark:border-neutral-700 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition"
                >
                  <p className="font-medium text-neutral-900 dark:text-white">{cert}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Blogs */}
        {blogs && blogs.length > 0 && (
          <section className="py-24 px-12 lg:px-24 bg-neutral-50 dark:bg-neutral-900/50">
            <h2 className="text-sm uppercase tracking-widest text-neutral-500 mb-12">Latest Writing</h2>
            <div className="space-y-8 max-w-4xl">
              {blogs.slice(0, 5).map((blog, idx) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link href={`/blog/${blog.slug}`} className="group block border-b border-neutral-200 dark:border-neutral-800 pb-6">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition">
                      {blog.title}
                    </h3>
                    <p className="text-neutral-500 text-sm font-mono">{new Date(blog.createdAt).toLocaleDateString()}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 px-12 lg:px-24 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} {data.name}</p>
        </footer>
      </main>
    </div>
  )
}
