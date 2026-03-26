import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createClient } from "@sanity/client"
import { ADMIN_COOKIE, SITE_COOKIE, verifyToken } from "@/lib/auth"
import { getSiteContent, normalizeSiteContent } from "@/lib/site-content"
import type { SiteContent } from "@/lib/site-types"

export const runtime = "nodejs"

function ensureAdmin(store: Awaited<ReturnType<typeof cookies>>) {
  const siteToken = store.get(SITE_COOKIE)?.value
  const adminToken = store.get(ADMIN_COOKIE)?.value
  return verifyToken(siteToken, "site") && verifyToken(adminToken, "admin")
}

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-25"
  const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN
  if (!projectId || !dataset || !token) return null

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    perspective: "published",
  })
}

export async function GET() {
  const store = await cookies()
  if (!ensureAdmin(store)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const data = await getSiteContent()
  return NextResponse.json({ data })
}

export async function PUT(request: Request) {
  const store = await cookies()
  if (!ensureAdmin(store)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const data = normalizeSiteContent((body as { data?: SiteContent }).data)
  const client = getWriteClient()
  if (!client) {
    return NextResponse.json(
      {
        error:
          "Missing SANITY write configuration. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN.",
      },
      { status: 503 },
    )
  }

  await client.createOrReplace({
    _id: "siteContent",
    _type: "siteContent",
    ...data,
  })

  return NextResponse.json({ ok: true })
}
