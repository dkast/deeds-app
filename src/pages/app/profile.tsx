import React from "react"
import { signOut, useSession } from "next-auth/react"
import * as Progress from "@radix-ui/react-progress"

import AppLayout from "@/components/layout/AppLayout"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/components/Loader"
import NavBar from "@/src/components/NavBar"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"

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
          <div className="flex flex-col items-start justify-center rounded-xl bg-neutral-800 p-4">
            <span className="mb-4 text-2xl font-semibold text-white">
              {user?.totalPoints}
            </span>
            <span className="flex items-center gap-2 text-neutral-400">
              <img src="../images/gem.svg" className="h-4 w-4" alt="coin" />{" "}
              puntos
            </span>
          </div>
          <div className="flex flex-col items-start justify-center rounded-xl bg-neutral-800 p-4">
            <span className="mb-6 text-2xl font-semibold text-white">
              Nivel {getLevel(user?.levelPoints)}
            </span>
            <Progress.Root
              value={getPct(user?.levelPoints)}
              className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-900"
            >
              <Progress.ProgressIndicator
                style={{ width: `${getPct(user?.levelPoints)}%` }}
                className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-400 duration-300 ease-in-out"
              />
            </Progress.Root>
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

function getPct(levelPoints: number | undefined): number {
  const points = !levelPoints ? 0 : levelPoints % 1000
  const pct = Math.round((points / 1000) * 100)
  return pct
}

function getLevel(levelPoints: number | undefined): number {
  const level = !levelPoints ? 1 : Math.floor(levelPoints / 1000) + 1
  return level
}

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
