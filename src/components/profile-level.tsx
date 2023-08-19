"use client"

import * as Progress from "@radix-ui/react-progress"

import { getLevel, getPct } from "@/lib/utils"

type ProfileLevelProps = {
  levelPoints: number | undefined
}
export const ProfileLevel = ({ levelPoints }: ProfileLevelProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-white">Nivel {getLevel(levelPoints)}</span>
      <div className="relative flex flex-row gap-2 items-center justify-between">
        <Progress.Root
          value={getPct(levelPoints)}
          className="relative h-2 w-full overflow-hidden rounded-full bg-neutral-900"
        >
          <Progress.ProgressIndicator
            style={{ width: `${getPct(levelPoints)}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-400 duration-300 ease-in-out"
          />
        </Progress.Root>
        <span className="text-zinc-400 grow w-40 text-right">
          {levelPoints} / {getLevel(levelPoints) * 1000}
        </span>
      </div>
    </div>
  )
}
