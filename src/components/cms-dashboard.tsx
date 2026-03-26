"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SiteContent, TeamDirectoryRow, WeeklyRotaRow } from "@/lib/site-types"

type CmsDashboardProps = {
  initialData: SiteContent
  sanityConfigured: boolean
  hostingTarget: "vercel" | "static"
}

const INPUT =
  "w-full min-w-0 border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary focus:ring-1 focus:ring-primary"

const LABEL = "mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/40"

function formatWeekLabelFromIso(iso: string): string {
  if (!iso) return ""
  const d = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(d.getTime())) return ""
  return `Week of ${d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`
}

function startOfCurrentWeekIso(): string {
  const now = new Date()
  const day = now.getDay() // 0=Sun ... 6=Sat
  const diff = day === 0 ? -6 : 1 - day // move to Monday
  now.setDate(now.getDate() + diff)
  return now.toISOString().slice(0, 10)
}

function emptyWeek(): WeeklyRotaRow {
  const weekStartIso = startOfCurrentWeekIso()
  return {
    weekLabel: formatWeekLabelFromIso(weekStartIso),
    weekStartIso,
    pm: "",
    designer: "",
    strategicDirector: "",
  }
}

function emptyDirectoryRow(): TeamDirectoryRow {
  return { name: "", designation: "", email: "", note: "" }
}

