"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, ExternalLink, ArrowRight, ArrowDown, BookOpen, Calendar } from "lucide-react"
import type { PortfolioData } from "@/lib/get-user-data"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface SerializedBlog {
  id: string
  uid: string
  title: string
  content: string
  coverImage: string | null
  slug: string
  createdAt: string
}

interface Template2Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

export default function Template2({ data, blogs = [], username }: Template2Props) {
  return (
    <div className="min-h-screen bg-foreground text-background ">
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[150px]"
          animate={{ scale: [1, 1.2, 1], x: [-50, 50, -50] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/30 rounded-full blur-[120px]"
          animate={{ scale: [1.2, 1, 1.2], y: [50, -50, 50] }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-background/10 bg-foreground/80 backdrop-blur-xl"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            {data.name?.split(" ")[0] || "Portfolio"}
          </motion.span>
          <div className="flex gap-4">
            {data.social.github && (
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href={data.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </motion.a>
            )}
            {data.social.linkedin && (
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href={data.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
            )}
            {data.social.twitter && (
              <motion.a
                whileHover={{ scale: 1.2, y: -2 }}
                href={data.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/70 transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="flex min-h-screen items-center pt-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              {data.availability && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-medium"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {data.availability}
                </motion.div>
              )}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4 text-sm font-medium uppercase tracking-widest text-primary"
              >
                Developer
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-4 text-5xl font-bold leading-tight lg:text-7xl"
              >
                {data.name || "Your Name"}
              </motion.h1>
              {data.title && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6 text-2xl font-semibold text-primary"
                >
                  {data.title}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-6 max-w-lg text-lg text-background/80 leading-relaxed"
              >
                {data.bio || "Your bio here"}
              </motion.p>
              {(data.location || data.email || data.yearsOfExperience) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8 flex flex-wrap gap-3"
                >
                  {data.location && (
                    <div className="bg-background/10 backdrop-blur-sm border border-background/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <span>📍</span>
                      {data.location}
                    </div>
                  )}
                  {data.yearsOfExperience && (
                    <div className="bg-background/10 backdrop-blur-sm border border-background/20 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <span>💼</span>
                      {data.yearsOfExperience}+ Years
                    </div>
                  )}
                  {data.email && (
                    <a href={`mailto:${data.email}`} className="bg-background/10 backdrop-blur-sm border border-background/20 px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-background/20 transition-colors">
                      <span>✉️</span>
                      {data.email}
                    </a>
                  )}
                </motion.div>
              )}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, gap: "1rem" }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-sm font-medium text-foreground transition-all shadow-lg shadow-primary/25"
              >
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.a>
            </motion.div>
           {data.profileImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto aspect-square w-full max-w-md"
            >
              <div className="relative rounded-3xl overflow-hidden">
                
                <Image
                  src={data.profileImage || "/placeholder.svg"}
                  alt={data.name}
                  fill
                  className="object-cover transition-all duration-500 hover:scale-105"
                  unoptimized
                />
              </div>
              {/* Decorative elements */}
              <motion.div
                className="absolute -inset-4 rounded-3xl border-2 border-primary/30"
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
              />
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
           )}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
            <ArrowDown className="h-6 w-6 text-background/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* About & Skills */}
      <section className="border-t border-background/10 py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2">
            {data.about && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-primary">About</h2>
                <p className="text-xl leading-relaxed text-background/80">{data.about}</p>
              </motion.div>
            )}
            {data.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-primary">Expertise</h2>
                <div className="flex flex-wrap gap-3">
                  {data.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.1, borderColor: "var(--primary)" }}
                      className="rounded-full border border-background/20 px-5 py-2 text-sm text-background/80 transition-all cursor-default hover:text-primary"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      {data.projects.length > 0 && (
        <section id="projects" className="border-t border-background/10 py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-sm font-medium uppercase tracking-widest text-primary"
            >
              Selected Work
            </motion.h2>
            <div className="space-y-32">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid items-center gap-12 grid-cols-2 lg:grid-cols-1 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {project.image && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`relative aspect-video overflow-hidden rounded-2xl bg-background/5 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                    </motion.div>
                  )}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <motion.h3
                      whileHover={{ x: 10 }}
                      className="mb-4 text-3xl font-bold hover:text-primary transition-colors cursor-default"
                    >
                      {project.title}
                    </motion.h3>
                    <p className="mb-6 text-background/70 leading-relaxed">{project.description}</p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="text-sm text-primary/80">
                          {tech}
                          {i < project.techStack.length - 1 && " •"}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-primary"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </motion.a>
                      )}
                      {project.live && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-primary"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="border-t border-background/10 py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-sm font-medium uppercase tracking-widest text-primary"
            >
              Work Experience
            </motion.h2>
            <div className=" space-y-8">
              {data.experience.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-2 border-primary/30 pl-6 hover:border-primary transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{exp.position}</h3>
                    <span className="text-sm text-background/60">{exp.duration}</span>
                  </div>
                  <p className="text-primary font-medium mb-3">{exp.company}</p>
                  <p className="text-background/80 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="border-t border-background/10 py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-sm font-medium uppercase tracking-widest text-primary"
            >
              Education
            </motion.h2>
            <div className=" space-y-8">
              {data.education.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="border-l-2 border-accent/30 pl-6 hover:border-accent transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{edu.degree}</h3>
                    <span className="text-sm text-background/60">{edu.duration}</span>
                  </div>
                  <p className="text-accent font-medium mb-2">{edu.institution}</p>
                  {edu.description && (
                    <p className="text-background/80 leading-relaxed">{edu.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="border-t border-background/10 py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-sm font-medium uppercase tracking-widest text-primary"
            >
              Certifications & Awards
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 mx-auto justify-center"
            >
              {data.certifications.map((cert, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-background/10 backdrop-blur-sm border border-background/20 rounded-full text-sm font-medium hover:bg-background/20 transition-all"
                >
                  {cert}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {blogs && blogs.length > 0 && (
        <section className="border-t border-background/10 py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-sm font-medium uppercase tracking-widest text-primary"
            >
              Latest Articles
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.slice(0, 6).map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="h-full flex flex-col rounded-2xl border border-background/10 overflow-hidden bg-background/5 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    {blog.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-background/50 mb-3">
                        <Calendar className="h-4 w-4" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="mb-4 text-sm text-background/70 line-clamp-3 flex-1">
                        {blog.content.substring(0, 150)}...
                      </p>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all"
                      >
                        Read Article
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {blogs.length > 6 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12"
              >
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 rounded-full border border-background/20 px-8 py-3 text-sm font-medium transition-all hover:border-primary hover:text-primary"
                >
                  View All Blogs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-background/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-background/50">
            © {new Date().getFullYear()} {data.name}. Built with passion.
          </p>
        </div>
      </footer>
    </div>
  )
}
