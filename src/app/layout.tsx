import "./globals.css"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
