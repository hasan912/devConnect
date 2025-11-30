"use client"

import { useState, useEffect, useCallback } from "react"
import type { User } from "firebase/auth"
import { onAuthChange, signIn, signUp, signOut } from "@/lib/auth"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    return signIn(email, password)
  }, [])

  const register = useCallback(async (email: string, password: string, username: string) => {
    return signUp(email, password, username)
  }, [])

  const logout = useCallback(async () => {
    return signOut()
  }, [])

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}
