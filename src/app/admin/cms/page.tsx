import { CmsAdminForm } from "@/components/cms-admin-form"
import { getSiteContent } from "@/lib/site-content"

export default async function CmsAdminPage() {
  const initialData = await getSiteContent()
  return <CmsAdminForm initialData={initialData} />
}
