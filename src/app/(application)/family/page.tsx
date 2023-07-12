import { redirect } from "next/navigation"

import FamilyList from "@/components/family-list"
import NavBar from "@/components/layout/nav-bar"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export default async function FamilyPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  const familyMembers = await prisma.user.findMany({
    where: {
      familyId: user.familyId
    }
  })

  return (
    <>
      <NavBar title="Familia" />
      <div className="mt-20 mb-28">
        <FamilyList members={familyMembers} userRole={user.role} />
      </div>
    </>
  )
}
