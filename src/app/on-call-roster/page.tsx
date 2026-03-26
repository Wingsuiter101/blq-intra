import { Calendar, Clock, Headphones, Shield, Sparkles, User } from "lucide-react"
import { getSiteContent } from "@/lib/site-content"
import { requireSiteAuth } from "@/lib/auth-guard"

function RuleCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col border border-white/10 bg-white/3 p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3 border-b border-white/10 pb-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-primary/40 bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">{title}</h3>
      </div>
      <div className="space-y-3 text-sm font-light leading-relaxed text-white/65">{children}</div>
    </div>
  )
}

function RosterSlot({ label, name }: { label: string; name: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
      <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-white/35 sm:w-36">{label}</span>
      <span className="min-w-0 font-medium text-white">{name}</span>
    </div>
  )
}

export default async function OnCallRoster() {
  await requireSiteAuth("/on-call-roster")
  const content = await getSiteContent()
  const sd = content.strategicDirector
  const { onCall } = content
  const weeklyRota = [...content.weeklyRota].sort((a, b) =>
    a.weekStartIso.localeCompare(b.weekStartIso),
  )

  return (
    <div className="mx-auto max-w-6xl animate-in fade-in duration-700">
      <header className="space-y-4 border-b border-white/10 pb-10 md:pb-14">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{onCall.protocolEyebrow}</p>
        <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl md:text-7xl">{onCall.pageTitle}</h1>
        <p className="max-w-2xl text-lg font-light leading-relaxed text-white/50 md:text-xl">{onCall.pageSubtitle}</p>
      </header>

      <section className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
        <div className="flex items-start gap-3 bg-black px-4 py-5 sm:px-6">
          <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Response</p>
            <p className="mt-1 text-lg font-light text-white">{onCall.responseTime}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-black px-4 py-5 sm:px-6">
          <Headphones className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Crew</p>
            <p className="mt-1 text-lg font-light text-white">{onCall.crewSummary}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 bg-black px-4 py-5 sm:px-6">
          <User className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Strategic Director</p>
            <p className="mt-1 text-lg font-light text-white">{sd}</p>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6 md:mt-16">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Rules &amp; escalation</h2>
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          <RuleCard icon={Shield} title="The crew">
            <p>
              <span className="text-white">Project Manager (The Shield).</span> Client comms, triage, and shielding the
              designer from noise.
            </p>
            <p>
              <span className="text-white">Designer (The Fixer).</span> Emergency creative execution when something must
              ship on Sunday.
            </p>
          </RuleCard>

          <RuleCard icon={Sparkles} title="Strategic Director">
            <p>
              <span className="text-white">{sd}</span> is the escalation for almost everything on a Sunday: strategy,
              creative direction, account tension, scope, and &quot;is this an emergency?&quot; They can also help with{" "}
              <span className="text-white">creative execution</span> if the on-call designer needs backup.
            </p>
            <p className="border-l-2 border-primary/50 pl-3 text-white/55">
              Not for finance (invoices, payments) or HR (leave, payroll, people issues). Use Finance / HR on the next
              business day or the portal directory.
            </p>
          </RuleCard>

          <RuleCard icon={Calendar} title="The expectation">
            <p>
              Sunday support runs as a half-day duty window: <span className="text-white">{onCall.responseTime}</span>.
              Be available in that window for genuine emergencies.
            </p>
          </RuleCard>

          <RuleCard icon={Shield} title="Escalation policy">
            <p>
              Loop in <span className="text-white">{sd}</span> for strategy, creative execution, or client handling (not
              finance or HR).
            </p>
            <p>
              <span className="text-primary">Founder / Management</span> only for massive pivots, major PR risk, or if a
              client threatens to leave. Routine Sunday work stays with PM + Designer + SD as needed.
            </p>
          </RuleCard>
        </div>
      </section>

      <section className="mt-14 space-y-6 md:mt-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">{onCall.weeklySectionTitle}</h2>
            <p className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">{onCall.weeklySectionSubtitle}</p>
          </div>
          <p className="max-w-md text-sm text-white/40">{onCall.rotaFootnote}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {weeklyRota.map((row, i) => (
            <article
              key={`${row.weekStartIso}-${i}`}
              className="flex flex-col border border-white/10 bg-white/3 p-5 transition-colors hover:border-primary/30"
            >
              <div className="mb-4 flex items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Week</p>
                  <p className="mt-1 text-xl font-bold text-white">{row.weekLabel}</p>
                  <p className="mt-0.5 text-xs text-white/40">All Sundays this week</p>
                </div>
                <span className="shrink-0 border border-white/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                  #{i + 1}
                </span>
              </div>
              <div className="space-y-3">
                <RosterSlot label="Project Manager" name={row.pm} />
                <RosterSlot label="Designer" name={row.designer} />
                <RosterSlot label="Strategic Director" name={row.strategicDirector} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 md:mt-16">
        <div className="border border-primary/25 bg-linear-to-br from-primary/8 to-transparent px-5 py-6 sm:px-8 sm:py-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Sunday requirement</h3>
          <ul className="mt-4 space-y-2 text-sm font-light text-white/70">
            <li className="flex gap-2">
              <span className="text-primary">-</span>
              Sunday duty is a <strong className="font-medium text-white">half-day</strong> window:{" "}
              <strong className="font-medium text-white">11:00 AM to 3:00 PM</strong>.
            </li>
          </ul>
          <p className="mt-4 text-xs text-white/45">Follow HR policy for approved exception handling.</p>
        </div>
      </section>
    </div>
  )
}
