"use client"

import toast from "react-hot-toast"
import { substractPoints } from "@/server/actions"
import { type Award } from "@prisma/client"
import { useAction } from "next-safe-action/hook"

import Button from "@/components/ui/button"

export const ExchangeItem = ({
  item,
  userId
}: {
  item: Award
  userId: string
}) => {
  const { execute: claimPoints } = useAction(substractPoints, {
    onSuccess: () => {
      toast.success("Puntos reclamados")
    },
    onError: () => {
      toast.error("Algo salió mal 😥")
    }
  })

  const onClaimPoints = (points: number) => {
    claimPoints({ userId: userId, points: points })
  }

  return (
    <div className="z-10 flex overflow-hidden rounded-2xl border border-2 border-zinc-800 p-4 shadow-lg select-none">
      <img
        draggable="false"
        src={item.imageUrl}
        className="h-24 w-24 rounded-lg object-cover aspect-square"
        alt="icon"
      />
      <div className="flex w-full flex-col gap-3 items-start justify-between pl-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-zinc-200">
            {item.description}
          </span>
          <div className="flex items-center text-zinc-400">
            <img src="../images/gem.svg" className="mr-1 h-3 w-3" alt="coin" />
            <span className="text-sm">{item.points}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => onClaimPoints(item.points)}
        >
          Canjear
        </Button>
      </div>
    </div>
  )
}
