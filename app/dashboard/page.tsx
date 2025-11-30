"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useUser } from "@/hooks/use-user"
import { User, FolderKanban, FileText, ExternalLink, ArrowRight, Sparkles, TrendingUp, Eye } from "lucide-react"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function DashboardPage() {
  const { userData, loading } = useUser()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-64 rounded-xl bg-muted animate-pulse" />
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const projectCount = userData?.portfolioData?.projects?.length || 0

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/80 to-accent p-8 text-white"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5" />
            <span className="text-white/80 text-sm font-medium">Dashboard</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back{userData?.portfolioData?.name ? `, ${userData.portfolioData.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="text-white/80 max-w-md">
            Here&apos;s an overview of your portfolio. Keep building amazing things!
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Profile Status",
            value: userData?.portfolioData?.name ? "Complete" : "Incomplete",
            icon: User,
            link: "/dashboard/portfolio",
            linkText: "Edit Profile",
            gradient: "from-emerald-500 to-teal-500",
          },
          {
            title: "Projects",
            value: projectCount.toString(),
            icon: FolderKanban,
            link: "/dashboard/projects",
            linkText: "Manage Projects",
            gradient: "from-primary to-cyan-500",
          },
          {
            title: "Template",
            value: `Template ${userData?.portfolioTemplate || "1"}`,
            icon: FileText,
            link: "/dashboard/templates",
            linkText: "Change Template",
            gradient: "from-accent to-orange-500",
          },
        ].map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="glass-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient}`}
                >
                  <stat.icon className="h-5 w-5 text-white" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground mb-3">{stat.value}</div>
                <Link
                  href={stat.link}
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all"
                >
                  {stat.linkText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <Card className="glass-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Link href="/dashboard/portfolio">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="gap-2 h-12 px-6 border-2 hover:border-primary hover:bg-primary/10 transition-all bg-transparent"
                >
                  <User className="h-5 w-5" />
                  Edit Portfolio
                </Button>
              </motion.div>
            </Link>
            <Link href="/dashboard/projects">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="gap-2 h-12 px-6 border-2 hover:border-primary hover:bg-primary/10 transition-all bg-transparent"
                >
                  <FolderKanban className="h-5 w-5" />
                  Add Project
                </Button>
              </motion.div>
            </Link>
            <Link href="/dashboard/blogs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="gap-2 h-12 px-6 border-2 hover:border-primary hover:bg-primary/10 transition-all bg-transparent"
                >
                  <FileText className="h-5 w-5" />
                  Write Blog
                </Button>
              </motion.div>
            </Link>
            {userData?.username && (
              <Link href={`/u/${userData.username}`} target="_blank">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25">
                    <Eye className="h-5 w-5" />
                    View Public Profile
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
            )}
            <Link href={"/blogs"} target="_blank">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25">
                    <Eye className="h-5 w-5" />
                    View All Blog Posts
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </motion.div>
              </Link>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
