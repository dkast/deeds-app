import React from 'react'
import { Toaster } from 'react-hot-toast'

function Providers({children}: {children: React.ReactNode}) {
  return (
    <>
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
    </>
  )
}

export default Providers