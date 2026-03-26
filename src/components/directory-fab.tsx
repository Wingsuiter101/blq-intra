import { getSiteContent } from "@/lib/site-content"
import { DirectoryFabClient } from "@/components/directory-fab-client"

export async function DirectoryFab() {
  const { teamDirectory } = await getSiteContent()
  return <DirectoryFabClient rows={teamDirectory} />
}
