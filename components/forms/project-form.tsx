"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Upload, Trash2, Edit2 } from "lucide-react"
import { updatePortfolioField, uploadImage } from "@/services/portfolio-service"

interface Project {
  title: string
  description: string
  techStack: string[]
  github?: string
  live?: string
  image?: string
}

interface ProjectFormProps {
  uid: string
  projects: Project[]
  onSave?: () => void
}

export default function ProjectForm({ uid, projects: initialProjects, onSave }: ProjectFormProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [currentProject, setCurrentProject] = useState<Project>({
    title: "",
    description: "",
    techStack: [],
    github: "",
    live: "",
    image: "",
  })
  const [newTech, setNewTech] = useState("")
  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setCurrentProject({
      title: "",
      description: "",
      techStack: [],
      github: "",
      live: "",
      image: "",
    })
    setEditingIndex(null)
    setNewTech("")
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const url = await uploadImage(uid, file, "projects")
      setCurrentProject({ ...currentProject, image: url })
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setLoading(false)
    }
  }

  const addTech = () => {
    if (newTech.trim() && !currentProject.techStack.includes(newTech.trim())) {
      setCurrentProject({
        ...currentProject,
        techStack: [...currentProject.techStack, newTech.trim()],
      })
      setNewTech("")
    }
  }

  const removeTech = (tech: string) => {
    setCurrentProject({
      ...currentProject,
      techStack: currentProject.techStack.filter((t) => t !== tech),
    })
  }

  const saveProject = async () => {
    if (!currentProject.title.trim()) return

    setLoading(true)
    try {
      let newProjects: Project[]
      if (editingIndex !== null) {
        newProjects = [...projects]
        newProjects[editingIndex] = currentProject
      } else {
        newProjects = [...projects, currentProject]
      }

      await updatePortfolioField(uid, "projects", newProjects)
      setProjects(newProjects)
      resetForm()
      onSave?.()
    } catch (error) {
      console.error("Error saving project:", error)
    } finally {
      setLoading(false)
    }
  }

  const editProject = (index: number) => {
    setCurrentProject(projects[index])
    setEditingIndex(index)
  }

  const deleteProject = async (index: number) => {
    setLoading(true)
    try {
      const newProjects = projects.filter((_, i) => i !== index)
      await updatePortfolioField(uid, "projects", newProjects)
      setProjects(newProjects)
      onSave?.()
    } catch (error) {
      console.error("Error deleting project:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Existing Projects */}
      {projects.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Your Projects</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{project.title}</h4>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.techStack.slice(0, 3).map((tech, i) => (
                          <span key={i} className="rounded bg-secondary px-2 py-0.5 text-xs">
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{project.techStack.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    <div className="ml-4 flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => editProject(index)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => deleteProject(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Project Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingIndex !== null ? "Edit Project" : "Add New Project"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Project Image */}
          <div className="space-y-2">
            <Label>Project Image</Label>
            <div className="flex items-center gap-4">
              {currentProject.image && (
                <img
                  src={currentProject.image || "/placeholder.svg"}
                  alt="Project"
                  className="h-20 w-32 rounded object-cover"
                  crossOrigin="anonymous"
                />
              )}
              <Label
                htmlFor="project-upload"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Label>
              <input id="project-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="project-title">Title</Label>
            <Input
              id="project-title"
              value={currentProject.title}
              onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
              placeholder="My Awesome Project"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              value={currentProject.description}
              onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
              placeholder="Describe your project..."
              rows={3}
            />
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <Label>Tech Stack</Label>
            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)} className="hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
              />
              <Button type="button" onClick={addTech} size="icon" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="project-github">GitHub URL</Label>
              <Input
                id="project-github"
                value={currentProject.github || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, github: e.target.value })}
                placeholder="https://github.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-live">Live URL</Label>
              <Input
                id="project-live"
                value={currentProject.live || ""}
                onChange={(e) => setCurrentProject({ ...currentProject, live: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={saveProject} disabled={loading || !currentProject.title.trim()}>
              {loading ? "Saving..." : editingIndex !== null ? "Update Project" : "Add Project"}
            </Button>
            {editingIndex !== null && (
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
