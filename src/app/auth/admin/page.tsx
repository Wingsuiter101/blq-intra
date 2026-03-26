import { requireSiteAuth } from "@/lib/auth-guard"

type Search = Record<string, string | string[] | undefined>

export default async function AdminUnlockPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams
  const next = typeof params.next === "string" ? params.next : "/admin/cms"
  const error = params.error === "1"

  await requireSiteAuth(`/auth/admin?next=${encodeURIComponent(next)}`)

  return (
    <div className="mx-auto max-w-md space-y-6 border border-white/10 bg-white/3 p-6">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Admin layer</p>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Unlock admin</h1>
        <p className="text-sm text-white/55">Second factor for protected CMS operations.</p>
      </header>

      <form action="/auth/admin/submit" method="post" className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label htmlFor="password" className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/40">
            Admin password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
          />
        </div>
        <button className="w-full bg-primary px-4 py-2 text-sm font-bold uppercase tracking-widest text-white">
          Unlock
        </button>
      </form>

      {error ? <p className="text-sm text-destructive">Invalid admin password.</p> : null}
    </div>
  )
}
