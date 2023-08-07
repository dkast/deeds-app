"use client"

import * as Progress from "@radix-ui/react-progress"

import { getLevel, getPct } from "@/lib/utils"

type ProfileLevelProps = {
  levelPoints: number | undefined
}
export const ProfileLevel = ({ levelPoints }: ProfileLevelProps) => {
  return (
    <div className="flex flex-col items-start justify-center gap-2 rounded-xl bg-neutral-800 p-4">
      <span className="text-2xl font-semibold text-white">
        Nivel {getLevel(levelPoints)}
      </span>
      <span className="text-neutral-400">
        {levelPoints} / {getLevel(levelPoints) * 1000}
      </span>
      <Progress.Root
        value={getPct(levelPoints)}
        className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-900"
      >
        <Progress.ProgressIndicator
          style={{ width: `${getPct(levelPoints)}%` }}
          className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-400 duration-300 ease-in-out"
        />
      </Progress.Root>
    </div>
  )
}

function getPointsNextLevel(levelPoints: number | undefined): number {
  const remaining = !levelPoints ? 1000 : levelPoints % 1000
  return remaining
}
