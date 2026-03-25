"use client"

import { useMemo, useState } from "react"
import type { TeamDirectoryRow } from "@/lib/site-types"
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const cellBase =
  "min-w-0 align-top whitespace-normal break-words px-2 py-3 sm:px-3 sm:py-4 text-left leading-snug"

export function EmailDirectoryTable({ rows }: { rows: TeamDirectoryRow[] }) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => {
      const blob = `${r.name} ${r.designation} ${r.email} ${r.note ?? ""}`.toLowerCase()
      return blob.includes(q)
    })
  }, [rows, query])

  return (
    <div className="space-y-6">
      <label className="block">
        <span className="sr-only">Search names, roles, or emails</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, role, or email..."
          className="w-full min-w-0 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </label>

      {/* Single wrapper: no horizontal scroll; table-fixed + min-w-0 lets columns wrap */}
      <div className="w-full max-w-full overflow-hidden border border-white/10 bg-white/5">
        <table className="w-full min-w-0 table-fixed border-collapse text-sm">
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead
                className={`${cellBase} w-[18%] sm:w-[16%] text-white/50 align-bottom font-bold uppercase tracking-widest text-[10px] sm:text-xs`}
              >
                Name
              </TableHead>
              <TableHead
                className={`${cellBase} w-[22%] sm:w-[18%] text-white/50 align-bottom font-bold uppercase tracking-widest text-[10px] sm:text-xs`}
              >
                Designation
              </TableHead>
              <TableHead
                className={`${cellBase} w-[30%] sm:w-[26%] text-white/50 align-bottom font-bold uppercase tracking-widest text-[10px] sm:text-xs`}
              >
                Mail
              </TableHead>
              <TableHead
                className={`${cellBase} w-[30%] sm:w-[40%] text-white/50 align-bottom font-bold uppercase tracking-widest text-[10px] sm:text-xs`}
              >
                When to use
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center text-white/40">
                  No matches. Try a different search.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((row, i) => (
                <TableRow key={`${row.email}-${i}`} className="border-white/10 hover:bg-white/5 transition-colors">
                  <TableCell className={`${cellBase} font-medium text-white`}>{row.name}</TableCell>
                  <TableCell className={`${cellBase} text-white/75`}>{row.designation}</TableCell>
                  <TableCell className={cellBase}>
                    <a
                      href={`mailto:${row.email}`}
                      className="inline-block max-w-full break-all font-mono text-xs text-primary underline-offset-2 hover:text-white hover:underline sm:text-sm"
                    >
                      {row.email}
                    </a>
                  </TableCell>
                  <TableCell className={`${cellBase} text-white/55 break-words`}>{row.note}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </table>
      </div>
      <p className="text-white/40 text-sm font-light">
        Tip: click an email to open your default mail app. Use the &quot;When to use&quot; column to route requests to the right owner.
      </p>
    </div>
  )
}
