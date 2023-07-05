import { redirect } from "next/navigation"

import NavBar from "@/components/layout/nav-bar"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  return (
    <>
      <NavBar title="Inicio" />
      <div className="mt-20 mb-28">Home</div>
    </>
  )
}
