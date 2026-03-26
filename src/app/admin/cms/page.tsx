import { CmsDashboard } from "@/components/cms-dashboard"
import { requireAdminAuth, requireSiteAuth } from "@/lib/auth-guard"
import { getSiteContent } from "@/lib/site-content"

export default async function CmsAdminPage() {
  await requireSiteAuth("/admin/cms")
  await requireAdminAuth("/admin/cms")

  const content = await getSiteContent()
  const sanityConfigured = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET &&
      (process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN),
  )
  const hostingTarget = process.env.VERCEL ? "vercel" : "static"

  return <CmsDashboard initialData={content} sanityConfigured={sanityConfigured} hostingTarget={hostingTarget} />
}
