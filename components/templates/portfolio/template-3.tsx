"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, MapPin, Briefcase, GraduationCap, Award, ExternalLink, Calendar, BookOpen } from "lucide-react"
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

interface Template3Props {
  data: PortfolioData
  blogs?: SerializedBlog[]
  username?: string
}

export default function Template3({ data, blogs = [], username }: Template3Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Hero with Cover */}
      <section className="relative">
        {data.coverImage && data.coverImage.trim() !== "" ? (
          <div className="absolute inset-0 h-80">
            <Image src={data.coverImage} alt="Cover" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-950" />
          </div>
        ) : (
          <div className="absolute inset-0 h-80 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500" />
        )}
        
        <div className="container mx-auto px-4 pt-10 pb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-white dark:ring-slate-900 shadow-2xl">
                  {data.profileImage && data.profileImage.trim() !== "" ? (
                    <Image src={data.profileImage} alt={data.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
                      {data.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Info */}
              <div className="flex-1">
                {data.availability && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    {data.availability}
                  </motion.div>
                )}
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold mb-2 text-slate-900 dark:text-white"
                >
                  {data.name}
                </motion.h1>
                
                {data.title && (
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-blue-600 dark:text-blue-400 mb-3 font-medium"
                  >
                    {data.title}
                  </motion.p>
                )}

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-slate-600 dark:text-slate-300 mb-4"
                >
                  {data.bio}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-400 mb-4"
                >
                  {data.location && (
                    <span className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1 rounded-full">
                      <MapPin className="h-4 w-4" />
                      {data.location}
                    </span>
                  )}
                  {data.email && (
                    <a href={`mailto:${data.email}`} className="flex items-center gap-1 hover:text-blue-600 bg-white dark:bg-slate-800 px-3 py-1 rounded-full">
                      <Mail className="h-4 w-4" />
                      {data.email}
                    </a>
                  )}
                  {data.phone && (
                    <a href={`tel:${data.phone}`} className="flex items-center gap-1 hover:text-blue-600 bg-white dark:bg-slate-800 px-3 py-1 rounded-full">
                      📱 {data.phone}
                    </a>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-3 items-center flex-wrap"
                >
                  {data.social.github && (
                    <a href={data.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition">
                      <Github className="h-5 w-5" />
                    </a>
                  )}
                  {data.social.linkedin && (
                    <a href={data.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {data.social.twitter && (
                    <a href={data.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition">
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {data.resumeUrl && (
                    <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                      Resume
                    </a>
                  )}
                  {data.website && (
                    <a href={data.website} target="_blank" rel="noopener noreferrer" className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition text-sm font-medium">
                      Website
                    </a>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {data.about && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">About Me</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{data.about}</p>
                  </div>
                </div>
                {data.resumeUrl && (
                  <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition font-medium">
                    Download Resume
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </motion.div>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg border border-slate-200/50 dark:border-slate-700/50"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {data.experience.map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="border-l-4 border-blue-600 pl-6 hover:border-indigo-600 transition"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{exp.position}</h3>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">{exp.duration}</span>
                      </div>
                      <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{exp.company}</p>
                      <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Featured Projects</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.projects.slice(0, 4).map((project, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5 }}
                      className="group border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition"
                    >
                      {project.image && project.image.trim() !== "" ? (
                        <div className="relative h-40 overflow-hidden">
                          <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition duration-300" />
                        </div>
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-blue-400 to-indigo-500" />
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 text-slate-900 dark:text-white">{project.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex gap-2">
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 shadow-lg text-white"
            >
              <div className="grid grid-cols-2 gap-4">
                {data.yearsOfExperience && (
                  <div>
                    <div className="text-3xl font-bold">{data.yearsOfExperience}+</div>
                    <div className="text-sm opacity-90">Years Exp</div>
                  </div>
                )}
                <div>
                  <div className="text-3xl font-bold">{data.projects.length}+</div>
                  <div className="text-sm opacity-90">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">{data.skills.length}+</div>
                  <div className="text-sm opacity-90">Skills</div>
                </div>
                {data.certifications && (
                  <div>
                    <div className="text-3xl font-bold">{data.certifications.length}+</div>
                    <div className="text-sm opacity-90">Certs</div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Education
                </h3>
                <div className="space-y-4">
                  {data.education.map((edu, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{edu.degree}</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{edu.institution}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{edu.duration}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                  <Award className="h-5 w-5 text-blue-600" />
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.certifications.map((cert, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Blogs */}
        {blogs && blogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mt-12 bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Latest Blogs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl transition">
                    {blog.coverImage && blog.coverImage.trim() !== "" ? (
                      <div className="relative h-40 overflow-hidden">
                        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover group-hover:scale-110 transition duration-300" />
                      </div>
                    ) : (
                      <div className="h-40 bg-gradient-to-br from-blue-400 to-purple-500" />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition">{blog.title}</h3>
                      <p className="text-sm text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
