import type { NextConfig } from "next"

const staticExport = process.env.STATIC_EXPORT === "1"
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || ""

const nextConfig: NextConfig = {
  ...(staticExport && { output: "export" }),
  ...(basePath ? { basePath } : {}),
  trailingSlash: staticExport,
  images: {
    unoptimized: staticExport,
  },
}

export default nextConfig
