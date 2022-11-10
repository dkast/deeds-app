import React, { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { ChevronUpIcon, StarIcon } from "@heroicons/react/20/solid"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/ui/Loader"
import getLevel from "@/src/utils/getLevel"
import ExchangeSheet from "@/components/ExchangeSheet"

const FamilyList = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const { data: session, status } = useSession()
  const { data: users, isLoading } = trpc.useQuery(
    ["user.getFamilyMembers", { familyId: session?.user?.familyId }],
    {
      enabled: !!session?.user
    }
  )

  if (isLoading || status === "loading") return <Loader />

  const openModal = (id: string): void => {
    setSelectedUserId(id)
    setOpen(true)
  }

  return (
    <>
      <div className="mt-6 flex flex-col gap-2 px-3">
        {users?.map(user => {
          return (
            <div key={user.id}>
              <div className="flex flex-row items-center rounded-xl bg-neutral-800 px-4 py-3">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-400">
                  <Link href={`/app/member/${user?.id}`}>
                    <img src={user.image as string | undefined} alt="Avatar" />
                  </Link>
                </div>
                <div className="ml-6 flex grow flex-col justify-between gap-2">
                  <Link
                    href={`/app/member/${user?.id}`}
                    className="text-xl font-semibold text-violet-400"
                  >
                    {user.name}
                  </Link>
                  <div className="flex gap-6">
                    <div className="flex items-end gap-2">
                      <StarIcon className="h-5 w-5 rounded-full bg-neutral-600/40 p-1 text-neutral-400" />
                      <span className="text-sm text-neutral-400">
                        {user.totalPoints} puntos
                      </span>
                    </div>
                    <div className="flex items-end gap-2">
                      <ChevronUpIcon className="h-5 w-5 rounded-full bg-neutral-600/40 p-1 text-neutral-400" />
                      <span className="text-sm text-neutral-400">
                        Nivel {getLevel(user.levelPoints)}
                      </span>
                    </div>
                  </div>
                </div>
                {session?.user?.role === "PARENT" && (
                  <button onClick={() => openModal(user.id)}>
                    <EllipsisVerticalIcon className="h-6 w-6 text-neutral-400" />
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
      <ExchangeSheet open={open} setOpen={setOpen} userId={selectedUserId} />
    </>
  )
}

export default FamilyList
