import React, { useEffect, useState } from "react"
import Lottie from "react-lottie-player"
import { useSession } from "next-auth/react"
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"

import Modal from "@/src/components/Modal"
import Button from "@/src/components/Button"
import useAchievementStore from "@/src/store/achievement"
import { trpc } from "@/src/utils/trpc"

import lottieJSON from "../../public/assets/trophy.json"

type LevelModalProps = {
  show: boolean
}
export const LevelModal = ({ show }: LevelModalProps) => {
  const { width, height } = useWindowSize()
  const [open, setOpen] = useState(show)
  const setUnlocked = useAchievementStore(state => state.setUnlocked)
  const ctx = trpc.useContext()
  const { data: session, status } = useSession()

  const createDeed = trpc.useMutation("deed.create", {
    onError: () => {
      console.error("Error al guardar registro")
    },
    onMutate: () => {
      ctx.cancelQuery(["deed.getAll"])

      let optimisticUpdate = ctx.getQueryData(["deed.getAll"])
      if (optimisticUpdate) {
        ctx.setQueryData(["deed.getAll"], optimisticUpdate)
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["deed.getAll"])
      ctx.invalidateQueries(["user.getUser"])
      ctx.invalidateQueries(["user.getFamilyMembers"])
    }
  })

  const createMessage = trpc.useMutation("deed.message")

  useEffect(() => {
    setOpen(show)
  }, [show])

  const onCloseModal = () => {
    setOpen(false)
    setUnlocked(false)
    createDeed.mutate({
      userId: session?.user?.id,
      activity: "activity_levelup",
      points: 30,
      comments: ""
    })

    createMessage.mutate({
      content: `${session?.user?.name} subió de nivel 🚀`,
      color: 0
    })
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center gap-3 text-neutral-400">
        <Confetti width={width} height={height} />
        <div>
          <Lottie
            loop={false}
            animationData={lottieJSON}
            play
            className="h-52 w-60"
          ></Lottie>
        </div>
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-xl font-semibold leading-9 text-transparent">
            ¡Felicidades! Subiste de Nivel
          </h2>
          <span>Sigue así 😎</span>
        </div>
        <Button
          type="button"
          variant="primary"
          isLoading={status === "loading"}
          onClick={() => onCloseModal()}
        >
          Reclamar puntos
        </Button>
      </div>
    </Modal>
  )
}
