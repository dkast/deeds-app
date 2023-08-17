"use client"

import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button onClick={() => signOut()}>
      <ArrowLeftOnRectangleIcon className="h-6 w-6 text-white" />
    </button>
  )
}
