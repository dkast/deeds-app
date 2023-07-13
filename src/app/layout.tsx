import "../styles/globals.css"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="bg-neutral-900 text-white">
        <div className="flex flex-col h-screen">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  )
}
