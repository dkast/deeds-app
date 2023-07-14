import { redirect } from "next/navigation"

import CreateDeed from "@/components/create-deed"
import NavBar from "@/components/layout/nav-bar"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export default async function NewPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  return (
    <>
      <NavBar title="Agregar" />
      <CreateDeed />
    </>
  )
}
