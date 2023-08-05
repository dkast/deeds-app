import { redirect } from "next/navigation"

import DeedCreate from "@/components/deed-create"
import NavBar from "@/components/layout/nav-bar"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export default async function NewPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  const data = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })

  if (!data) {
    return
  }

  return (
    <>
      <NavBar title="Agregar" />
      <DeedCreate userId={user.id} levelPoints={data.levelPoints} />
    </>
  )
}
