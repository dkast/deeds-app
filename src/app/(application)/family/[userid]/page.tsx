import { type Metadata } from "next"
import { redirect } from "next/navigation"

import NavBar from "@/components/layout/nav-bar"
import ProfileEdit from "@/components/profile-edit"
import { ProfileLevel } from "@/components/profile-level"
import { ProfilePoints } from "@/components/profile-points"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export const metadata: Metadata = {
  title: "Perfil"
}

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

  if (!member) {
    return
  }

  return (
    <>
      <NavBar title="Perfil" />
      <div className="mt-20 mb-28 flex flex-col">
        <div className="flex flex-row px-4 items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-4">
              <span className="text-2xl font-semibold text-white">
                {member.name}
              </span>
              <ProfileEdit user={member} />
            </div>
            <ProfilePoints totalPoints={member.totalPoints} />
          </div>
          <div>
            {member.image ? (
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-neutral-900 bg-gray-400">
                <img src={member.image} alt="Avatar" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-400"></div>
            )}
          </div>
        </div>
        <div className="mt-4 px-4">
          <ProfileLevel levelPoints={member.levelPoints} />
        </div>
      </div>
    </>
  )
}
