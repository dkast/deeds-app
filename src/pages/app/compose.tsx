import toast from "react-hot-toast"
import React, { useState } from "react"
import { useSession } from "next-auth/react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/components/NavBar"
import ActivityButton from "@/components/ActivityButton"
import AddComments from "@/components/AddComments"
import { trpc } from "@/src/utils/trpc"

import { ACTIVITIES, GREETINGS } from "@/src/types/types"
import type { NextPageWithAuthAndLayout, Activity } from "@/src/types/types"

const Compose: NextPageWithAuthAndLayout = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const [selectedActivity, setSelectedActivity] = useState<Activity>()
  const { data: session, status } = useSession()
  const createDeed = trpc.useMutation("deed.create")

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
    const greeting = getGreeting()
    toast(greeting as string, { icon: "🎉" })
  }

  const getGreeting = (): string | undefined => {
    const i = Math.floor(Math.random() * GREETINGS.length)
    const greeting = GREETINGS[i]
    return greeting
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <NavBar title="Agregar una Actividad"></NavBar>
        {status === "loading" ? (
          "Cargando..."
        ) : (
          <>
            <div className="mt-4 mb-8">
              <h2 className="text-center text-xl font-bold text-violet-300">
                ¿Qué tarea completaste?
              </h2>
            </div>
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
