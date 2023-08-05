"use client"

import { useState } from "react"
import Confetti from "react-confetti"
import toast from "react-hot-toast"
import Lottie from "react-lottie-player"
import useWindowSize from "react-use/lib/useWindowSize"
import { useAction } from "next-safe-action/hook"
import { useRouter } from "next/navigation"

import ActivityButton from "@/components/activty-button"
import AddComments from "@/components/add-comments"
import Button from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { createDeed } from "@/lib/actions"
import { ACTIVITIES, Activity, GREETINGS } from "@/lib/types"
import lottieJSON from "../../public/assets/trophy.json"

export default function DeedCreate({
  userId,
  levelPoints
}: {
  userId: string
  levelPoints: number
}) {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [openLevelModal, setOpenLevelModal] = useState(false)
  const [comment, setComment] = useState<string>("")
  const [selectedActivity, setSelectedActivity] = useState<Activity>()
  const { execute } = useAction(createDeed, {
    onSuccess: () => {
      const greeting = getGreeting()
      toast(greeting as string, { icon: "🎉" })
    },
    onError: () => {
      toast.error("Algo salió mal 😥")
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

  const saveActivity = async (actType: Activity) => {
    console.log(actType)
    execute({
      userId: userId,
      activity: actType.id,
      points: actType.points,
      comments: comment
    })
    isAchievementUnlocked(actType.points, levelPoints)
  }

  const getGreeting = (): string | undefined => {
    const i = Math.floor(Math.random() * GREETINGS.length)
    const greeting = GREETINGS[i]
    return greeting
  }

  const isAchievementUnlocked = (
    points: number,
    levelPoints: number | undefined
  ) => {
    const modPoints = levelPoints! % 1000
    if (modPoints + points >= 1000) {
      execute({
        userId: userId,
        activity: "activity_levelup",
        points: 30,
        comments: ""
      })
      setOpenLevelModal(true)
    } else {
      router.push("/home")
    }
  }

  return (
    <>
      <div className="mt-20 mb-28 flex flex-col items-center">
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
      </div>
      <AddComments
        open={open}
        setOpen={setOpen}
        comment={comment}
        setComment={setComment}
        onClose={onCloseComments}
      />
      <LevelModal open={openLevelModal} setOpen={setOpenLevelModal} />
    </>
  )
}

function LevelModal({
  open,
  setOpen
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { width, height } = useWindowSize()
  const router = useRouter()

  // const createMessage = trpc.useMutation("deed.message")

  //   createMessage.mutate({
  //     content: `${session?.user?.name} subió de nivel 🚀`,
  //     color: 0
  //   })
  // }

  const onCloseModal = () => {
    setOpen(false)
    router.push("/home")
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
        <Button type="button" variant="primary" onClick={() => onCloseModal()}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
