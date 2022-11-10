import toast from "react-hot-toast"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useSession } from "next-auth/react"

import { trpc } from "@/src/utils/trpc"
import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/components/NavBar"
import ActivityButton from "@/components/ActivityButton"
import AddComments from "@/components/AddComments"
import Loader from "@/src/components/ui/Loader"

import { ACTIVITIES, GREETINGS } from "@/src/types/types"
import type { NextPageWithAuthAndLayout, Activity } from "@/src/types/types"

import useAchievementStore from "@/src/store/achievement"

const Compose: NextPageWithAuthAndLayout = () => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const [selectedActivity, setSelectedActivity] = useState<Activity>()

  // Zustand Store
  const setUnlocked = useAchievementStore(state => state.setUnlocked)

  const ctx = trpc.useContext()
  const { data: session, status } = useSession()
  const { data: user, isLoading } = trpc.useQuery(
    ["user.getUser", { userId: session?.user?.id }],
    {
      enabled: !!session?.user
    }
  )
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

  const createMessage = trpc.useMutation("deed.message")

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
    achievementUnlocked(actType.points, user?.levelPoints)

    createDeed.mutate({
      userId: session?.user?.id,
      activity: actType.id,
      points: actType.points,
      comments: comment
    })

    // Sends message notification to Discord (via webhoook)
    sendMessage(actType, comment)

    setComment("")
  }

  const achievementUnlocked = (
    points: number,
    levelPoints: number | undefined
  ) => {
    const modPoints = levelPoints! % 1000
    if (modPoints + points >= 1000) {
      setUnlocked(true)
    }
  }

  const getGreeting = (): string | undefined => {
    const i = Math.floor(Math.random() * GREETINGS.length)
    const greeting = GREETINGS[i]
    return greeting
  }

  const sendMessage = (actType: Activity, comment: string) => {
    let message: string = ""
    const userName = session?.user?.name
    const avatar = session?.user?.image

    switch (actType?.id) {
      case "activity_tbrush":
        message = "se cepilló los dientes."
        break
      case "activity_bath":
        message = "se dió un baño."
        break
      case "activity_homework":
        message = "hizo la tarea."
        break
      case "activity_help":
        message = "ayudó en la casa."
        break
      case "activity_online":
        message = "tomó clase online."
        break
      case "activity_excercise":
        message = "hizo ejercicio."
        break
      case "activity_swim":
        message = "hizo natación."
        break
      case "activity_diet":
        message = "comió saludable."
        break
      default:
        break
    }

    createMessage.mutate({
      content: `${userName} ${message}`,
      author: `${session?.user?.name} dijo:`,
      authorAvatar: avatar!,
      description: comment,
      color: 5195493
    })
  }

  return (
    <>
      <NavBar title="Agregar" />
      <div className="mt-20 mb-28 flex flex-col items-center">
        {status === "loading" || isLoading ? (
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
    </>
  )
}

Compose.auth = true
Compose.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Compose
