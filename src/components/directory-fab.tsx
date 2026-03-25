"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { HelpCircle, Printer, Users, Wallet, Monitor, Briefcase, AlertTriangle, Compass } from "lucide-react"

const directory = [
  {
    role: "HR & Leaves",
    person: "HR Manager",
    email: "hr@brandlogiq.org",
    icon: Users,
    desc: "For leave approvals, comp-off logging, and general employee grievances."
  },
  {
    role: "Finance & Payroll",
    person: "Finance Lead",
    email: "finance@brandlogiq.org",
    icon: Wallet,
    desc: "For salary queries, reimbursements, and client invoicing."
  },
  {
    role: "IT & Hardware",
    person: "IT Admin",
    email: "it@brandlogiq.org",
    icon: Monitor,
    desc: "For NAS access, M365 issues, software licenses, and hardware repairs."
  },
  {
    role: "Printing & Production",
    person: "Production Manager",
    email: "production@brandlogiq.org",
    icon: Printer,
    desc: "For vendor coordination, merch printing, and physical asset delivery."
  },
  {
    role: "Strategic Director",
    person: "Saurav Dhungana",
    email: "saurav@brandlogiq.org",
    icon: Compass,
    desc: "Strategy, creative direction, and creative execution escalations (not finance or HR)."
  },
  {
    role: "Creative Director",
    person: "Surav Shrestha",
    email: "creative@brandlogiq.org",
    icon: Briefcase,
    desc: "Creative leadership, major campaign approvals, and design direction."
  },
  {
    role: "Client Escalations",
    person: "Account Director",
    email: "accounts@brandlogiq.org",
    icon: AlertTriangle,
    desc: "For angry clients, scope creep, or contract renegotiations."
  }
]

export function DirectoryFab() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<button className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-primary text-white px-6 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors shadow-2xl border border-transparent hover:border-white/20" />}>
        <HelpCircle className="w-5 h-5" />
        <span className="hidden md:inline">Who to Approach</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md border-l border-white/10 bg-black p-0 overflow-y-auto">
        <SheetHeader className="p-6 border-b border-white/10 bg-white/5 sticky top-0 z-10 backdrop-blur-md">
          <SheetTitle className="text-2xl font-black tracking-tighter uppercase text-white">
            Agency Directory
          </SheetTitle>
          <p className="text-white/50 font-light text-sm">
            The right person for the right problem.{" "}
            <Link href="/directory" className="text-primary underline-offset-4 hover:underline">
              Full email repository
            </Link>
          </p>
        </SheetHeader>
        <div className="p-6 space-y-8">
          {directory.map((dept, i) => (
            <div key={i} className="group">
              <div className="flex items-center gap-3 mb-2">
                <dept.icon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold tracking-tight uppercase text-white group-hover:text-primary transition-colors">
                  {dept.role}
                </h3>
              </div>
              <div className="pl-8 space-y-1">
                <p className="text-white/80 font-medium">{dept.person}</p>
                <a href={`mailto:${dept.email}`} className="text-primary hover:text-white transition-colors text-sm font-mono block">
                  {dept.email}
                </a>
                <p className="text-white/40 font-light text-sm mt-2 leading-relaxed">
                  {dept.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
