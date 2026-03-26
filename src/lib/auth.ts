import { createHmac, timingSafeEqual } from "crypto"

export const SITE_COOKIE = "blq_site_session"
export const ADMIN_COOKIE = "blq_admin_session"

function authSecret(): string {
  return process.env.AUTH_SECRET || "dev-auth-secret-change-me"
}

function hmac(input: string): string {
  return createHmac("sha256", authSecret()).update(input).digest("hex")
}

export function issueToken(kind: "site" | "admin", maxAgeSeconds: number): string {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds
  const payload = `${kind}.${exp}`
  const sig = hmac(payload)
  return `${exp}.${sig}`
}

export function verifyToken(token: string | undefined, kind: "site" | "admin"): boolean {
  if (!token) return false
  const [expRaw, sig] = token.split(".")
  if (!expRaw || !sig) return false
  const exp = Number(expRaw)
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false

  const expected = hmac(`${kind}.${exp}`)
  const sigBuf = Buffer.from(sig)
  const expectedBuf = Buffer.from(expected)
  if (sigBuf.length !== expectedBuf.length) return false

  return timingSafeEqual(sigBuf, expectedBuf)
}

export function getSiteCredentials() {
  return {
    username: process.env.AUTH_USERNAME || "blq",
    password: process.env.AUTH_PASSWORD || "change-me",
  }
}

export function getAdminPassword() {
  return process.env.AUTH_ADMIN_PASSWORD || "change-admin-me"
}
