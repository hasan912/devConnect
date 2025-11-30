"use client"

import { useUser } from "@/hooks/use-user"
import { useAuth } from "@/hooks/use-auth"
import ProjectForm from "@/components/forms/project-form"
import { Loader2 } from "lucide-react"

export default function ProjectsPage() {
  const { user } = useAuth()
  const { userData, loading, refetch } = useUser()

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user || !userData) {
    return <div>Error loading user data</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-1 text-muted-foreground">Showcase your best work</p>
      </div>

      <ProjectForm uid={user.uid} projects={userData.portfolioData.projects || []} onSave={refetch} />
    </div>
  )
}
