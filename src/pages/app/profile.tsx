import React from "react"
import { useSession } from "next-auth/react"

import AppLayout from "@/components/layout/AppLayout"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/components/Loader"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

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
      <title>Deberes - Perfil</title>
      <div className="mb-28 flex flex-col">
        <div className="relative h-40 bg-orange-500">
          <div className="absolute -bottom-12 ml-4">
            {user?.image ? (
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-neutral-800 bg-gray-400">
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
        <div className="mx-3 mt-10 grid grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl bg-neutral-800 p-2">
            <span className="text-xl text-white">{user?.totalPoints}</span>
            <span className="flex items-center gap-2 text-neutral-400">
              <img src="../images/gem.svg" className="h-4 w-4" alt="coin" />{" "}
              puntos
            </span>
          </div>
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
