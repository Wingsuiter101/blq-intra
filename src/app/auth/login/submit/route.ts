import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SITE_COOKIE, getSiteCredentials, issueToken } from "@/lib/auth"

export async function POST(request: Request) {
  const form = await request.formData()
  const username = String(form.get("username") || "")
  const password = String(form.get("password") || "")
  const next = String(form.get("next") || "/")
  const { username: expectedUser, password: expectedPass } = getSiteCredentials()

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.redirect(new URL(`/auth/login?error=1&next=${encodeURIComponent(next)}`, request.url))
  }

  const store = await cookies()
  store.set(SITE_COOKIE, issueToken("site", 60 * 60 * 24 * 7), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.redirect(new URL(next || "/", request.url))
}
