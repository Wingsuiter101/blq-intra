import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { getSiteContent, saveSiteContent } from "@/lib/site-content"
import type { SiteContent } from "@/lib/site-types"

export const runtime = "nodejs"

/** Public read: headless JSON (treat as a small CDN for integrations). */
export async function GET() {
  const data = await getSiteContent()
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  })
}

/** Protected write: set CMS_SECRET in env; send Authorization: Bearer <secret> */
export async function POST(request: Request) {
  const secret = process.env.CMS_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: "CMS is not configured (missing CMS_SECRET on the server)." },
      { status: 503 },
    )
  }

  const auth = request.headers.get("authorization")
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const parsed = body as SiteContent
  if (parsed?.version !== 1) {
    return NextResponse.json({ error: "Body must be site content with version: 1" }, { status: 400 })
  }

  try {
    await saveSiteContent(parsed)
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Write failed"
    return NextResponse.json({ error: msg }, { status: 500 })
  }

  revalidatePath("/directory")
  revalidatePath("/on-call-roster")
  revalidatePath("/client-comms")
  revalidatePath("/admin/cms")

  return NextResponse.json({ ok: true })
}
