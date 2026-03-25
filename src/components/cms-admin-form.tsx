"use client"

import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { SiteContent, TeamDirectoryRow, WeeklyRotaRow } from "@/lib/site-types"

const input =
  "w-full min-w-0 border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
const label = "mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/40"

function emptyWeek(): WeeklyRotaRow {
  return {
    weekLabel: "",
    weekStartIso: "",
    pm: "",
    designer: "",
    strategicDirector: "",
  }
}

function emptyDirectoryRow(): TeamDirectoryRow {
  return { name: "", designation: "", email: "", note: "" }
}

export function CmsAdminForm() {
  const [data, setData] = useState<SiteContent | null>(null)
  const [secret, setSecret] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setMessage(null)
    try {
      const res = await fetch("/api/cms", { cache: "no-store" })
      if (!res.ok) throw new Error("Failed to load")
      const json = (await res.json()) as SiteContent
      setData(json)
    } catch {
      setMessage("Could not load site content.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  async function save() {
    if (!data) return
    if (!secret.trim()) {
      setMessage("Enter the CMS secret before saving.")
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret.trim()}`,
        },
        body: JSON.stringify(data),
      })
      const j = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(j.error ?? res.statusText)
      setMessage("Saved. Public pages will show updated content after refresh.")
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Save failed.")
    } finally {
      setSaving(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        <p className="text-white/50">{loading ? "Loading CMS…" : "Could not load content."}</p>
        {!loading && (
          <Button type="button" variant="outline" onClick={() => void load()}>
            Retry
          </Button>
        )}
      </div>
    )
  }

  const setOnCall = (patch: Partial<SiteContent["onCall"]>) =>
    setData((d) => (d ? { ...d, onCall: { ...d.onCall, ...patch } } : d))

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <header className="space-y-2 border-b border-white/10 pb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Internal</p>
        <h1 className="text-3xl font-black uppercase tracking-tighter md:text-4xl">Site CMS</h1>
        <p className="max-w-2xl text-sm font-light text-white/55">
          Edit weekly on-call rota, email directory, and client comms copy. Changes are stored in{" "}
          <code className="font-mono text-xs text-white/70">src/content/site.json</code> on the server. Set{" "}
          <code className="font-mono text-xs text-white/70">CMS_SECRET</code> in{" "}
          <code className="font-mono text-xs text-white/70">.env.local</code> to enable saving.
        </p>
      </header>

      <Tabs defaultValue="roster" className="gap-6">
        <TabsList variant="line" className="flex flex-wrap gap-1">
          <TabsTrigger value="roster">Weekly roster</TabsTrigger>
          <TabsTrigger value="directory">Email directory</TabsTrigger>
          <TabsTrigger value="client">Client comms</TabsTrigger>
        </TabsList>

        <TabsContent value="roster" className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Strategic Director (global)</label>
              <input
                className={input}
                value={data.strategicDirector}
                onChange={(e) => setData((d) => (d ? { ...d, strategicDirector: e.target.value } : d))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className={label}>On-call page copy</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["protocolEyebrow", "Eyebrow"],
                  ["pageTitle", "Title"],
                  ["responseTime", "Response strip"],
                  ["crewSummary", "Crew strip"],
                  ["weeklySectionTitle", "Rota section title"],
                  ["weeklySectionSubtitle", "Rota section subtitle"],
                ] as const
              ).map(([key, title]) => (
                <div key={key}>
                  <label className={label}>{title}</label>
                  <input
                    className={input}
                    value={data.onCall[key]}
                    onChange={(e) => setOnCall({ [key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className={label}>Page subtitle</label>
              <textarea
                className={`${input} min-h-[72px]`}
                value={data.onCall.pageSubtitle}
                onChange={(e) => setOnCall({ pageSubtitle: e.target.value })}
              />
            </div>
            <div>
              <label className={label}>Rota footnote</label>
              <textarea
                className={`${input} min-h-[56px]`}
                value={data.onCall.rotaFootnote}
                onChange={(e) => setOnCall({ rotaFootnote: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">Weekly slots</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setData((d) =>
                    d ? { ...d, weeklyRota: [...d.weeklyRota, emptyWeek()] } : d,
                  )
                }
              >
                Add week
              </Button>
            </div>
            <div className="space-y-6">
              {data.weeklyRota.map((row, i) => (
                <div key={i} className="space-y-3 border border-white/10 bg-white/3 p-4">
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="xs"
                      className="text-white/40 hover:text-destructive"
                      onClick={() =>
                        setData((d) =>
                          d
                            ? {
                                ...d,
                                weeklyRota: d.weeklyRota.filter((_, j) => j !== i),
                              }
                            : d,
                        )
                      }
                    >
                      Remove week
                    </Button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={label}>Week label</label>
                      <input
                        className={input}
                        value={row.weekLabel}
                        onChange={(e) => {
                          const v = e.target.value
                          setData((d) => {
                            if (!d) return d
                            const next = [...d.weeklyRota]
                            next[i] = { ...next[i]!, weekLabel: v }
                            return { ...d, weeklyRota: next }
                          })
                        }}
                      />
                    </div>
                    <div>
                      <label className={label}>Week start (ISO, Monday)</label>
                      <input
                        className={input}
                        placeholder="2026-04-06"
                        value={row.weekStartIso}
                        onChange={(e) => {
                          const v = e.target.value
                          setData((d) => {
                            if (!d) return d
                            const next = [...d.weeklyRota]
                            next[i] = { ...next[i]!, weekStartIso: v }
                            return { ...d, weeklyRota: next }
                          })
                        }}
                      />
                    </div>
                    <div>
                      <label className={label}>PM</label>
                      <input
                        className={input}
                        value={row.pm}
                        onChange={(e) => {
                          const v = e.target.value
                          setData((d) => {
                            if (!d) return d
                            const next = [...d.weeklyRota]
                            next[i] = { ...next[i]!, pm: v }
                            return { ...d, weeklyRota: next }
                          })
                        }}
                      />
                    </div>
                    <div>
                      <label className={label}>Designer</label>
                      <input
                        className={input}
                        value={row.designer}
                        onChange={(e) => {
                          const v = e.target.value
                          setData((d) => {
                            if (!d) return d
                            const next = [...d.weeklyRota]
                            next[i] = { ...next[i]!, designer: v }
                            return { ...d, weeklyRota: next }
                          })
                        }}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Strategic Director (override)</label>
                      <input
                        className={input}
                        value={row.strategicDirector}
                        onChange={(e) => {
                          const v = e.target.value
                          setData((d) => {
                            if (!d) return d
                            const next = [...d.weeklyRota]
                            next[i] = { ...next[i]!, strategicDirector: v }
                            return { ...d, weeklyRota: next }
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="directory" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-white/50">Who to email and when to use each contact.</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setData((d) =>
                  d ? { ...d, teamDirectory: [...d.teamDirectory, emptyDirectoryRow()] } : d,
                )
              }
            >
              Add row
            </Button>
          </div>
          <div className="space-y-6">
            {data.teamDirectory.map((row, i) => (
              <div key={i} className="space-y-3 border border-white/10 bg-white/3 p-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="text-white/40 hover:text-destructive"
                    onClick={() =>
                      setData((d) =>
                        d
                          ? {
                              ...d,
                              teamDirectory: d.teamDirectory.filter((_, j) => j !== i),
                            }
                          : d,
                      )
                    }
                  >
                    Remove row
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["name", "Name"],
                      ["designation", "Designation"],
                      ["email", "Email"],
                    ] as const
                  ).map(([key, title]) => (
                    <div key={key} className={key === "email" ? "sm:col-span-2" : ""}>
                      <label className={label}>{title}</label>
                      <input
                        className={input}
                        value={row[key]}
                        onChange={(e) => {
                          const v = e.target.value
                          setData((d) => {
                            if (!d) return d
                            const next = [...d.teamDirectory]
                            next[i] = { ...next[i]!, [key]: v }
                            return { ...d, teamDirectory: next }
                          })
                        }}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className={label}>When to use</label>
                    <textarea
                      className={`${input} min-h-[72px]`}
                      value={row.note}
                      onChange={(e) => {
                        const v = e.target.value
                        setData((d) => {
                          if (!d) return d
                          const next = [...d.teamDirectory]
                          next[i] = { ...next[i]!, note: v }
                          return { ...d, teamDirectory: next }
                        })
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="client" className="space-y-10">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={label}>Page title</label>
              <input
                className={input}
                value={data.clientComms.pageTitle}
                onChange={(e) =>
                  setData((d) =>
                    d
                      ? {
                          ...d,
                          clientComms: { ...d.clientComms, pageTitle: e.target.value },
                        }
                      : d,
                  )
                }
              />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Page subtitle</label>
              <textarea
                className={`${input} min-h-[64px]`}
                value={data.clientComms.pageSubtitle}
                onChange={(e) =>
                  setData((d) =>
                    d
                      ? {
                          ...d,
                          clientComms: { ...d.clientComms, pageSubtitle: e.target.value },
                        }
                      : d,
                  )
                }
              />
            </div>
            <div>
              <label className={label}>FAQ section title</label>
              <input
                className={input}
                value={data.clientComms.faqSectionTitle}
                onChange={(e) =>
                  setData((d) =>
                    d
                      ? {
                          ...d,
                          clientComms: { ...d.clientComms, faqSectionTitle: e.target.value },
                        }
                      : d,
                  )
                }
              />
            </div>
            <div>
              <label className={label}>FAQ section subtitle</label>
              <input
                className={input}
                value={data.clientComms.faqSectionSubtitle}
                onChange={(e) =>
                  setData((d) =>
                    d
                      ? {
                          ...d,
                          clientComms: { ...d.clientComms, faqSectionSubtitle: e.target.value },
                        }
                      : d,
                  )
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">Templates</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setData((d) =>
                    d
                      ? {
                          ...d,
                          clientComms: {
                            ...d.clientComms,
                            templates: [
                              ...d.clientComms.templates,
                              { title: "New template", content: "" },
                            ],
                          },
                        }
                      : d,
                  )
                }
              >
                Add template
              </Button>
            </div>
            {data.clientComms.templates.map((t, i) => (
              <div key={i} className="space-y-3 border border-white/10 bg-white/3 p-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="text-white/40 hover:text-destructive"
                    onClick={() =>
                      setData((d) => {
                        if (!d) return d
                        const templates = d.clientComms.templates.filter((_, j) => j !== i)
                        return { ...d, clientComms: { ...d.clientComms, templates } }
                      })
                    }
                  >
                    Remove
                  </Button>
                </div>
                <div>
                  <label className={label}>Title</label>
                  <input
                    className={input}
                    value={t.title}
                    onChange={(e) => {
                      const v = e.target.value
                      setData((d) => {
                        if (!d) return d
                        const templates = [...d.clientComms.templates]
                        templates[i] = { ...templates[i]!, title: v }
                        return { ...d, clientComms: { ...d.clientComms, templates } }
                      })
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input
                      type="checkbox"
                      checked={!!t.fullWidth}
                      onChange={(e) => {
                        const v = e.target.checked
                        setData((d) => {
                          if (!d) return d
                          const templates = [...d.clientComms.templates]
                          templates[i] = { ...templates[i]!, fullWidth: v }
                          return { ...d, clientComms: { ...d.clientComms, templates } }
                        })
                      }}
                    />
                    Full width layout
                  </label>
                </div>
                <div>
                  <label className={label}>Danger tag (optional)</label>
                  <input
                    className={input}
                    value={t.dangerTag ?? ""}
                    onChange={(e) => {
                      const v = e.target.value
                      setData((d) => {
                        if (!d) return d
                        const templates = [...d.clientComms.templates]
                        templates[i] = { ...templates[i]!, dangerTag: v || undefined }
                        return { ...d, clientComms: { ...d.clientComms, templates } }
                      })
                    }}
                  />
                </div>
                <div>
                  <label className={label}>When to use (optional)</label>
                  <textarea
                    className={`${input} min-h-[56px]`}
                    value={t.whenToUse ?? ""}
                    onChange={(e) => {
                      const v = e.target.value
                      setData((d) => {
                        if (!d) return d
                        const templates = [...d.clientComms.templates]
                        templates[i] = { ...templates[i]!, whenToUse: v || undefined }
                        return { ...d, clientComms: { ...d.clientComms, templates } }
                      })
                    }}
                  />
                </div>
                <div>
                  <label className={label}>Body</label>
                  <textarea
                    className={`${input} min-h-[200px] font-mono text-xs`}
                    value={t.content}
                    onChange={(e) => {
                      const v = e.target.value
                      setData((d) => {
                        if (!d) return d
                        const templates = [...d.clientComms.templates]
                        templates[i] = { ...templates[i]!, content: v }
                        return { ...d, clientComms: { ...d.clientComms, templates } }
                      })
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold uppercase tracking-widest text-white/50">FAQ items</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setData((d) =>
                    d
                      ? {
                          ...d,
                          clientComms: {
                            ...d.clientComms,
                            faq: [...d.clientComms.faq, { question: "", answer: "" }],
                          },
                        }
                      : d,
                  )
                }
              >
                Add FAQ
              </Button>
            </div>
            {data.clientComms.faq.map((item, i) => (
              <div key={i} className="space-y-3 border border-white/10 bg-white/3 p-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    className="text-white/40 hover:text-destructive"
                    onClick={() =>
                      setData((d) => {
                        if (!d) return d
                        const faq = d.clientComms.faq.filter((_, j) => j !== i)
                        return { ...d, clientComms: { ...d.clientComms, faq } }
                      })
                    }
                  >
                    Remove
                  </Button>
                </div>
                <div>
                  <label className={label}>Question</label>
                  <input
                    className={input}
                    value={item.question}
                    onChange={(e) => {
                      const v = e.target.value
                      setData((d) => {
                        if (!d) return d
                        const faq = [...d.clientComms.faq]
                        faq[i] = { ...faq[i]!, question: v }
                        return { ...d, clientComms: { ...d.clientComms, faq } }
                      })
                    }}
                  />
                </div>
                <div>
                  <label className={label}>Suggested answer</label>
                  <textarea
                    className={`${input} min-h-[100px] font-mono text-xs`}
                    value={item.answer}
                    onChange={(e) => {
                      const v = e.target.value
                      setData((d) => {
                        if (!d) return d
                        const faq = [...d.clientComms.faq]
                        faq[i] = { ...faq[i]!, answer: v }
                        return { ...d, clientComms: { ...d.clientComms, faq } }
                      })
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className={label}>CMS secret</label>
          <input
            type="password"
            className={input}
            autoComplete="off"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Same value as CMS_SECRET on the server"
          />
        </div>
        <Button type="button" disabled={saving} onClick={() => void save()}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>

      {message && (
        <p
          className={`text-sm ${message.startsWith("Saved") ? "text-primary" : "text-destructive"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </div>
  )
}
