import Link from "next/link"

type Search = Record<string, string | string[] | undefined>

export default async function LoginPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams
  const error = params.error === "1"
  const next = typeof params.next === "string" ? params.next : "/"

  return (
    <div className="mx-auto max-w-md space-y-6 border border-white/10 bg-white/3 p-6">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Secure access</p>
        <h1 className="text-3xl font-black uppercase tracking-tighter">Sign in</h1>
        <p className="text-sm text-white/55">This portal is private. Enter your team credentials.</p>
      </header>

      <form action="/auth/login/submit" method="post" className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label htmlFor="username" className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/40">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            className="w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-white/40">
            Password
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
          Continue
        </button>
      </form>

      {error ? <p className="text-sm text-destructive">Invalid credentials.</p> : null}

      <p className="text-xs text-white/45">
        Admin unlock is separate for <code>/admin/cms</code>.
      </p>
      <Link href="/" className="text-xs text-primary hover:underline">
        Back to home
      </Link>
    </div>
  )
}
