import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL('https://devconnect.com'),
  title: {
    default: '🚀 DevConnect - Premium Portfolio & Blog Builder for Developers | Showcase Your Skills',
    template: '%s | DevConnect - Developer Portfolio Platform'
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
  authors: [{ name: 'DevConnect Team' }],
  creator: 'DevConnect',
  publisher: 'DevConnect',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devconnect.com',
    siteName: 'DevConnect - Developer Portfolio Platform',
    title: '🚀 DevConnect - Build Your Developer Portfolio in Minutes',
    description: '✨ Create stunning portfolios & blogs with 8+ premium templates. Free hosting, SEO-optimized, perfect for developers & designers! 🎨',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevConnect - Premium Portfolio Builder for Developers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '🚀 DevConnect - Premium Developer Portfolio Builder',
    description: '✨ Create stunning portfolios in minutes! 8+ templates, free hosting, SEO-optimized 🎨',
    images: ['/og-image.png'],
    creator: '@devconnect',
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
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: 'https://devconnect.com',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
