import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Site CMS | BLQ Portal",
  description: "Edit internal portal copy, roster, and directory.",
  robots: { index: false, follow: false },
}

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return children
}
