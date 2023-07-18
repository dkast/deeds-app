"use client"

import { useState } from "react"

import ActivityButton from "@/components/activty-button"
import AddComments from "@/components/add-comments"
import type { createDeed } from "@/lib/actions"
import { ACTIVITIES, Activity, UserDeed } from "@/lib/types"

type Props = {
  createDeed: typeof createDeed
  userId: string
}

export default function CreateDeed({ createDeed, userId }: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const [selectedActivity, setSelectedActivity] = useState<Activity>()

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
    await createDeed({
      userId: userId,
      activity: actType.id,
      points: actType.points,
      comments: comment
    })
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
    </>
  )
}
