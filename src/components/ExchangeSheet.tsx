import React, { useState } from "react"
import toast from "react-hot-toast"

import BottomSheet from "@/components/BottomSheet"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { trpc } from "@/src/utils/trpc"
import { Award } from "@prisma/client"

type ExchangeSheetProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
}

const ExchangeSheet = ({ open, setOpen, userId }: ExchangeSheetProps) => {
  const [points, setPoints] = useState<string>("0")
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
      <div className="flex h-full flex-col pt-3">
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
          <div className="mt-6 flex flex-col gap-2">
            <label
              htmlFor="points"
              className="ml-2 block font-medium text-neutral-400"
            >
              Puntos
            </label>
            <div className="p-1">
              <Input
                type="number"
                placeholder="0"
                value={points}
                onChange={event =>
                  setPoints((event.target as HTMLInputElement).value)
                }
              ></Input>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="primary" onClick={onRewardPoints}>
                Agregar
              </Button>
              <Button type="button" variant="danger" onClick={onClaimPoints}>
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
    <div className="relative z-10 flex overflow-hidden rounded-lg bg-neutral-700 shadow-lg">
      <img
        draggable="false"
        src={item.imageUrl}
        className="absolute inset-0 -z-10 h-36 w-full object-cover"
      />
      <div className="flex w-full flex-col items-start justify-between gap-8 bg-black/60 px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <span className="text-xl font-bold text-gray-200">
            {item.description}
          </span>
          <div className="flex items-center rounded-full bg-black/60 px-2 py-1 text-white">
            <img src="../images/gem.svg" className="mr-1 h-4 w-4" alt="coin" />
            <span className="text-sm font-bold">{item.points}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          onClick={() => onClaimPoints(item.points)}
        >
          Canjear
        </Button>
      </div>
    </div>
  )
}
