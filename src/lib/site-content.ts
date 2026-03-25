import { readFile } from "fs/promises"
import { join } from "path"
import type { SiteContent } from "@/lib/site-types"
import { DEFAULT_SITE_CONTENT } from "@/lib/site-defaults"

const SITE_JSON = join(process.cwd(), "src", "content", "site.json")

function normalizeSiteContent(raw: unknown): SiteContent {
  if (!raw || typeof raw !== "object") return DEFAULT_SITE_CONTENT
  const r = raw as Partial<SiteContent>
  if (r.version !== 1) return DEFAULT_SITE_CONTENT
  const cc = r.clientComms
  return {
    ...DEFAULT_SITE_CONTENT,
    ...r,
    strategicDirector: r.strategicDirector ?? DEFAULT_SITE_CONTENT.strategicDirector,
    onCall: { ...DEFAULT_SITE_CONTENT.onCall, ...r.onCall },
    weeklyRota: Array.isArray(r.weeklyRota) ? r.weeklyRota : DEFAULT_SITE_CONTENT.weeklyRota,
    teamDirectory: Array.isArray(r.teamDirectory) ? r.teamDirectory : DEFAULT_SITE_CONTENT.teamDirectory,
    clientComms: {
      ...DEFAULT_SITE_CONTENT.clientComms,
      ...cc,
      pageTitle: cc?.pageTitle ?? DEFAULT_SITE_CONTENT.clientComms.pageTitle,
      pageSubtitle: cc?.pageSubtitle ?? DEFAULT_SITE_CONTENT.clientComms.pageSubtitle,
      faqSectionTitle: cc?.faqSectionTitle ?? DEFAULT_SITE_CONTENT.clientComms.faqSectionTitle,
      faqSectionSubtitle: cc?.faqSectionSubtitle ?? DEFAULT_SITE_CONTENT.clientComms.faqSectionSubtitle,
      templates: Array.isArray(cc?.templates) ? cc.templates : DEFAULT_SITE_CONTENT.clientComms.templates,
      faq: Array.isArray(cc?.faq) ? cc.faq : DEFAULT_SITE_CONTENT.clientComms.faq,
    },
  }
}

/** Loads site content at build time (static export) or request time (Node server). */
export async function getSiteContent(): Promise<SiteContent> {
  try {
    const text = await readFile(SITE_JSON, "utf-8")
    return normalizeSiteContent(JSON.parse(text))
  } catch {
    return DEFAULT_SITE_CONTENT
  }
}
