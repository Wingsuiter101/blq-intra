import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { ADMIN_COOKIE, SITE_COOKIE } from "@/lib/auth"

export async function POST(request: Request) {
  const store = await cookies()
  store.delete(SITE_COOKIE)
  store.delete(ADMIN_COOKIE)
  return NextResponse.redirect(new URL("/auth/login", request.url))
}
