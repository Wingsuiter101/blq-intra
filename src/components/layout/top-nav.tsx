"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { useState } from "react"

const nav = [
  { name: "Home", href: "/" },
  { name: "Policies", href: "/policies" },
  { name: "Client Comms", href: "/client-comms" },
  { name: "On-Call Roster", href: "/on-call-roster" },
  { name: "IT & Ops", href: "/it-ops" },
  { name: "Emails", href: "/directory" },
  { name: "Admin", href: "/admin/cms" },
]

export function TopNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white uppercase">
          BLQ<span className="text-primary">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-white/50"
              )}
            >
              {item.name}
            </Link>
          ))}
          <form action="/auth/logout" method="post">
            <button className="transition-colors text-white/50 hover:text-primary">Logout</button>
          </form>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black px-6 py-4 space-y-4">
          {nav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block text-lg font-medium tracking-wide uppercase transition-colors",
                pathname === item.href ? "text-primary" : "text-white/50"
              )}
            >
              {item.name}
            </Link>
          ))}
          <form action="/auth/logout" method="post">
            <button className="block text-lg font-medium tracking-wide uppercase transition-colors text-white/50 hover:text-primary">
              Logout
            </button>
          </form>
        </div>
      )}
    </header>
  )
}
