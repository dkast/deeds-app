import "./globals.css"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col h-screen bg-neutral-900 text-white">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
