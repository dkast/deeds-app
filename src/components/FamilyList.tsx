import React from "react"
import { useSession } from "next-auth/react"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/components/Loader"

const FamilyList = () => {
  const { data: session, status } = useSession()
  const { data: users, isLoading } = trpc.useQuery(
    ["user.getFamilyMembers", { familyId: session?.user?.familyId }],
    {
      enabled: !!session?.user
    }
  )

  if (isLoading || status === "loading") return <Loader />

  return (
    <div className="mt-6 px-3">
      {users?.map(user => {
        return (
          <div key={user.id}>
            <div className="flex flex-row items-center rounded-xl bg-neutral-800 px-4 py-3">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-400">
                <img src={user.image as string | undefined} alt="Avatar" />
              </div>
              <div className="ml-6 flex flex-col">
                <span className="font-semibold text-violet-500">
                  {user.name}
                </span>
                <span className="text-white">{user.totalPoints} puntos</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FamilyList
