"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, User, FolderKanban, FileText, Palette, LogOut, ExternalLink, Menu, X, Code2 } from "lucide-react"
import { useAuthContext } from "@/components/providers/auth-provider"
import { useUser } from "@/hooks/use-user"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion } from "framer-motion"

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: User },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/blogs", label: "Blogs", icon: FileText },
  { href: "/dashboard/templates", label: "Templates", icon: Palette },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const { logout } = useAuthContext()
  const { userData } = useUser()

  const handleLogout = () => {
    logout()
    onClose?.()
  }

  const handleNavClick = () => {
    onClose?.()
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-6 flex items-center gap-2">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="relative">
              <Code2 className="h-8 w-8 text-primary" />
              <div className=" inset-0 bg-primary/20 blur-lg rounded-full" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">DevFolio</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4 space-y-2">
        {userData?.username && (
          <Link
            href={`/u/${userData.username}`}
            target="_blank"
            onClick={handleNavClick}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            View Public Profile
          </Link>
        )}
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 p-4">
        <h1 className="text-lg font-bold">Portfolio Builder</h1>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-full w-64 flex-col border-r border-border bg-card">
        <SidebarContent />
      </aside>
    </>
  )
}
