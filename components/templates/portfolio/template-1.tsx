"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, ExternalLink, ArrowDown, ArrowRight, Sparkles, BookOpen, Calendar } from "lucide-react"
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

interface Template1Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function Template1({ data, blogs = [], username }: Template1Props) {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="fixed inset-0 -z-10 aurora-bg" />
      <motion.div
        className="fixed top-0 left-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
        animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]"
        animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8 lg:flex-row lg:gap-16"
          >
            {data.profileImage && (
              <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className="relative">
                <div className="relative h-56 w-56 lg:h-72 lg:w-72 overflow-hidden rounded-full shadow-2xl">
                  <Image
                    src={data.profileImage || "/placeholder.svg"}
                    alt={data.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                </div>
                {/* Animated ring */}
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-primary/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                <motion.div
                  className="absolute -inset-8 rounded-full border border-accent/20"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/30 to-accent/30 rounded-full blur-2xl -z-10" />
              </motion.div>
            )}
            <div className="text-center lg:text-left">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
              >
                <Sparkles className="h-4 w-4" />
                {data.availability || "Developer Portfolio"}
              </motion.div>
              <motion.h1 variants={itemVariants} className="mb-4 text-4xl font-bold tracking-tight lg:text-6xl">
                <span className="gradient-text">{data.name || "Your Name"}</span>
              </motion.h1>
              {data.title && (
                <motion.p
                  variants={itemVariants}
                  className="mb-4 text-2xl font-semibold text-primary"
                >
                  {data.title}
                </motion.p>
              )}
              <motion.p
                variants={itemVariants}
                className="mb-6 max-w-xl text-lg text-muted-foreground lg:text-xl leading-relaxed"
              >
                {data.bio || "Your bio here"}
              </motion.p>
              {(data.location || data.email || data.yearsOfExperience) && (
                <motion.div
                  variants={itemVariants}
                  className="mb-8 flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  {data.location && (
                    <div className="glass-card px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <span className="text-primary">📍</span>
                      {data.location}
                    </div>
                  )}
                  {data.yearsOfExperience && (
                    <div className="glass-card px-4 py-2 rounded-full text-sm flex items-center gap-2">
                      <span className="text-primary">💼</span>
                      {data.yearsOfExperience}+ Years Experience
                    </div>
                  )}
                  {data.email && (
                    <a href={`mailto:${data.email}`} className="glass-card px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:border-primary/50 transition-colors">
                      <span className="text-primary">✉️</span>
                      {data.email}
                    </a>
                  )}
                </motion.div>
              )}
              <motion.div variants={itemVariants} className="flex justify-center gap-4 lg:justify-start flex-wrap">
                {data.social.github && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={data.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-2xl p-4 text-foreground hover:text-primary transition-colors shadow-lg"
                  >
                    <Github className="h-6 w-6" />
                  </motion.a>
                )}
                {data.social.linkedin && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={data.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-2xl p-4 text-foreground hover:text-primary transition-colors shadow-lg"
                  >
                    <Linkedin className="h-6 w-6" />
                  </motion.a>
                )}
                {data.social.twitter && (
                  <motion.a
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={data.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-2xl p-4 text-foreground hover:text-primary transition-colors shadow-lg"
                  >
                    <Twitter className="h-6 w-6" />
                  </motion.a>
                )}
                {data.resumeUrl && (
                  <motion.a
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card rounded-2xl px-6 py-4 text-foreground hover:bg-primary hover:text-primary-foreground transition-all shadow-lg font-medium flex items-center gap-2"
                  >
                    <span>Download Resume</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      {data.about && (
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-12 text-center">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="grid lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-2 glass-card rounded-2xl p-8 space-y-6 border border-border/50 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                      <Sparkles className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-foreground">My Story</h3>
                      <p className="text-muted-foreground leading-relaxed">{data.about}</p>
                    </div>
                  </div>
                  {data.resumeUrl && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={data.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      Download Resume
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  )}
                </motion.div>
                <div className="grid gap-4">
                  {data.yearsOfExperience && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                      className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all text-center"
                    >
                      <div className="text-5xl font-black gradient-text mb-2">{data.yearsOfExperience}+</div>
                      <div className="text-sm text-muted-foreground font-medium">Years Experience</div>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all text-center"
                  >
                    <div className="text-5xl font-black gradient-text mb-2">{data.projects.length}+</div>
                    <div className="text-sm text-muted-foreground font-medium">Projects Done</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all text-center"
                  >
                    <div className="text-5xl font-black gradient-text mb-2">{data.skills.length}+</div>
                    <div className="text-sm text-muted-foreground font-medium">Tech Stack</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                My <span className="gradient-text">Skills</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3"
            >
              {data.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="glass-card rounded-full px-5 py-2.5 text-sm font-medium text-foreground border border-border/50 hover:border-primary/50 hover:text-primary transition-all cursor-default shadow-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects.length > 0 && (
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">Some of my recent work that I&apos;m proud of</p>
            </motion.div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {data.projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10">
                    {project.image && (
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        {project.github && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github className="h-5 w-5" />
                          </motion.a>
                        )}
                        {project.live && (
                          <motion.a
                            whileHover={{ scale: 1.1 }}
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </motion.a>
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

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                Work <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">My professional journey and the roles I&apos;ve held</p>
            </motion.div>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {data.experience.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <span className="text-2xl font-black gradient-text">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{exp.position}</h3>
                        <p className="text-primary font-semibold text-sm mb-1">{exp.company}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                <span className="gradient-text">Education</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Academic background and qualifications</p>
            </motion.div>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {data.education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{edu.degree}</h3>
                        <p className="text-primary font-semibold text-sm mb-1">{edu.institution}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{edu.duration}</span>
                        </div>
                      </div>
                    </div>
                    {edu.description && (
                      <p className="text-muted-foreground leading-relaxed text-sm">{edu.description}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                Certifications & <span className="gradient-text">Awards</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Professional certifications and achievements</p>
            </motion.div>
            <div className="max-w-5xl mx-auto">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="glass-card rounded-2xl p-5 border border-border/50 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                          {cert}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blogs Section */}
      {blogs && blogs.length > 0 && (
        <section className="py-20 lg:py-32 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold mb-4">
                Latest <span className="gradient-text">Blogs</span>
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Thoughts, tutorials, and insights I&apos;ve shared
              </p>
            </motion.div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
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
                  <div className="glass-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col">
                    {blog.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          crossOrigin="anonymous"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="h-4 w-4" />
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-3 flex-1">
                        {blog.content.substring(0, 150)}...
                      </p>
                      <Button asChild variant="outline" className="w-full mt-auto">
                        <Link href={`/blog/${blog.slug}`}>
                          <BookOpen className="h-4 w-4 mr-2" />
                          Read Article
                        </Link>
                      </Button>
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
                className="text-center mt-8"
              >
                <Button asChild size="lg" variant="outline">
                  <Link href="/blogs">View All Blogs</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="glass-card border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {data.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
