import toast from "react-hot-toast"
import React, { useState } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"
import { useSession } from "next-auth/react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"
import ActivityButton from "@/src/components/ActivityButton"
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

const overlay = {
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.1
    }
  }
}

const dialog = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  },
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    transition: {
      ease: "easeIn",
      duration: 0.2
    }
  }
}

type AddCommentsProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  onClose: () => void
}

export const AddComments = ({
  open,
  setOpen,
  comment,
  setComment,
  onClose
}: AddCommentsProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlay}
                className="fixed inset-0 z-50 min-h-screen bg-black bg-opacity-60 px-4 pt-4 pb-20 backdrop-blur-sm sm:block sm:p-0"
              >
                <div className="fixed inset-0 z-50 flex min-h-screen items-start justify-center overflow-y-auto px-4 py-20">
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dialog}
                      className="relative inline-block w-full overflow-hidden rounded-xl bg-white px-4 pt-5 pb-4 text-left align-top shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                    >
                      <div className="flex flex-col">
                        <textarea
                          name="comments"
                          rows={3}
                          placeholder="Dinos un poco más.."
                          className="mb-4 border-0 focus:ring-0"
                          value={comment}
                          onChange={event => setComment(event.target.value)}
                        ></textarea>
                        <button
                          type="submit"
                          disabled={comment.length === 0 ? true : false}
                          className="rounded-full bg-violet-500 py-2 text-white shadow-lg shadow-violet-500/50 active:bg-violet-600 disabled:text-violet-300"
                          onClick={onClose}
                        >
                          Agregar
                        </button>
                      </div>
                    </motion.div>
                  </Dialog.Content>
                </div>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
