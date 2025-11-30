"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Palette, FileText, Sparkles, Zap, Globe, Shield, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const floatVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 aurora-bg" />
      <div className="fixed inset-0 -z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-blob"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob"
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-secondary/30 rounded-full blur-3xl animate-blob"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, delay: 4 }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="relative">
              <Code2 className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">DevFolio</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button
                variant="ghost"
                className="font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="font-medium bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32">
        <div className="container mx-auto px-4">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 animate-pulse" />
              Build your developer presence
              <ChevronRight className="h-4 w-4" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mx-auto mb-6 max-w-5xl text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl"
            >
              Create{" "}
              <span className="relative">
                <span className="gradient-text">stunning portfolios</span>
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              <br />& blogs in minutes
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl leading-relaxed"
            >
              Choose from beautiful templates, customize your content, and share your work with the world.{" "}
              <span className="text-foreground font-medium">No coding required.</span>
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 200, 200, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300"
                  >
                    Start Building
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
              <Link href="/u/demo">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 bg-transparent"
                  >
                    View Demo
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Floating Elements */}
          <div className="relative mt-20 flex justify-center">
            <motion.div variants={floatVariants} animate="animate" className="absolute -left-10 top-10 hidden lg:block">
              <div className="glass-card rounded-2xl p-4 shadow-xl">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
            </motion.div>
            <motion.div
              variants={floatVariants}
              animate="animate"
              style={{ animationDelay: "1s" }}
              className="absolute -right-10 top-20 hidden lg:block"
            >
              <div className="glass-card rounded-2xl p-4 shadow-xl">
                <Palette className="h-8 w-8 text-accent" />
              </div>
            </motion.div>

            {/* Hero Image/Preview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative w-full max-w-4xl"
            >
              <div className="glass-card rounded-3xl p-2 shadow-2xl">
                <div className="rounded-2xl bg-gradient-to-br from-background to-secondary/50 p-8 aspect-video flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                        className="glass-card rounded-xl p-4 aspect-square flex flex-col items-center justify-center gap-2"
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-accent/50" />
                        <div className="w-full h-2 rounded bg-muted" />
                        <div className="w-2/3 h-2 rounded bg-muted" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10K+", label: "Developers" },
                { value: "50K+", label: "Portfolios Created" },
                { value: "99%", label: "Satisfaction Rate" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything you need to <span className="gradient-text">shine</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Powerful tools designed to help developers showcase their work beautifully
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Palette,
                title: "Beautiful Templates",
                description: "Choose from professionally designed templates that showcase your work perfectly.",
                color: "from-primary to-cyan-400",
              },
              {
                icon: FileText,
                title: "Blog Integration",
                description: "Share your thoughts and tutorials with an integrated blog that matches your portfolio.",
                color: "from-accent to-orange-400",
              },
              {
                icon: Code2,
                title: "Project Showcase",
                description: "Highlight your best projects with rich descriptions, tech stacks, and live demos.",
                color: "from-emerald-500 to-teal-400",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for performance with instant loading and smooth animations.",
                color: "from-yellow-500 to-amber-400",
              },
              {
                icon: Globe,
                title: "Custom Domain",
                description: "Use your own domain or get a free subdomain to share your portfolio.",
                color: "from-blue-500 to-indigo-400",
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your data is protected with enterprise-grade security and privacy controls.",
                color: "from-rose-500 to-pink-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group"
              >
                <div className="glass-card rounded-2xl p-8 h-full border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </motion.div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">developers</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "DevFolio helped me land my dream job. The templates are beautiful and so easy to customize!",
                author: "Sarah Chen",
                role: "Frontend Developer",
              },
              {
                quote: "I built my portfolio in 30 minutes. The blog feature is amazing for sharing my learnings.",
                author: "Alex Kumar",
                role: "Full Stack Engineer",
              },
              {
                quote: "Finally a portfolio builder that actually looks professional. Highly recommended!",
                author: "Maria Garcia",
                role: "UI/UX Designer",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card rounded-2xl p-8 border border-border/50"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-gradient" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent)]" />

            <div className="relative px-8 py-20 md:py-28 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                Ready to build your portfolio?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-white/90 text-lg mb-10 max-w-xl mx-auto"
              >
                Join thousands of developers showcasing their work. Get started for free today.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="text-lg px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-xl">
                      Get Started for Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 glass-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="font-bold gradient-text">DevFolio</span>
            </div>
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} DevFolio. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
