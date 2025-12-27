'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Video, BookOpen, BarChart3, Home, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const navItems = [
  { href: "/admin/dashboard", label: "관리자 대시보드", icon: LayoutDashboard },
  { href: "/admin/users", label: "사용자 관리", icon: Users },
  { href: "/admin/lectures", label: "강의 관리", icon: Video },
  { href: "/admin/assignments", label: "배정 관리", icon: BookOpen },
  { href: "/admin/analytics", label: "분석 리포트", icon: BarChart3 },
]

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-white tracking-wider">ADMIN</h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-800 text-slate-400 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <Home className="h-4 w-4" />
            <span className="text-sm font-medium">일반 사용자 화면</span>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-red-900/50 text-slate-400 hover:text-red-200 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-medium">로그아웃</span>
        </button>
      </div>
    </aside>
  )
}
