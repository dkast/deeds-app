import { type Metadata } from "next"
import { redirect } from "next/navigation"

import DeedCreate from "@/components/deed-create"
import NavBar from "@/components/layout/nav-bar"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Agregar"
}

export default async function NewPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })

  if (!userData) {
    return
  }

  return (
    <>
      <NavBar title="Agregar" />
      <DeedCreate user={userData} />
    </>
  )
}
