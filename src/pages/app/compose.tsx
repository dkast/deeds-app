import toast from "react-hot-toast"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useSession } from "next-auth/react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/components/NavBar"
import ActivityButton from "@/components/ActivityButton"
import AddComments from "@/components/AddComments"
import Loader from "@/components/Loader"
import { trpc } from "@/src/utils/trpc"

import { ACTIVITIES, GREETINGS } from "@/src/types/types"
import type { NextPageWithAuthAndLayout, Activity } from "@/src/types/types"

const Compose: NextPageWithAuthAndLayout = () => {
  const router = useRouter()
  const [open, setOpen] = useState<boolean>(false)
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
    createDeed.mutate({
      userId: session?.user?.id,
      activity: actType.id,
      points: actType.points,
      comments: comment
    })

    setComment("")
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
    </>
  )
}

Compose.auth = true
Compose.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Compose
