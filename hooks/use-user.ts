"use client"

import { useState, useEffect } from "react"
import { getUserByUid, type UserData } from "@/lib/get-user-data"
import { useAuth } from "./use-auth"

export function useUser() {
  const { user, loading: authLoading } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      if (!user) {
        setUserData(null)
        setLoading(false)
        return
      }

      try {
        const data = await getUserByUid(user.uid)
        setUserData(data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchUser()
    }
  }, [user, authLoading])

  const refetch = async () => {
    if (!user) return
    setLoading(true)
    const data = await getUserByUid(user.uid)
    setUserData(data)
    setLoading(false)
  }

  return {
    userData,
    loading: authLoading || loading,
    refetch,
  }
}
