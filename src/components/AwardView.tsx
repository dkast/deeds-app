import React from "react"
import { Award } from "@prisma/client"

type AwardProps = {
  item: Award
}

const AwardView = ({ item }: AwardProps): JSX.Element => {
  return (
    <div className="relative overflow-hidden rounded-lg border border-white/30 shadow-lg">
      <img
        src={item.imageUrl}
        className="h-48 w-full rounded-lg object-cover"
      />
      <div className="absolute bottom-0 left-0 flex h-12 w-full items-center justify-between rounded-b-lg bg-black/50 p-4 text-gray-200 backdrop-blur">
        <span className="font-bold">{item.description}</span>
        <div className="flex items-center rounded-full bg-orange-500 px-2 py-1 text-white">
          <img src="../images/gem.svg" className="mr-1 h-4 w-4" alt="coin" />
          <span className="text-sm font-bold">{item.points}</span>
        </div>
      </div>
    </div>
  )
}

export default AwardView
