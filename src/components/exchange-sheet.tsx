"use client"

import { useState } from "react"

import ExchangeList from "@/components/exchange-list"
import BottomSheet from "@/components/ui/bottom-sheet"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

function ExchangeSheet({
  open,
  setOpen
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [points, setPoints] = useState<string>("")
  // const { data: awards, isLoading } = trpc.useQuery(["award.getAll"])
  // const ctx = trpc.useContext()
  // const claimPoints = trpc.useMutation("user.substractPoints", {
  //   onError: () => {
  //     toast.error("Algo salió mal 😥")
  //   },
  //   onSuccess: () => {
  //     toast.success("Puntos reclamados")
  //   },
  //   onSettled: () => {
  //     ctx.invalidateQueries(["user.getUser"])
  //     ctx.invalidateQueries(["user.getFamilyMembers"])
  //   }
  // })
  const onClaimPoints = () => {
    // claimPoints.mutate({
    //   userId: userId,
    //   points: parseInt(points)
    // })
  }

  // const rewardPoints = trpc.useMutation("user.addPoints", {
  //   onError: () => {
  //     toast.error("Algo salió mal 😥")
  //   },
  //   onSuccess: () => {
  //     toast.success("Puntos añadidos")
  //   },
  //   onSettled: () => {
  //     ctx.invalidateQueries(["user.getUser"])
  //     ctx.invalidateQueries(["user.getFamilyMembers"])
  //   }
  // })
  const onRewardPoints = () => {
    console.dir(points)
    // rewardPoints.mutate({
    //   userId: userId,
    //   points: parseInt(points)
    // })
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
              <ExchangeList />
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}

export default ExchangeSheet
