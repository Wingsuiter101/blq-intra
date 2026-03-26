import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ADMIN_COOKIE, SITE_COOKIE, verifyToken } from "@/lib/auth"

export async function requireSiteAuth(nextPath: string) {
  const store = await cookies()
  const token = store.get(SITE_COOKIE)?.value
  if (!verifyToken(token, "site")) {
    redirect(`/auth/login?next=${encodeURIComponent(nextPath)}`)
  }
}

export async function requireAdminAuth(nextPath: string) {
  const store = await cookies()
  const token = store.get(ADMIN_COOKIE)?.value
  if (!verifyToken(token, "admin")) {
    redirect(`/auth/admin?next=${encodeURIComponent(nextPath)}`)
  }
}
