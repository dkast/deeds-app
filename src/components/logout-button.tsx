"use client"

import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
  return (
    <button onClick={() => signOut()}>
      <LogOut className="text-white" size={24} />
    </button>
  )
}
