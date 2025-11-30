"use client"

import { useUser } from "@/hooks/use-user"
import { useAuth } from "@/hooks/use-auth"
import TemplateSelector from "@/components/dashboard/template-selector"
import { Loader2 } from "lucide-react"

export default function TemplatesPage() {
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="mt-1 text-muted-foreground">Choose how your portfolio and blog look</p>
      </div>

      <TemplateSelector
        uid={user.uid}
        type="portfolio"
        currentTemplate={userData.portfolioTemplate}
        onSelect={refetch}
      />

      <TemplateSelector uid={user.uid} type="blog" currentTemplate={userData.blogTemplate} onSelect={refetch} />
    </div>
  )
}
