import type { Metadata } from "next"
import { EmailDirectoryTable } from "@/components/email-directory-table"
import { getSiteContent } from "@/lib/site-content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Email directory | BLQ Portal",
  description: "Central repository of Brandlogiq team emails and roles.",
}

export default async function DirectoryPage() {
  const content = await getSiteContent()

  return (
    <div className="mx-auto max-w-6xl space-y-12 animate-in fade-in duration-700">
      <div className="space-y-4 border-b border-white/10 pb-12">
        <h1 className="text-5xl font-black uppercase tracking-tighter md:text-7xl">Email repository</h1>
        <p className="max-w-3xl text-xl font-light leading-relaxed tracking-wide text-white/50 md:text-2xl">
          Single place to look up who to email at BLQ. All addresses use{" "}
          <span className="text-white/80">@brandlogiq.org</span>.
        </p>
      </div>

      <EmailDirectoryTable rows={content.teamDirectory} />
    </div>
  )
}
