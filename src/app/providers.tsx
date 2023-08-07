"use client"

import React from "react"
import { Toaster } from "react-hot-toast"
import { SessionProvider } from "next-auth/react"

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#6d28d9",
            color: "#fff"
          }
        }}
      />
    </SessionProvider>
  )
}

export default Providers
