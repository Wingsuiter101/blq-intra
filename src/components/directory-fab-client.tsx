"use client"

import { useState } from "react"
import Link from "next/link"
import type { TeamDirectoryRow } from "@/lib/site-types"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { HelpCircle } from "lucide-react"

export function DirectoryFabClient({ rows }: { rows: TeamDirectoryRow[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button className="fixed bottom-8 right-8 z-50 flex items-center gap-3 border border-transparent bg-primary px-6 py-4 font-bold uppercase tracking-widest text-white shadow-2xl transition-colors hover:border-white/20 hover:bg-white hover:text-black" />
        }
      >
        <HelpCircle className="h-5 w-5" />
        <span className="hidden md:inline">Who to Approach</span>
      </SheetTrigger>

      <SheetContent side="right" className="w-full overflow-y-auto border-l border-white/10 bg-black p-0 sm:max-w-md">
        <SheetHeader className="sticky top-0 z-10 border-b border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <SheetTitle className="text-2xl font-black uppercase tracking-tighter text-white">Agency Directory</SheetTitle>
          <p className="text-sm font-light text-white/50">
            Updated from CMS content.{" "}
            <Link href="/directory" className="text-primary underline-offset-4 hover:underline">
              Full email repository
            </Link>
          </p>
        </SheetHeader>

        <div className="space-y-6 p-6">
          {rows.map((entry, i) => (
            <div key={`${entry.email}-${i}`} className="space-y-1 border-b border-white/5 pb-4">
              <p className="text-sm font-bold uppercase tracking-wide text-white">{entry.designation}</p>
              <p className="text-white/80">{entry.name}</p>
              <a href={`mailto:${entry.email}`} className="block text-sm text-primary transition-colors hover:text-white">
                {entry.email}
              </a>
              <p className="text-sm font-light leading-relaxed text-white/40">{entry.note}</p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
