import { redirect } from "next/navigation"

import NavBar from "@/components/layout/nav-bar"
import { ProfileLevel } from "@/components/profile-level"
import { ProfilePoints } from "@/components/profile-points"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export default async function userPage({
  params
}: {
  params: { userid: string }
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  const member = await prisma.user.findUnique({
    where: {
      id: params.userid
    }
  })

  return (
    <>
      <NavBar title="Perfil" />
      <div className="mb-28 flex flex-col">
        <div className="relative h-40 bg-violet-500">
          <div className="absolute -bottom-12 ml-4">
            {member?.image ? (
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-neutral-900 bg-gray-400">
                <img src={member.image} alt="Avatar" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-400"></div>
            )}
          </div>
        </div>
        <div className="ml-32 mt-2">
          <span className="text-xl font-semibold text-white">
            {member?.name}
          </span>
        </div>
        <div className="mx-3 mt-10 grid grid-cols-2 gap-2">
          <ProfilePoints totalPoints={member?.totalPoints} />
          <ProfileLevel levelPoints={member?.levelPoints} />
        </div>
      </div>
    </>
  )
}
