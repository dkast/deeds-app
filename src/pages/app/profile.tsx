import React, { useState } from "react"
import NavBar from "@/src/components/NavBar"
import ProfileEditSheet from "@/src/components/ProfileEditSheet"
import { ProfileLevel } from "@/src/components/ProfileLevel"
import { ProfilePoints } from "@/src/components/ProfilePoints"
import Loader from "@/src/components/ui/Loader"
import { trpc } from "@/src/lib/trpc"
import type { NextPageWithAuthAndLayout } from "@/src/types/types"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import { PencilIcon } from "@heroicons/react/24/solid"
import { User } from "@prisma/client"
import { signOut, useSession } from "next-auth/react"

import AppLayout from "@/components/layout/AppLayout"

const Profile: NextPageWithAuthAndLayout = () => {
  const [open, setOpen] = useState<boolean>(false)
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
        <div className="ml-32 mt-2 flex items-center gap-2">
          <span className="text-xl font-semibold text-white">{user?.name}</span>
          <div>
            <button
              type="button"
              className="rounded-full bg-neutral-700/50 p-1"
              onClick={() => setOpen(true)}
            >
              <PencilIcon className="h-4 w-4 text-neutral-400"></PencilIcon>
            </button>
          </div>
        </div>
        <div className="mx-3 mt-10 grid grid-cols-2 gap-2">
          <ProfilePoints totalPoints={user?.totalPoints} />
          <ProfileLevel levelPoints={user?.levelPoints} />
        </div>
      </div>
      <ProfileEditSheet open={open} setOpen={setOpen} user={user!} />
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
