"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Upload, Trash2, Loader2 } from "lucide-react"
import { updatePortfolio, uploadImage } from "@/services/portfolio-service"
import type { PortfolioData } from "@/lib/get-user-data"
import { useToast } from "@/hooks/use-toast"

interface PortfolioFormProps {
  uid: string
  initialData: PortfolioData
  onSave?: () => void
}

export default function PortfolioForm({ uid, initialData, onSave }: PortfolioFormProps) {
  const [data, setData] = useState<PortfolioData>(initialData)
  const [loading, setLoading] = useState(false)
  const [uploadingImage, setUploadingImage] = useState<string | null>(null)
  const [newSkill, setNewSkill] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updatePortfolio(uid, data)
      toast({
        title: "Success!",
        description: "Portfolio updated successfully",
      })
      onSave?.()
    } catch (error) {
      console.error("Error saving portfolio:", error)
      toast({
        title: "Error",
        description: "Failed to save portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 500KB for base64)
    if (file.size > 500 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 500KB. Please compress your image.",
        variant: "destructive",
      })
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file",
        variant: "destructive",
      })
      return
    }

    setUploadingImage(type)
    try {
      const base64Url = await uploadImage(uid, file, type)
      if (type === 'profile') {
        setData({ ...data, profileImage: base64Url })
      } else {
        setData({ ...data, coverImage: base64Url })
      }
      toast({
        title: "Success!",
        description: `${type === 'profile' ? 'Profile' : 'Cover'} image uploaded successfully`,
      })
    } catch (error: any) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(null)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      setData({ ...data, skills: [...data.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setData({ ...data, skills: data.skills.filter((s) => s !== skill) })
  }

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...(data.experience || []),
        { company: "", position: "", duration: "", description: "" },
      ],
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const updated = [...(data.experience || [])]
    updated[index] = { ...updated[index], [field]: value }
    setData({ ...data, experience: updated })
  }

  const removeExperience = (index: number) => {
    setData({ ...data, experience: data.experience?.filter((_, i) => i !== index) })
  }

  const addEducation = () => {
    setData({
      ...data,
      education: [
        ...(data.education || []),
        { institution: "", degree: "", duration: "", description: "" },
      ],
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...(data.education || [])]
    updated[index] = { ...updated[index], [field]: value }
    setData({ ...data, education: updated })
  }

  const removeEducation = (index: number) => {
    setData({ ...data, education: data.education?.filter((_, i) => i !== index) })
  }

  const addCertification = () => {
    const newCert = prompt("Enter certification name:")
    if (newCert?.trim()) {
      setData({ ...data, certifications: [...(data.certifications || []), newCert.trim()] })
    }
  }

  const removeCertification = (index: number) => {
    setData({ ...data, certifications: data.certifications?.filter((_, i) => i !== index) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Profile Image */}
          <div className="space-y-2">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-4">
              {data.profileImage && (
                <img
                  src={data.profileImage}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-primary"
                />
              )}
              <Label
                htmlFor="profile-upload"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent disabled:opacity-50"
              >
                {uploadingImage === 'profile' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </>
                )}
              </Label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'profile')}
                className="hidden"
                disabled={uploadingImage !== null}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="space-y-2">
              {data.coverImage && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden ring-2 ring-primary">
                  <img src={data.coverImage} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}
              <Label
                htmlFor="cover-upload"
                className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent disabled:opacity-50 w-fit"
              >
                {uploadingImage === 'cover' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Upload Cover
                  </>
                )}
              </Label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'cover')}
                className="hidden"
                disabled={uploadingImage !== null}
              />
            </div>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              placeholder="John Doe"
              required
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              value={data.title || ""}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="Full Stack Developer"
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              placeholder="Full-stack developer..."
            />
          </div>

          {/* About */}
          <div className="space-y-2">
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              value={data.about}
              onChange={(e) => setData({ ...data, about: e.target.value })}
              placeholder="Tell your story..."
              rows={4}
            />
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email || ""}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone || ""}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.location || ""}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={data.website || ""}
                onChange={(e) => setData({ ...data, website: e.target.value })}
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          {/* Professional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="yearsOfExperience">Years of Experience</Label>
              <Input
                id="yearsOfExperience"
                type="number"
                min="0"
                value={data.yearsOfExperience || ""}
                onChange={(e) => setData({ ...data, yearsOfExperience: parseInt(e.target.value) || 0 })}
                placeholder="5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={data.availability || ""}
                onChange={(e) => setData({ ...data, availability: e.target.value })}
                placeholder="Available for hire"
              />
            </div>
          </div>

          {/* Resume URL */}
          <div className="space-y-2">
            <Label htmlFor="resumeUrl">Resume URL</Label>
            <Input
              id="resumeUrl"
              type="url"
              value={data.resumeUrl || ""}
              onChange={(e) => setData({ ...data, resumeUrl: e.target.value })}
              placeholder="https://drive.google.com/your-resume.pdf"
            />
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-sm text-primary-foreground"
              >
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <Button type="button" onClick={addSkill} size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github">GitHub</Label>
              <Input
                id="github"
                value={data.social.github || ""}
                onChange={(e) => setData({ ...data, social: { ...data.social, github: e.target.value } })}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={data.social.linkedin || ""}
                onChange={(e) => setData({ ...data, social: { ...data.social, linkedin: e.target.value } })}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter/X</Label>
              <Input
                id="twitter"
                value={data.social.twitter || ""}
                onChange={(e) => setData({ ...data, social: { ...data.social, twitter: e.target.value } })}
                placeholder="https://twitter.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={data.social.instagram || ""}
                onChange={(e) => setData({ ...data, social: { ...data.social, instagram: e.target.value } })}
                placeholder="https://instagram.com/username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube">YouTube</Label>
              <Input
                id="youtube"
                value={data.social.youtube || ""}
                onChange={(e) => setData({ ...data, social: { ...data.social, youtube: e.target.value } })}
                placeholder="https://youtube.com/@username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discord">Discord</Label>
              <Input
                id="discord"
                value={data.social.discord || ""}
                onChange={(e) => setData({ ...data, social: { ...data.social, discord: e.target.value } })}
                placeholder="username#0000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Work Experience</span>
            <Button type="button" onClick={addExperience} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.experience && data.experience.length > 0 ? (
            data.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 relative">
                <Button
                  type="button"
                  onClick={() => removeExperience(index)}
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                  />
                  <Input
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    placeholder="Position/Role"
                  />
                </div>
                <Input
                  value={exp.duration}
                  onChange={(e) => updateExperience(index, "duration", e.target.value)}
                  placeholder="Duration (e.g., Jan 2020 - Present)"
                />
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Description of your role and achievements..."
                  rows={3}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No experience added yet. Click "Add Experience" to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Education</span>
            <Button type="button" onClick={addEducation} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.education && data.education.length > 0 ? (
            data.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 relative">
                <Button
                  type="button"
                  onClick={() => removeEducation(index)}
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="Institution Name"
                  />
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Degree/Program"
                  />
                </div>
                <Input
                  value={edu.duration}
                  onChange={(e) => updateEducation(index, "duration", e.target.value)}
                  placeholder="Duration (e.g., 2018 - 2022)"
                />
                <Textarea
                  value={edu.description}
                  onChange={(e) => updateEducation(index, "description", e.target.value)}
                  placeholder="Additional details, achievements, GPA, etc..."
                  rows={2}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No education added yet. Click "Add Education" to get started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Certifications & Awards</span>
            <Button type="button" onClick={addCertification} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data.certifications && data.certifications.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.certifications.map((cert, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm"
                >
                  {cert}
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No certifications added yet. Click "Add Certification" to get started.
            </p>
          )}
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading || uploadingImage !== null} className="w-full">
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Portfolio"
        )}
      </Button>
    </form>
  )
}
