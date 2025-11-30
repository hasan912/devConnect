import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL('https://devfoliopro.vercel.app/'),
  title: {
    default: '🚀 devfoliopro - Premium Portfolio & Blog Builder for Developers | Showcase Your Skills',
    template: '%s | devfoliopro - Developer Portfolio Platform'
  },
  description:
    '✨ Create stunning developer portfolios & blogs in minutes! 🎨 8+ premium templates, free hosting, SEO-optimized. Perfect for developers, designers & freelancers. Build your personal brand today! 💼',
  icons: {
    icon: '/og-image.png',
    apple: '/og-image.png',
  },
  keywords: [
    'developer portfolio',
    'portfolio builder',
    'blog platform',
    'developer blog',
    'portfolio website',
    'personal portfolio',
    'portfolio templates',
    'free portfolio builder',
    'developer showcase',
    'coding portfolio',
    'tech portfolio',
    'web developer portfolio',
    'software engineer portfolio',
    'programmer portfolio',
    'freelance developer',
    'portfolio creator',
    'online portfolio',
    'professional portfolio',
    'resume builder',
    'project showcase',
    'github portfolio',
    'dev community',
    'developer tools',
    'portfolio hosting',
    'SEO portfolio',
  ],
  authors: [{ name: 'Muhammad Hasan Baig' }],
  creator: 'Muhammad Hasan Baig',
  publisher: 'Muhammad Hasan Baig',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devfoliopro.vercel.app/',
    siteName: 'Devfoliopro - Developer Portfolio Platform',
    title: '🚀 Devfoliopro - Build Your Developer Portfolio in Minutes',
    description: '✨ Create stunning portfolios & blogs with 8+ premium templates. Free hosting, SEO-optimized, perfect for developers & designers! 🎨',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Devfoliopro - Premium Portfolio Builder for Developers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🚀 devfoliopro - Premium Developer Portfolio Builder',
    description: '✨ Create stunning portfolios in minutes! 8+ templates, free hosting, SEO-optimized 🎨',
    images: ['/og-image.png'],
    creator: '@devfoliopro',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // verification: {
  //   google: 'your-google-verification-code',
  // },
  alternates: {
    canonical: 'https://devfoliopro.vercel.app',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || ''
  
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
