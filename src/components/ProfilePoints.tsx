import React from "react"

type ProfileLevelProps = {
  totalPoints: number | undefined
}
export const ProfilePoints = ({ totalPoints }: ProfileLevelProps) => {
  return (
    <div className="flex flex-col items-start justify-between rounded-xl bg-neutral-800 p-4">
      <span className="text-2xl font-semibold text-white">{totalPoints}</span>
      <span className="flex items-center gap-2 text-neutral-400">
        <img src="/images/gem.svg" className="h-4 w-4" alt="coin" /> puntos
      </span>
    </div>
  )
}
