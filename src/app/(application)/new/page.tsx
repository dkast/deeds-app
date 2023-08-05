import { redirect } from "next/navigation"

import DeedCreate from "@/components/deed-create"
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
      <DeedCreate userId={user.id} />
    </>
  )
}
