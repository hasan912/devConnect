"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import { updateTemplate } from "@/services/portfolio-service"
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
  uid: string
  type: "portfolio" | "blog"
  currentTemplate: string
  onSelect?: () => void
}

const portfolioTemplates = [
  {
    id: "1",
    name: "Aurora Glass",
    description: "Modern design with glass-morphism effects and gradient backgrounds.",
    preview: "/templates/portfolio-1.jpg",
  },
  {
    id: "2",
    name: "Dark Minimalist",
    description: "Dark theme with minimalist aesthetics and bold typography.",
    preview: "/templates/portfolio-2.jpg",
  },
  {
    id: "3",
    name: "Professional Card",
    description: "Clean card-based layout with blue gradients, perfect for professionals.",
    preview: "/templates/portfolio-3.jpg",
  },
  {
    id: "4",
    name: "Cyberpunk Neon",
    description: "Futuristic dark theme with neon accents and animated particles.",
    preview: "/templates/portfolio-4.jpg",
  },
  {
    id: "5",
    name: "Minimal Editorial",
    description: "Ultra-minimal black and white design with editorial typography.",
    preview: "/templates/portfolio-5.jpg",
  },
  {
    id: "6",
    name: "Vibrant Gradient",
    description: "Colorful gradients with orange and pink tones, modern and playful.",
    preview: "/templates/portfolio-6.jpg",
  },
  {
    id: "7",
    name: "Terminal Hacker",
    description: "Terminal-inspired green monochrome theme for developers.",
    preview: "/templates/portfolio-7.jpg",
  },
  {
    id: "8",
    name: "Luxury Dark",
    description: "Premium dark design with purple accents and smooth parallax effects.",
    preview: "/templates/portfolio-8.jpg",
  },
]

const blogTemplates = [
  {
    id: "1",
    name: "Classic Reader",
    description: "Traditional blog layout focused on readability.",
    preview: "/templates/blog-1.jpg",
  },
  {
    id: "2",
    name: "Dark Magazine",
    description: "Magazine-style dark theme with reading time estimates.",
    preview: "/templates/blog-2.jpg",
  },
  {
    id: "3",
    name: "Gradient Modern",
    description: "Modern blog with blue-purple gradients and floating elements.",
    preview: "/templates/blog-3.jpg",
  },
  {
    id: "4",
    name: "Parallax Dark",
    description: "Immersive dark theme with parallax scrolling and progress bar.",
    preview: "/templates/blog-4.jpg",
  },
  {
    id: "5",
    name: "Minimal Editorial",
    description: "Clean and minimal design focused on typography and content.",
    preview: "/templates/blog-5.jpg",
  },
  {
    id: "6",
    name: "Social Vibrant",
    description: "Engaging design with social features and vibrant orange-pink colors.",
    preview: "/templates/blog-6.jpg",
  },
  {
    id: "7",
    name: "Terminal Code",
    description: "Developer-focused terminal theme with code syntax highlighting.",
    preview: "/templates/blog-7.jpg",
  },
  {
    id: "8",
    name: "Luxury Reading",
    description: "Premium dark reading experience with purple accents and smooth animations.",
    preview: "/templates/blog-8.jpg",
  },
]

export default function TemplateSelector({ uid, type, currentTemplate, onSelect }: TemplateSelectorProps) {
  const [selected, setSelected] = useState(currentTemplate)
  const [loading, setLoading] = useState(false)

  const templates = type === "portfolio" ? portfolioTemplates : blogTemplates

  const handleSelect = async (templateId: string) => {
    setLoading(true)
    try {
      await updateTemplate(uid, type, templateId)
      setSelected(templateId)
      onSelect?.()
    } catch (error) {
      console.error("Error updating template:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold capitalize">{type} Templates</h3>
      <p className="text-sm text-muted-foreground">Choose from {templates.length} modern, responsive templates</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={cn(
              "cursor-pointer overflow-hidden transition-all hover:ring-2 hover:ring-primary hover:shadow-lg",
              selected === template.id && "ring-2 ring-primary shadow-lg",
              loading && "opacity-50 pointer-events-none",
            )}
            onClick={() => handleSelect(template.id)}
          >
            <div className="relative aspect-video bg-muted">
              <div className="h-full w-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <p className="text-4xl font-black text-muted-foreground/20">{template.id}</p>
              </div>
              {selected === template.id && (
                <div className="absolute right-2 top-2 rounded-full bg-primary p-1.5 shadow-lg">
                  <Check className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-1">{template.name}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
