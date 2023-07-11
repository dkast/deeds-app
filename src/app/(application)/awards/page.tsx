import { redirect } from "next/navigation"

import AwardList from "@/components/award-list"
import NavBar from "@/components/layout/nav-bar"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export default async function AwardsPage() {
  const user = await getCurrentUser()

  const awards = await prisma.award.findMany()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  return (
    <>
      <NavBar title="Premios" />
      <div className="mt-20 mb-28">
        <AwardList awards={awards} userRole={user.role} />
      </div>
    </>
  )
}
