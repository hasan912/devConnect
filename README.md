# 🚀 DevConnect - Developer Portfolio & Blog Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-latest-orange)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

A modern, feature-rich platform for developers to create stunning portfolios and blogs with premium templates, free hosting, and SEO optimization.

## ✨ Features

### 🎨 Portfolio System
- **8 Premium Templates** - Choose from beautiful, professionally designed templates
- **Fully Customizable** - Personalize every aspect of your portfolio
- **Responsive Design** - Perfect on all devices (mobile, tablet, desktop)
- **Dark Mode Support** - Built-in theme switching
- **Base64 Image Storage** - Free image hosting without external storage costs

### 📝 Blog Platform
- **8 Blog Templates** - Unique designs for your content
- **Rich Text Editor** - Create engaging blog posts
- **Custom Slugs** - SEO-friendly URLs
- **Cover Images** - Eye-catching visuals for posts
- **Dynamic Routing** - Fast, optimized navigation

### 👤 User Experience
- **Auto-redirect** - Logged-in users automatically go to dashboard
- **Mobile Responsive** - Sidebar with dropdown menu on mobile
- **Real-time Updates** - Instant preview of changes
- **Protected Routes** - Secure dashboard access
- **Username-based URLs** - Professional public profile links

### 🔐 Authentication & Security
- **Firebase Authentication** - Secure email/password login
- **Client-side Protection** - Dashboard route guards
- **Firestore Database** - Scalable cloud storage
- **Username Validation** - Unique username checking

### 📊 Data Management
- **Comprehensive Profile Fields**:
  - Personal info (name, bio, title, location)
  - Contact (email, phone, website, resume URL)
  - Professional (skills, experience, education)
  - Projects with tech stack
  - Certifications
  - Testimonials
  - Social media links (GitHub, LinkedIn, Twitter, Instagram, YouTube, Discord)
  - Availability status

### 🚀 Performance & SEO
- **SEO Optimized** - Comprehensive meta tags, Open Graph, Twitter Cards
- **Rich Keywords** - 25+ targeted SEO keywords
- **Google Bot Optimization** - Maximum preview and snippet settings
- **Fast Loading** - Next.js 16 App Router with optimizations
- **Analytics Ready** - Vercel Analytics integrated

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.3** - React framework with App Router
- **React 19.2** - Latest React features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Firebase Authentication** - User management
- **Cloud Firestore** - NoSQL database
- **Base64 Storage** - Image encoding (no Firebase Storage costs)

### UI Components
- **Shadcn/UI** - Beautiful, accessible components
- **Lucide Icons** - Modern icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Form management with Zod validation

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** 18.17 or later
- **npm** or **pnpm** package manager
- **Firebase Project** (free tier works)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/devconnect.git
cd devconnect
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password
3. Create a **Firestore Database** (start in test mode)
4. Get your Firebase config from Project Settings

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Firestore Security Rules

Update your Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /blogs/{blogId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.uid;
    }
  }
}
```

### 6. Run Development Server

```bash
pnpm dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

### Build the Application

```bash
pnpm build
# or
npm run build
```

### Start Production Server

```bash
pnpm start
# or
npm start
```

## 📁 Project Structure

```
devConnect/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with SEO metadata
│   ├── page.tsx             # Landing page
│   ├── login/               # Login page
│   ├── signup/              # Signup page
│   ├── dashboard/           # Protected dashboard
│   │   ├── layout.tsx       # Dashboard layout with auth
│   │   ├── page.tsx         # Dashboard overview
│   │   ├── portfolio/       # Portfolio editor
│   │   ├── projects/        # Project management
│   │   ├── blogs/           # Blog management
│   │   └── templates/       # Template selector
│   ├── u/[username]/        # Public portfolio pages
│   └── blog/[slug]/         # Public blog posts
├── components/
│   ├── templates/
│   │   ├── portfolio/       # 8 portfolio templates
│   │   └── blog/            # 8 blog templates
│   ├── dashboard/
│   │   ├── sidebar.tsx      # Mobile-responsive sidebar
│   │   └── template-selector.tsx
│   ├── forms/               # Portfolio, project, blog forms
│   ├── providers/           # Auth provider
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── firebase.ts          # Firebase initialization
│   ├── auth.ts              # Authentication functions
│   ├── get-user-data.ts     # User data fetching
│   └── utils.ts             # Utility functions
├── services/
│   ├── portfolio-service.ts # Portfolio operations
│   └── blog-service.ts      # Blog operations
├── hooks/
│   ├── use-auth.ts          # Authentication hook
│   └── use-user.ts          # User data hook
└── public/                  # Static assets
```

## 🎨 Portfolio Templates

1. **Template 1** - Aurora Glass (gradient backgrounds, grid layouts)
2. **Template 2** - Dark Minimalist (clean, professional)
3. **Template 3** - Professional Card (blue gradients, sidebar)
4. **Template 4** - Cyberpunk Neon (purple/cyan, particles)
5. **Template 5** - Minimal Editorial (typography-focused)
6. **Template 6** - Vibrant Gradient (orange/pink/rose)
7. **Template 7** - Terminal Hacker (emerald green, monospace)
8. **Template 8** - Luxury Dark (purple accents, parallax)

## 📝 Blog Templates

1. **Template 1** - Classic Blog
2. **Template 2** - Modern Magazine
3. **Template 3** - Minimal Reader
4. **Template 4** - Dark Mode Blog
5. **Template 5** - Photo Journal
6. **Template 6** - Tech Blog
7. **Template 7** - Creative Portfolio
8. **Template 8** - News Magazine

## 🔧 Configuration

### SEO Optimization

Update metadata in `app/layout.tsx`:
- Site URL
- Title and description
- Keywords
- Social media handles
- Google Search Console verification code

### Firebase Configuration

Update Firebase config in `lib/firebase.ts` with your project credentials.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `.next` folder
3. Configure environment variables

## 📱 Mobile Responsiveness

- ✅ Mobile-first design
- ✅ Responsive sidebar with dropdown menu
- ✅ Touch-friendly interactions
- ✅ Optimized images for mobile
- ✅ Adaptive layouts

## 🔒 Security Features

- Client-side authentication checks
- Protected dashboard routes
- Firestore security rules
- Environment variable protection
- XSS prevention
- CSRF protection via Firebase

## 🎯 Usage Guide

### Creating a Portfolio

1. **Sign Up** - Create account with unique username
2. **Edit Profile** - Add personal info, skills, experience
3. **Add Projects** - Showcase your work with descriptions
4. **Choose Template** - Select from 8 premium designs
5. **Publish** - Share your public URL: `yoursite.com/u/username`

### Writing a Blog

1. Go to **Dashboard → Blogs**
2. Click **Create New Blog**
3. Add title, content, and cover image
4. Choose blog template
5. Publish with custom slug

### Customizing Templates

All templates support:
- Custom colors via Tailwind
- Animation adjustments in Framer Motion
- Layout modifications
- Section reordering

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- None currently reported

## 📮 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@devconnect.com

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Firebase](https://firebase.google.com/) - Backend services
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Shadcn/UI](https://ui.shadcn.com/) - UI components
- [Framer Motion](https://www.framer.com/motion/) - Animations

## 🚀 Future Enhancements

- [ ] Email verification
- [ ] Password reset
- [ ] Social login (Google, GitHub)
- [ ] Analytics dashboard
- [ ] Custom domains
- [ ] Export portfolio as PDF
- [ ] Theme customizer
- [ ] Multi-language support
- [ ] AI-powered content suggestions

---

**Built with ❤️ by the DevConnect Team**

🌟 Star this repo if you find it helpful!
