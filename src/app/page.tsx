import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-32 animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="space-y-8">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase leading-[0.85]">
          5 Days.<br />
          <span className="text-white/20">Better Work.</span><br />
          <span className="text-primary">Better Rest.</span>
        </h1>
        <p className="text-xl md:text-3xl text-white/50 max-w-3xl font-light tracking-wide leading-relaxed">
          The new rhythm at Brandlogiq: a five-day week designed to keep our team sharp, sustainable, and fully present for the work you trust us with.
        </p>
      </section>

      {/* Stats Grid */}
      <section className="grid md:grid-cols-2 gap-16 border-t border-white/10 pt-16">
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Core Hours</h3>
          <p className="text-5xl md:text-6xl font-light tracking-tighter">09:00 to 18:00</p>
          <div className="space-y-2 text-white/50 text-lg font-light">
            <p><strong className="text-white font-medium">Monday to Friday.</strong></p>
            <p>In office by 9:15 AM latest.</p>
            <p>No standard leaves on Mondays.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Weekend Protocol</h3>
          <p className="text-5xl md:text-6xl font-light tracking-tighter">Skeleton Crew</p>
          <div className="space-y-2 text-white/50 text-lg font-light">
            <p><strong className="text-white font-medium">Saturdays strictly off.</strong></p>
            <p>Sundays on-call for critical emergencies only.</p>
            <p>30-60 minute response expectation.</p>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 border-t border-white/10 pt-16">
        <Link href="/policies" className="group block space-y-4">
          <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors flex items-center justify-between">
            Policies 
            <ArrowRight className="w-8 h-8 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Read the official memo, labor law compliance, and comp-off rules.
          </p>
        </Link>

        <Link href="/client-comms" className="group block space-y-4">
          <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors flex items-center justify-between">
            Client Comms 
            <ArrowRight className="w-8 h-8 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Warm, clear language and talking points for client conversations.
          </p>
        </Link>

        <Link href="/on-call-roster" className="group block space-y-4">
          <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors flex items-center justify-between">
            On-Call Roster 
            <ArrowRight className="w-8 h-8 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Monthly Sunday on-call rota and escalation protocol.
          </p>
        </Link>

        <Link href="/it-ops" className="group block space-y-4">
          <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors flex items-center justify-between">
            IT &amp; Ops
            <ArrowRight className="w-8 h-8 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Naming, OneDrive, backups, and email etiquette.
          </p>
        </Link>

        <Link href="/directory" className="group block space-y-4">
          <h2 className="text-3xl font-bold tracking-tight group-hover:text-primary transition-colors flex items-center justify-between">
            Email repository
            <ArrowRight className="w-8 h-8 opacity-0 -translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
          </h2>
          <p className="text-white/40 text-lg font-light leading-relaxed">
            Full team list: names, roles, and mailboxes in one place.
          </p>
        </Link>
      </section>
    </div>
  )
}
