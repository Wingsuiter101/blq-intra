"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

interface ScriptBlockProps {
  title: string
  content: string
  /** Red “last resort” / warning label next to the title */
  dangerTag?: string
  /** When this template is allowed (shown above the body) */
  whenToUse?: string
}

export function ScriptBlock({ title, content, dangerTag, whenToUse }: ScriptBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`group flex flex-col h-full border transition-colors ${
        dangerTag
          ? "border-red-500/40 hover:border-red-500/60"
          : "border-white/10 hover:border-primary/50"
      }`}
    >
      <div className="flex flex-row items-center justify-between gap-3 p-4 border-b border-white/10 bg-white/5">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {dangerTag ? (
            <span className="shrink-0 border border-red-500 bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
              {dangerTag}
            </span>
          ) : null}
          <h3 className="text-sm font-bold tracking-widest uppercase text-white">{title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="text-white/40 hover:text-primary transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="h-5 w-5 text-primary" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>
      {whenToUse ? (
        <div className="border-b border-red-500/30 bg-red-950/40 px-4 py-3 text-xs leading-relaxed text-red-100/90">
          <p className="mb-2 font-black uppercase tracking-widest text-red-400">When to use</p>
          <p className="whitespace-pre-wrap font-sans font-light">{whenToUse}</p>
        </div>
      ) : null}
      <div className="flex-1 p-6 bg-black">
        <div className="text-sm whitespace-pre-wrap h-full font-mono text-white/50 leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  )
}
