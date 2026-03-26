import type { SiteContent } from "@/lib/site-types"
import { DEFAULT_CLIENT_COMMS_FAQ, DEFAULT_CLIENT_COMMS_TEMPLATES } from "@/lib/site-defaults-client-comms"

const SD = "Saurav Dhungana"

export const DEFAULT_SITE_CONTENT: SiteContent = {
  version: 1,
  strategicDirector: SD,
  onCall: {
    protocolEyebrow: "Weekend protocol",
    pageTitle: "On-call roster",
    pageSubtitle:
      'Sunday skeleton crew by week: who covers each week, how escalation works, and what "on-call" means at BLQ.',
    responseTime: "11:00 AM to 3:00 PM",
    crewSummary: "1 PM + 1 Designer",
    weeklySectionTitle: "Weekly rota",
    weeklySectionSubtitle: "Who is on",
    rotaFootnote:
      "Same PM and Designer for every Sunday in that week. Sunday duty window is half-day: 11:00 AM to 3:00 PM.",
  },
  weeklyRota: [
    {
      weekLabel: "Week of Mar 30, 2026",
      weekStartIso: "2026-03-30",
      pm: "Mamata Karki",
      designer: "Utsav Singh",
      strategicDirector: SD,
    },
    {
      weekLabel: "Week of Apr 6, 2026",
      weekStartIso: "2026-04-06",
      pm: "Prakriti Adhikari",
      designer: "Kreesh Suwal",
      strategicDirector: SD,
    },
    {
      weekLabel: "Week of Apr 13, 2026",
      weekStartIso: "2026-04-13",
      pm: "Mamata Karki",
      designer: "Ram Hasda",
      strategicDirector: SD,
    },
    {
      weekLabel: "Week of Apr 20, 2026",
      weekStartIso: "2026-04-20",
      pm: "Prakriti Adhikari",
      designer: "Utsav Singh",
      strategicDirector: SD,
    },
    {
      weekLabel: "Week of Apr 27, 2026",
      weekStartIso: "2026-04-27",
      pm: "Mamata Karki",
      designer: "Kreesh Suwal",
      strategicDirector: SD,
    },
    {
      weekLabel: "Week of May 4, 2026",
      weekStartIso: "2026-05-04",
      pm: "Prakriti Adhikari",
      designer: "Ram Hasda",
      strategicDirector: SD,
    },
    {
      weekLabel: "Week of May 11, 2026",
      weekStartIso: "2026-05-11",
      pm: "Mamata Karki",
      designer: "Utsav Singh",
      strategicDirector: SD,
    },
    {
      weekLabel: "Week of May 18, 2026",
      weekStartIso: "2026-05-18",
      pm: "Prakriti Adhikari",
      designer: "Kreesh Suwal",
      strategicDirector: SD,
    },
  ],
  teamDirectory: [
    {
      name: "Roshan Niraula",
      designation: "CEO",
      email: "roshan@brandlogiq.org",
      note: "Agency leadership, executive decisions, and company-level matters only when appropriate.",
    },
    {
      name: "Saurav Dhungana",
      designation: "Strategic Director",
      email: "saurav@brandlogiq.org",
      note: "Strategy, creative direction, and execution escalations. Not for finance or HR.",
    },
    {
      name: "Surav Shrestha",
      designation: "Creative Director",
      email: "creative@brandlogiq.org",
      note: "Creative leadership, big ideas, campaign creative sign-off, and routing work across the creative team.",
    },
    {
      name: "Sangam Bohara",
      designation: "Sr. Copywriter",
      email: "sangam@brandlogiq.org",
      note: "Long-form copy, scripts, tone of voice, and headline-heavy work.",
    },
    {
      name: "Kreesh Suwal",
      designation: "Design Head",
      email: "kreesh@brandlogiq.org",
      note: "Design leadership, visual standards, and design reviews across the team.",
    },
    {
      name: "Utsav Singh",
      designation: "Associate Sr. Designer",
      email: "utsavsingh@brandlogiq.org",
      note: "Senior design deliverables and campaigns assigned to his pod.",
    },
    {
      name: "Ram Hasda",
      designation: "Junior Designer",
      email: "ram@brandlogiq.org",
      note: "Design support and production tasks under your PM or Design Head.",
    },
    {
      name: "Ritu Shahi",
      designation: "Sr. DM Associate",
      email: "ritu@brandlogiq.org",
      note: "Senior digital marketing and paid or organic campaign execution.",
    },
    {
      name: "Rasel Shakya",
      designation: "DM Associate",
      email: "rasel@brandlogiq.org",
      note: "Digital marketing support, reporting, and day-to-day DM tasks.",
    },
    {
      name: "Roses Shrestha",
      designation: "Sr. Creative Editor",
      email: "roses@brandlogiq.org",
      note: "Editing, proofreading, and quality control on creative before client send.",
    },
    {
      name: "Rojan Shrestha",
      designation: "Content Creator / Editor",
      email: "rojan@brandlogiq.org",
      note: "Short-form content, social edits, and asset adaptation for channels.",
    },
    {
      name: "Mamata Karki",
      designation: "Associate Sr. PM",
      email: "mamata@brandlogiq.org",
      note: "Project timelines, deliverables, and client coordination for accounts she leads.",
    },
    {
      name: "Prakriti Adhikari",
      designation: "Associate Sr. PM",
      email: "prakriti@brandlogiq.org",
      note: "Project timelines, deliverables, and client coordination for accounts she leads.",
    },
    {
      name: "Bishesh Shrestha",
      designation: "Client Servicing Executive",
      email: "bishesh@brandlogiq.org",
      note: "Day-to-day client servicing, requests, and coordination on assigned accounts.",
    },
    {
      name: "Utsav Subedi",
      designation: "Client Servicing Executive",
      email: "utsavsubedi@brandlogiq.org",
      note: "Day-to-day client servicing, requests, and coordination on assigned accounts.",
    },
    {
      name: "Puja Mahat",
      designation: "Admin / Front desk",
      email: "contact@brandlogiq.org",
      note: "Visitors, reception, front desk, and general office inquiries.",
    },
    {
      name: "Sarmila",
      designation: "HR",
      email: "hr@brandlogiq.org",
      note: "Leave, policies, onboarding, HR records, and people matters only.",
    },
    {
      name: "Sagar Thapa",
      designation: "Finance",
      email: "finance@brandlogiq.org",
      note: "Invoices, payments, reimbursements, and payroll queries only.",
    },
    {
      name: "General admin",
      designation: "Administration",
      email: "admin@brandlogiq.org",
      note: "General administrative mail and shared mailbox routing.",
    },
  ],
  clientComms: {
    pageTitle: "Client Comms",
    pageSubtitle:
      "Warm, clear language for clients: templates you can adapt, plus gentle ways to answer common questions.",
    faqSectionTitle: "Client FAQ: suggested responses",
    faqSectionSubtitle:
      "Tone to aim for: appreciative, calm, and clear. Acknowledge their perspective before you explain how BLQ works.",
    templates: DEFAULT_CLIENT_COMMS_TEMPLATES,
    faq: DEFAULT_CLIENT_COMMS_FAQ,
  },
}
