import React from "react"
import { signOut, useSession } from "next-auth/react"

import AppLayout from "@/components/layout/AppLayout"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/components/Loader"
import NavBar from "@/src/components/NavBar"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import { ProfileLevel } from "@/src/components/ProfileLevel"
import { ProfilePoints } from "@/src/components/ProfilePoints"

const Profile: NextPageWithAuthAndLayout = () => {
  const { data: session, status } = useSession()
  const { data: user, isLoading } = trpc.useQuery(
    ["user.getUser", { userId: session?.user?.id }],
    {
      enabled: !!session?.user
    }
  )

  if (isLoading || status === "loading") return <Loader />

  return (
    <>
      <NavBar
        title="Perfil"
        rightItem={<LogoutButton onClick={() => signOut()} />}
      />
      <div className="mb-28 flex flex-col">
        <div className="relative h-40 bg-violet-500">
          <div className="absolute -bottom-12 ml-4">
            {user?.image ? (
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-neutral-900 bg-gray-400">
                <img src={user.image} alt="Avatar" />
              </div>
            ) : (
              <div className="h-8 w-8 rounded-full bg-gray-400"></div>
            )}
          </div>
        </div>
        <div className="ml-32 mt-2">
          <span className="text-xl font-semibold text-white">{user?.name}</span>
        </div>
        <div className="mx-3 mt-10 grid grid-cols-2 gap-2">
          <ProfilePoints totalPoints={user?.totalPoints} />
          <ProfileLevel levelPoints={user?.levelPoints} />
        </div>
      </div>
    </>
  )
}

Profile.auth = true
Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Profile

type LogoutButtonProps = {
  onClick: () => void
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button onClick={onClick}>
      <ArrowLeftOnRectangleIcon className="h-6 w-6 rotate-180 text-white" />
    </button>
  )
}
