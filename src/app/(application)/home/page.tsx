import { type Metadata } from "next"
import { redirect } from "next/navigation"

import NavBar from "@/components/layout/nav-bar"
import Timeline from "@/components/timeline"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Inicio"
}

export default async function HomePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  const deeds = await prisma.deed.findMany({
    include: {
      User: true
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 20
  })

  return (
    <>
      <NavBar title="Inicio" />
      <div className="mt-20 mb-28">
        <Timeline deeds={deeds} />
      </div>
    </>
  )
}
