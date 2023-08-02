import Providers from "@/app/providers"

import "../styles/globals.css"

export default function RootLayout({
  children,
  sheet
}: {
  children: React.ReactNode
  sheet: React.ReactNode
}) {
  return (
    <html>
      <body className="bg-neutral-900 text-white">
        <Providers>
          <div className="flex flex-col h-screen">
            <main className="flex-1">{children}</main>
            {sheet}
          </div>
        </Providers>
      </body>
    </html>
  )
}
