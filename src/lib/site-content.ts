import { readFile } from "fs/promises"
import { join } from "path"
import { createClient } from "@sanity/client"
import { DEFAULT_SITE_CONTENT } from "@/lib/site-defaults"
import type { SiteContent } from "@/lib/site-types"

const SITE_JSON = join(process.cwd(), "src", "content", "site.json")
export const SANITY_SITE_CONTENT_QUERY = `*[_type == "siteContent" && _id == "siteContent"][0]{
  version,
  strategicDirector,
  onCall,
  weeklyRota[]{
    weekLabel,
    weekStartIso,
    pm,
    designer,
    strategicDirector
  },
  teamDirectory[]{
    name,
    designation,
    email,
    note
  },
  clientComms{
    pageTitle,
    pageSubtitle,
    faqSectionTitle,
    faqSectionSubtitle,
    templates[]{
      title,
      content,
      fullWidth,
      dangerTag,
      whenToUse
    },
    faq[]{
      question,
      answer
    }
  }
}`

export function normalizeSiteContent(raw: unknown): SiteContent {
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

function getSanityClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-25"
  const token = process.env.SANITY_API_READ_TOKEN

  if (!projectId || !dataset) return null

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !token,
    token,
    perspective: "published",
  })
}

async function getSanitySiteContent(): Promise<SiteContent | null> {
  try {
    const client = getSanityClient()
    if (!client) return null

    const row = await client.fetch<unknown>(SANITY_SITE_CONTENT_QUERY)
    return normalizeSiteContent(row)
  } catch {
    return null
  }
}

async function getFileSiteContent(): Promise<SiteContent | null> {
  try {
    const text = await readFile(SITE_JSON, "utf-8")
    return normalizeSiteContent(JSON.parse(text))
  } catch {
    return null
  }
}

/** Loads site content from Sanity first, then local JSON fallback. */
export async function getSiteContent(): Promise<SiteContent> {
  const sanity = await getSanitySiteContent()
  if (sanity) return sanity

  const file = await getFileSiteContent()
  if (file) return file

  return DEFAULT_SITE_CONTENT
}
