import { notFound } from "next/navigation"
import { getBlogBySlug } from "@/services/blog-service"
import { getUserByUid } from "@/lib/get-user-data"
import BlogTemplate1 from "@/components/templates/blog/blog-template-1"
import BlogTemplate2 from "@/components/templates/blog/blog-template-2"
import BlogTemplate3 from "@/components/templates/blog/blog-template-3"
import BlogTemplate4 from "@/components/templates/blog/blog-template-4"
import BlogTemplate5 from "@/components/templates/blog/blog-template-5"
import BlogTemplate6 from "@/components/templates/blog/blog-template-6"
import BlogTemplate7 from "@/components/templates/blog/blog-template-7"
import BlogTemplate8 from "@/components/templates/blog/blog-template-8"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: "Blog Not Found",
    }
  }

  return {
    title: blog.title,
    description: blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160),
      images: blog.coverImage ? [blog.coverImage] : [],
    },
  }
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  const user = await getUserByUid(blog.uid)

  if (!user) {
    notFound()
  }

  const authorName = user.portfolioData.name || user.username

  switch (user.blogTemplate) {
    case "2":
      return <BlogTemplate2 blog={blog} authorName={authorName} />
    case "3":
      return <BlogTemplate3 blog={blog} authorName={authorName} />
    case "4":
      return <BlogTemplate4 blog={blog} authorName={authorName} />
    case "5":
      return <BlogTemplate5 blog={blog} authorName={authorName} />
    case "6":
      return <BlogTemplate6 blog={blog} authorName={authorName} />
    case "7":
      return <BlogTemplate7 blog={blog} authorName={authorName} />
    case "8":
      return <BlogTemplate8 blog={blog} authorName={authorName} />
    case "1":
    default:
      return <BlogTemplate1 blog={blog} authorName={authorName} />
  }
}
