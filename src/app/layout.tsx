import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TopNav } from "@/components/layout/top-nav"
import { DirectoryFab } from "@/components/directory-fab"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BLQ | 5 Days",
  description: "Internal portal for BLQ employees. 5 Days. Better Work. Better Rest.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.className} antialiased min-h-screen bg-black text-white selection:bg-primary selection:text-white`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <TopNav />
            <main className="flex-1 container mx-auto px-6 md:px-12 py-16 md:py-24">
              {children}
            </main>
            <DirectoryFab />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
