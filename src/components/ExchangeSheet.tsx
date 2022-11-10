import React, { useState } from "react"
import toast from "react-hot-toast"

import BottomSheet from "@/ui/BottomSheet"
import Input from "@/ui/Input"
import Button from "@/ui/Button"
import { trpc } from "@/src/utils/trpc"
import { Award } from "@prisma/client"

type ExchangeSheetProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
}

const ExchangeSheet = ({ open, setOpen, userId }: ExchangeSheetProps) => {
  const [points, setPoints] = useState<string>("")
  const { data: awards, isLoading } = trpc.useQuery(["award.getAll"])
  const ctx = trpc.useContext()

  const claimPoints = trpc.useMutation("user.substractPoints", {
    onError: () => {
      toast.error("Algo salió mal 😥")
    },
    onSuccess: () => {
      toast.success("Puntos reclamados")
    },
    onSettled: () => {
      ctx.invalidateQueries(["user.getUser"])
      ctx.invalidateQueries(["user.getFamilyMembers"])
    }
  })

  const onClaimPoints = () => {
    claimPoints.mutate({
      userId: userId,
      points: parseInt(points)
    })
  }

  const rewardPoints = trpc.useMutation("user.addPoints", {
    onError: () => {
      toast.error("Algo salió mal 😥")
    },
    onSuccess: () => {
      toast.success("Puntos añadidos")
    },
    onSettled: () => {
      ctx.invalidateQueries(["user.getUser"])
      ctx.invalidateQueries(["user.getFamilyMembers"])
    }
  })

  const onRewardPoints = () => {
    console.dir(points)
    rewardPoints.mutate({
      userId: userId,
      points: parseInt(points)
    })
  }

  return (
    <BottomSheet open={open} setOpen={setOpen}>
      <div className="pb-safe flex h-full flex-col pt-3">
        <div className="relative text-center">
          <h2 className="text-xl text-white">Canjear Puntos</h2>
          <div className="absolute inset-y-0 right-0">
            <button
              onClick={() => setOpen(false)}
              className="mr-1 text-violet-400 focus:outline-none"
            >
              Cerrar
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll">
          {/* <span className="text-white">{userId}</span> */}
          <div className="mt-6 flex flex-col gap-2 p-1">
            <label
              htmlFor="points"
              className="block font-medium text-neutral-400"
            >
              Puntos
            </label>
            <Input
              type="number"
              placeholder="0"
              value={points}
              onChange={event =>
                setPoints((event.target as HTMLInputElement).value)
              }
            ></Input>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={onRewardPoints}
              >
                Agregar
              </Button>
              <Button type="button" variant="secondary" onClick={onClaimPoints}>
                Restar
              </Button>
            </div>
            <label className="my-2 block font-medium text-neutral-400">
              Premios
            </label>
            <div className="flex flex-col gap-2">
              {awards?.map(award => {
                return (
                  <div key={award.id} className="select-none">
                    <ExchangeAwardItem
                      item={award}
                      userId={userId}
                    ></ExchangeAwardItem>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}

export default ExchangeSheet

type ExchangeAwardItemProps = {
  item: Award
  userId: string
}

const ExchangeAwardItem = ({ item, userId }: ExchangeAwardItemProps) => {
  const ctx = trpc.useContext()

  const claimPoints = trpc.useMutation("user.substractPoints", {
    onError: () => {
      toast.error("Algo salió mal 😥")
    },
    onSuccess: () => {
      toast.success("Puntos reclamados")
    },
    onSettled: () => {
      ctx.invalidateQueries(["user.getUser"])
      ctx.invalidateQueries(["user.getFamilyMembers"])
    }
  })

  const onClaimPoints = (points: number) => {
    claimPoints.mutate({
      userId: userId,
      points: points
    })
  }

  return (
    <div className="z-10 flex overflow-hidden rounded-xl border border-neutral-700 p-3 shadow-lg">
      <img
        draggable="false"
        src={item.imageUrl}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex w-full flex-col items-start justify-between pl-4">
        <div>
          <span className="mb-2 font-bold text-zinc-200">
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
