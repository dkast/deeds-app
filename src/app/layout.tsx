import Providers from "@/app/providers"
import { Inter } from "next/font/google"

import "../styles/globals.css"

import { type Metadata } from "next"

export const metadata: Metadata = {
  title: {
    template: "%s | Deberes",
    default: "Deberes"
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png"
  },
  themeColor: "#252525",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    viewportFit: "cover",
    userScalable: false
  },
  appleWebApp: {
    title: "Deberes"
  }
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
})

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${inter.variable}`}>
      <body className="bg-zinc-950 text-white">
        <Providers>
          <div className="flex flex-col h-screen">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