export function CmsDashboard({ initialData, sanityConfigured, hostingTarget }: CmsDashboardProps) {
  const [data, setData] = useState<SiteContent>(initialData)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const status = useMemo(
    () => ({
      weeks: data.weeklyRota.length,
      contacts: data.teamDirectory.length,
      templates: data.clientComms.templates.length,
      faq: data.clientComms.faq.length,
    }),
    [data],
  )

  async function refreshFromSanity() {
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/cms", { method: "GET" })
      const body = (await res.json().catch(() => ({}))) as { data?: SiteContent; error?: string }
      if (!res.ok || !body.data) throw new Error(body.error || "Failed to reload")
      setData(body.data)
      setMessage("Loaded latest published content from Sanity.")
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Failed to load from Sanity.")
    } finally {
      setBusy(false)
    }
  }

  async function saveToSanity() {
    setBusy(true)
    setMessage(null)
    try {
      const res = await fetch("/api/admin/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      })
      const body = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(body.error || "Save failed")
      setMessage(
        hostingTarget === "vercel"
          ? "Saved to Sanity. Vercel pages refresh automatically (up to ~60s cache window)."
          : "Saved to Sanity. Re-run GitHub Pages deploy so the static site picks up new content.",
      )
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed.")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <header className="space-y-3 border-b border-white/10 pb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Headless CMS</p>
        <h1 className="text-3xl font-black uppercase tracking-tighter md:text-4xl">Operations dashboard</h1>
        <p className="text-sm text-white/60">
          Edit weekly rota and directory. Both <span className="text-white">Email Repository</span> and{" "}
          <span className="text-white">Who to Approach</span> use the same directory data.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="border border-white/10 bg-white/3 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Sanity</p>
          <p className={sanityConfigured ? "mt-1 text-primary" : "mt-1 text-amber-300"}>
            {sanityConfigured ? "Configured" : "Missing env/token"}
          </p>
          <p className="mt-1 text-xs text-white/50">Admins save directly here; no Sanity Studio needed.</p>
        </div>
        <div className="border border-white/10 bg-white/3 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Weekly slots</p>
          <p className="mt-1 text-xl text-white">{status.weeks}</p>
        </div>
        <div className="border border-white/10 bg-white/3 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Directory contacts</p>
          <p className="mt-1 text-xl text-white">{status.contacts}</p>
        </div>
        <div className="border border-white/10 bg-white/3 p-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Templates / FAQ</p>
          <p className="mt-1 text-xl text-white">
            {status.templates} / {status.faq}
          </p>
        </div>
      </section>

      <Tabs defaultValue="rota" className="gap-6">
        <TabsList variant="line" className="flex flex-wrap gap-1">
          <TabsTrigger value="oncall">On-call settings</TabsTrigger>
          <TabsTrigger value="rota">Weekly rota</TabsTrigger>
          <TabsTrigger value="directory">Email + who to approach</TabsTrigger>
          <TabsTrigger value="client">Client comms</TabsTrigger>
        </TabsList>

        <TabsContent value="oncall" className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["protocolEyebrow", "Eyebrow"],
                ["pageTitle", "Page title"],
                ["responseTime", "Sunday duty window"],
                ["crewSummary", "Crew summary"],
                ["weeklySectionTitle", "Section title"],
                ["weeklySectionSubtitle", "Section subtitle"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className={LABEL}>{label}</label>
                <input
                  className={INPUT}
                  value={data.onCall[key]}
                  onChange={(e) =>
                    setData((d) => ({
                      ...d,
                      onCall: { ...d.onCall, [key]: e.target.value },
                    }))
                  }
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className={LABEL}>Page subtitle</label>
              <textarea
                className={`${INPUT} min-h-[80px]`}
                value={data.onCall.pageSubtitle}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    onCall: { ...d.onCall, pageSubtitle: e.target.value },
                  }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Rota footnote</label>
              <textarea
                className={`${INPUT} min-h-[64px]`}
                value={data.onCall.rotaFootnote}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    onCall: { ...d.onCall, rotaFootnote: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rota" className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={LABEL}>Strategic Director (global)</label>
              <input
                className={INPUT}
                value={data.strategicDirector}
                onChange={(e) => setData((d) => ({ ...d, strategicDirector: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase tracking-widest text-white/50">Weekly rota rows</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setData((d) => ({ ...d, weeklyRota: [...d.weeklyRota, emptyWeek()] }))}
            >
              Add week
            </Button>
          </div>

          <div className="space-y-4">
            {data.weeklyRota.map((row, i) => (
              <div key={i} className="space-y-3 border border-white/10 bg-white/3 p-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="xs"
                    variant="ghost"
                    className="text-white/40 hover:text-destructive"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        weeklyRota: d.weeklyRota.filter((_, j) => j !== i),
                      }))
                    }
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>Week start (Monday)</label>
                    <input
                      className={INPUT}
                      type="date"
                      value={row.weekStartIso}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.weeklyRota]
                          const iso = e.target.value
                          const autoLabel = formatWeekLabelFromIso(iso)
                          next[i] = {
                            ...next[i]!,
                            weekStartIso: iso,
                            weekLabel: next[i]!.weekLabel && next[i]!.weekLabel !== formatWeekLabelFromIso(next[i]!.weekStartIso)
                              ? next[i]!.weekLabel
                              : autoLabel,
                          }
                          return { ...d, weeklyRota: next }
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Auto week label</label>
                    <input
                      className={INPUT}
                      value={formatWeekLabelFromIso(row.weekStartIso)}
                      readOnly
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={LABEL}>Custom label (optional override)</label>
                    <input
                      className={INPUT}
                      placeholder={formatWeekLabelFromIso(row.weekStartIso) || "Week of Apr 6, 2026"}
                      value={row.weekLabel}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.weeklyRota]
                          next[i] = { ...next[i]!, weekLabel: e.target.value }
                          return { ...d, weeklyRota: next }
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Project Manager</label>
                    <input
                      className={INPUT}
                      value={row.pm}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.weeklyRota]
                          next[i] = { ...next[i]!, pm: e.target.value }
                          return { ...d, weeklyRota: next }
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Designer</label>
                    <input
                      className={INPUT}
                      value={row.designer}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.weeklyRota]
                          next[i] = { ...next[i]!, designer: e.target.value }
                          return { ...d, weeklyRota: next }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="directory" className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase tracking-widest text-white/50">Directory rows</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setData((d) => ({ ...d, teamDirectory: [...d.teamDirectory, emptyDirectoryRow()] }))}
            >
              Add contact
            </Button>
          </div>

          <div className="space-y-4">
            {data.teamDirectory.map((row, i) => (
              <div key={i} className="space-y-3 border border-white/10 bg-white/3 p-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="xs"
                    variant="ghost"
                    className="text-white/40 hover:text-destructive"
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        teamDirectory: d.teamDirectory.filter((_, j) => j !== i),
                      }))
                    }
                  >
                    Remove
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={LABEL}>Name</label>
                    <input
                      className={INPUT}
                      value={row.name}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.teamDirectory]
                          next[i] = { ...next[i]!, name: e.target.value }
                          return { ...d, teamDirectory: next }
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Designation</label>
                    <input
                      className={INPUT}
                      value={row.designation}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.teamDirectory]
                          next[i] = { ...next[i]!, designation: e.target.value }
                          return { ...d, teamDirectory: next }
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={LABEL}>Email</label>
                    <input
                      className={INPUT}
                      value={row.email}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.teamDirectory]
                          next[i] = { ...next[i]!, email: e.target.value }
                          return { ...d, teamDirectory: next }
                        })
                      }
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={LABEL}>When to use / notes</label>
                    <textarea
                      className={`${INPUT} min-h-[72px]`}
                      value={row.note}
                      onChange={(e) =>
                        setData((d) => {
                          const next = [...d.teamDirectory]
                          next[i] = { ...next[i]!, note: e.target.value }
                          return { ...d, teamDirectory: next }
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="client" className="space-y-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={LABEL}>Page title</label>
              <input
                className={INPUT}
                value={data.clientComms.pageTitle}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    clientComms: { ...d.clientComms, pageTitle: e.target.value },
                  }))
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={LABEL}>Page subtitle</label>
              <textarea
                className={`${INPUT} min-h-[64px]`}
                value={data.clientComms.pageSubtitle}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    clientComms: { ...d.clientComms, pageSubtitle: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className={LABEL}>FAQ section title</label>
              <input
                className={INPUT}
                value={data.clientComms.faqSectionTitle}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    clientComms: { ...d.clientComms, faqSectionTitle: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className={LABEL}>FAQ section subtitle</label>
              <input
                className={INPUT}
                value={data.clientComms.faqSectionSubtitle}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    clientComms: { ...d.clientComms, faqSectionSubtitle: e.target.value },
                  }))
                }
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section className="space-y-3 border-t border-white/10 pt-6">
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => void refreshFromSanity()} disabled={busy}>
            Reload from Sanity
          </Button>
          <Button type="button" onClick={() => void saveToSanity()} disabled={busy}>
            {busy ? "Saving..." : "Save to Sanity"}
          </Button>
        </div>
        <p className="text-xs text-white/45">
          {hostingTarget === "vercel"
            ? "Vercel hosting: content updates are picked up automatically (ISR every ~60s)."
            : "Static hosting: after saving, deploy again so static pages rebuild from latest Sanity data."}
        </p>
        {message ? <p className="text-sm text-primary">{message}</p> : null}
      </section>
    </div>
  )
}
