import { redirect } from "next/navigation"

import NavBar from "@/components/layout/nav-bar"
import { ProfileLevel } from "@/components/profile-level"
import { ProfilePoints } from "@/components/profile-points"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  const profile = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })

  return (
    <>
      <NavBar title="Perfil" />
      <div className="mb-28 flex flex-col">
        <div className="relative h-40 bg-violet-500">
          <div className="absolute -bottom-12 ml-4">
            {profile?.image ? (
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-neutral-900 bg-gray-400">
                <img src={profile.image} alt="Avatar" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-400"></div>
            )}
          </div>
        </div>
        <div className="ml-32 mt-2 flex items-center gap-2">
          <span className="text-xl font-semibold text-white">
            {profile?.name}
          </span>
          <div>
            {/* <button
              type="button"
              className="rounded-full bg-neutral-700/50 p-1"
              onClick={() => setOpen(true)}
            >
              <PencilIcon className="h-4 w-4 text-neutral-400"></PencilIcon>
            </button> */}
          </div>
        </div>
        <div className="mx-3 mt-10 grid grid-cols-2 gap-2">
          <ProfilePoints totalPoints={profile?.totalPoints} />
          <ProfileLevel levelPoints={profile?.levelPoints} />
        </div>
      </div>
    </>
  )
}