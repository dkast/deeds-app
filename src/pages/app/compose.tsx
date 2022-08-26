import toast from "react-hot-toast"
import { useRouter } from "next/router"
import React, { useState } from "react"
import Lottie from "react-lottie-player"
import { useSession } from "next-auth/react"
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"

import { trpc } from "@/src/utils/trpc"
import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/components/NavBar"
import ActivityButton from "@/components/ActivityButton"
import AddComments from "@/components/AddComments"
import Loader from "@/components/Loader"
import Modal from "@/src/components/Modal"
import Button from "@/src/components/Button"

import { ACTIVITIES, GREETINGS } from "@/src/types/types"
import type { NextPageWithAuthAndLayout, Activity } from "@/src/types/types"

import lottieJSON from "../../../public/assets/trophy.json"

const Compose: NextPageWithAuthAndLayout = () => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [comment, setComment] = useState<string>("")
  const [selectedActivity, setSelectedActivity] = useState<Activity>()
  const { data: session, status } = useSession()
  const ctx = trpc.useContext()
  const createDeed = trpc.useMutation("deed.create", {
    onError: () => {
      toast.error("Algo salió mal 😥")
    },
    onSuccess: () => {
      const greeting = getGreeting()
      toast(greeting as string, { icon: "🎉" })
      router.push("home")
    },
    onSettled: () => {
      ctx.invalidateQueries(["user.getUser"])
      ctx.invalidateQueries(["user.getFamilyMembers"])
    }
  })

  const onActivityTap = (actType: Activity) => {
    if (actType.requireComments) {
      setSelectedActivity(actType)
      setOpen(true)
    } else {
      saveActivity(actType)
    }
  }

  const onCloseComments = () => {
    setOpen(false)
    saveActivity(selectedActivity as Activity)
  }

  const saveActivity = (actType: Activity) => {
    // createDeed.mutate({
    //   userId: session?.user?.id,
    //   activity: actType.id,
    //   points: actType.points,
    //   comments: comment
    // })

    // setComment("")
    setModalOpen(true)
  }

  const getGreeting = (): string | undefined => {
    const i = Math.floor(Math.random() * GREETINGS.length)
    const greeting = GREETINGS[i]
    return greeting
  }

  return (
    <>
      <NavBar title="Agregar" />
      <div className="mt-20 mb-28 flex flex-col items-center">
        {status === "loading" ? (
          <Loader />
        ) : (
          <>
            {/* <div className="mt-4 mb-8">
              <h2 className="text-center text-xl font-bold text-violet-300">
                ¿Qué tarea completaste?
              </h2>
            </div> */}
            <div>
              <ul className="grid grid-cols-2 gap-2">
                {ACTIVITIES.map(act => (
                  <li key={act.id}>
                    <ActivityButton
                      iconName={act.icon}
                      text={act.description}
                      points={act.points}
                      onClick={() => onActivityTap(act)}
                    ></ActivityButton>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      <AddComments
        open={open}
        setOpen={setOpen}
        comment={comment}
        setComment={setComment}
        onClose={onCloseComments}
      />
      <LevelModal open={modalOpen} setOpen={setModalOpen} />
    </>
  )
}

Compose.auth = true
Compose.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Compose

type LevelModalProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LevelModal = ({ open, setOpen }: LevelModalProps) => {
  const { width, height } = useWindowSize()

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
        <Button type="button" variant="primary" onClick={() => setOpen(false)}>
          Listo
        </Button>
      </div>
    </Modal>
  )
}
