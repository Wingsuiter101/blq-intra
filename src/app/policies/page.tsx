import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download } from "lucide-react"

export default function Policies() {
  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-700">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase">HR & Policies</h1>
        <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide">
          Official guidelines and documentation for the 5-day work week transition.
        </p>
      </div>

      <div className="border-t border-white/10 pt-8">
        <Accordion className="w-full">
          <AccordionItem value="memo" className="border-white/10 py-4">
            <AccordionTrigger className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
              The Internal Memo
            </AccordionTrigger>
            <AccordionContent className="text-lg text-white/60 space-y-6 leading-relaxed pt-4 font-light">
              <p>
                <strong className="text-white">Subject: Transition to a 5-Day Work Week</strong>
              </p>
              <p>
                Team, we are thrilled to announce that effective immediately, Brandlogiq (BLQ) is officially transitioning from a 6-day to a 5-day work week. Our new core operating hours will be Monday through Friday, 9:00 AM to 6:00 PM.
              </p>
              <p>
                This change is designed to give you more time to rest, recharge, and pursue personal passions. We believe that better rest leads to better work. While Saturdays will be completely off, Sundays will operate with an on-call skeleton crew to handle critical client emergencies.
              </p>
              <p>
                Let&apos;s make this transition smooth and show our clients that our efficiency and creativity are stronger than ever.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="attendance-leaves" className="border-white/10 py-4">
            <AccordionTrigger className="text-2xl font-bold tracking-tight text-primary hover:text-primary/80 transition-colors">
              Strict Attendance & Leave Policy
            </AccordionTrigger>
            <AccordionContent className="text-lg text-white/60 space-y-8 leading-relaxed pt-4 font-light">
              <p>
                With the transition to a 5-day work week, our time in the office is more critical than ever. The following strict policies are now in effect:
              </p>
              <div className="space-y-8 pl-4 border-l border-primary/50">
                <div>
                  <h4 className="font-bold text-white tracking-wide uppercase text-sm mb-2">Morning Arrival</h4>
                  <p>
                    All employees must be in the office by <strong className="text-primary">9:15 AM</strong> at the latest on working days. Tardiness will not be tolerated under the new compressed schedule.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-wide uppercase text-sm mb-2">Monday Leaves Restriction</h4>
                  <p>
                    Mondays set the tone for our entire week. Therefore, <strong className="text-white">Mondays cannot be utilized for standard employee-sanctioned leaves</strong> (e.g., casual leaves, vacation days). Monday absences are strictly reserved for verified medical or family emergencies only.
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="comp-off" className="border-white/10 py-4">
            <AccordionTrigger className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
              Comp-Off Policy
            </AccordionTrigger>
            <AccordionContent className="text-lg text-white/60 space-y-6 leading-relaxed pt-4 font-light">
              <p>
                For those assigned to the Sunday Skeleton Crew or required to work on weekends for approved emergencies, the following Compensatory Off (Comp-Off) rules apply:
              </p>
              <ul className="list-disc pl-6 space-y-4 marker:text-primary">
                <li>
                  <strong className="text-white">Half-Day Comp-Off:</strong> Granted for approved weekend work lasting under 4 hours.
                </li>
                <li>
                  <strong className="text-white">Full-Day Comp-Off:</strong> Granted for approved weekend work lasting over 4 hours.
                </li>
              </ul>
              <div className="mt-8 p-6 border border-primary/30 bg-primary/5">
                <strong className="text-primary uppercase tracking-widest text-sm block mb-2">Important</strong> 
                All Comp-Offs must be utilized within <strong className="text-white">30 days</strong> of accrual. They cannot be encashed or carried forward beyond this period.
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="labor-law" className="border-white/10 py-4">
            <AccordionTrigger className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
              Labor Law Compliance
            </AccordionTrigger>
            <AccordionContent className="text-lg text-white/60 space-y-6 leading-relaxed pt-4 font-light">
              <p>
                <strong className="text-white">Nepal Labor Act Compliance Note:</strong>
              </p>
              <p>
                Under the current Labor Act of Nepal, the maximum standard working hours are capped at 48 hours per week (8 hours per day over 6 days). 
              </p>
              <p>
                By shifting to a 9:00 AM to 6:00 PM schedule (which includes a 1-hour mandatory lunch/rest break), our effective working hours are 8 hours per day. Over a 5-day week, this totals 40 hours, which is well within the legal limits and ensures full compliance while providing an extra day of rest.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="addendums" className="border-white/10 py-4">
            <AccordionTrigger className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
              Contract Addendums
            </AccordionTrigger>
            <AccordionContent className="text-lg text-white/60 space-y-6 leading-relaxed pt-4 font-light">
              <p>
                Please download, sign, and return your updated contract addendum reflecting the new working hours and comp-off structure.
              </p>
              <a href="#" className="group inline-flex items-center gap-4 p-6 border border-white/10 hover:border-primary transition-colors w-full md:w-auto">
                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-primary transition-colors">Employment Contract Addendum (2026)</p>
                  <p className="text-sm text-white/40 mt-1">PDF Document • 124 KB</p>
                </div>
                <Download className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
              </a>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  )
}
