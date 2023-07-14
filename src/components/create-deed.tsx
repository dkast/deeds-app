"use client"

import { useState } from "react"

import ActivityButton from "@/components/activty-button"
import AddComments from "@/components/add-comments"
import { ACTIVITIES, Activity } from "@/lib/types"

export default function CreateDeed() {
  const [open, setOpen] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const [selectedActivity, setSelectedActivity] = useState<Activity>()

  const onActivityTap = (actType: Activity) => {
    if (actType.requireComments) {
      setSelectedActivity(actType)
      setOpen(true)
    } else {
      // saveActivity(actType)
    }
  }

  const onCloseComments = () => {
    setOpen(false)
    // saveActivity(selectedActivity as Activity)
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
