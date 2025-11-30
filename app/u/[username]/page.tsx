import { notFound } from "next/navigation"
import { getUserByUsername } from "@/lib/get-user-data"
import { getBlogsByUser } from "@/services/blog-service"
import Template1 from "@/components/templates/portfolio/template-1"
import Template2 from "@/components/templates/portfolio/template-2"
import Template3 from "@/components/templates/portfolio/template-3"
import Template4 from "@/components/templates/portfolio/template-4"
import Template5 from "@/components/templates/portfolio/template-5"
import Template6 from "@/components/templates/portfolio/template-6"
import Template7 from "@/components/templates/portfolio/template-7"
import Template8 from "@/components/templates/portfolio/template-8"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    return {
      title: "User Not Found",
    }
  }

  return {
    title: `${user.portfolioData.name || username} | Portfolio`,
    description: user.portfolioData.bio || `Portfolio of ${user.portfolioData.name || username}`,
  }
}

export default async function UserPortfolioPage({ params }: PageProps) {
  const { username } = await params
  const user = await getUserByUsername(username)

  if (!user) {
    notFound()
  }

  const { portfolioData, portfolioTemplate, uid } = user
  const userBlogs = await getBlogsByUser(uid)

  // Serialize blogs to plain objects
  const serializedBlogs = userBlogs.map((blog) => ({
    ...blog,
    createdAt: blog.createdAt.toDate().toISOString(),
  }))

  switch (portfolioTemplate) {
    case "1":
      return <Template1 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "2":
      return <Template2 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "3":
      return <Template3 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "4":
      return <Template4 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "5":
      return <Template5 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "6":
      return <Template6 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "7":
      return <Template7 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "8":
      return <Template8 data={portfolioData} blogs={serializedBlogs} username={username} />
    case "1":
    default:
      return <Template1 data={portfolioData} blogs={serializedBlogs} username={username} />
  }
}
