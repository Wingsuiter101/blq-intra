/** Row in the email / “who to approach” directory */
export type TeamDirectoryRow = {
  name: string
  designation: string
  email: string
  /** When to use this contact, what they own, or routing guidance */
  note: string
}

/** One week of Sunday on-call coverage */
export type WeeklyRotaRow = {
  /** Human label, e.g. “Week of Apr 6, 2026” */
  weekLabel: string
  /** Monday of that week (ISO date) for sorting */
  weekStartIso: string
  pm: string
  designer: string
  strategicDirector: string
}

export type ClientCommsTemplate = {
  title: string
  content: string
  fullWidth?: boolean
  dangerTag?: string
  whenToUse?: string
}

export type ClientCommsFaqItem = {
  question: string
  answer: string
}

export type SiteContent = {
  version: 1
  strategicDirector: string
  /** Hero / strip copy on on-call page */
  onCall: {
    protocolEyebrow: string
    pageTitle: string
    pageSubtitle: string
    responseTime: string
    crewSummary: string
    weeklySectionTitle: string
    weeklySectionSubtitle: string
    rotaFootnote: string
  }
  weeklyRota: WeeklyRotaRow[]
  teamDirectory: TeamDirectoryRow[]
  clientComms: {
    pageTitle: string
    pageSubtitle: string
    faqSectionTitle: string
    faqSectionSubtitle: string
    templates: ClientCommsTemplate[]
    faq: ClientCommsFaqItem[]
  }
}
