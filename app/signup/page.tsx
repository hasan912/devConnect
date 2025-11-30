"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Loader2, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { checkUsernameAvailable } from "@/lib/auth"
import { motion } from "framer-motion"

export default function SignupPage() {
  const router = useRouter()
  const { register, user, loading: authLoading } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard")
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const isAvailable = await checkUsernameAvailable(username)
      if (!isAvailable) {
        setError("Username is already taken")
        setLoading(false)
        return
      }

      await register(email, password, username)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Failed to create account")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 overflow-hidden">
      <div className="fixed inset-0 -z-10 aurora-bg" />
      <motion.div
        className="fixed top-20 -right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="fixed bottom-20 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card border-border/50 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center pb-2">
            <Link href="/" className="mb-6 inline-flex items-center justify-center gap-2">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="relative">
                <Code2 className="h-10 w-10 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
              </motion.div>
              <span className="text-2xl font-bold gradient-text">DevFolio</span>
            </Link>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-accent" />
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              Get started with your portfolio in minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-xl bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive"
                >
                  {error}
                </motion.div>
              )}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-foreground font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    required
                    className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary/50" />
                  Your URL: devfolio.com/u/<span className="text-primary font-medium">{username || "username"}</span>
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all"
                  />
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
