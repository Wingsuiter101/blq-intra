import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ADMIN_COOKIE, SITE_COOKIE, getAdminPassword, issueToken, verifyToken } from "@/lib/auth"

export async function POST(request: Request) {
  const store = await cookies()
  const siteToken = store.get(SITE_COOKIE)?.value
  if (!verifyToken(siteToken, "site")) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  const form = await request.formData()
  const password = String(form.get("password") || "")
  const next = String(form.get("next") || "/admin/cms")
  const expected = getAdminPassword()

  if (password !== expected) {
    return NextResponse.redirect(new URL(`/auth/admin?error=1&next=${encodeURIComponent(next)}`, request.url))
  }

  store.set(ADMIN_COOKIE, issueToken("admin", 60 * 60 * 12), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })

  return NextResponse.redirect(new URL(next || "/admin/cms", request.url))
}
