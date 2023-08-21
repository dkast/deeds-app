"use client"

import React, { useEffect, useState } from "react"
import { formatDistanceToNowStrict } from "date-fns"

import { type UserDeed } from "@/lib/types"
import { formatDistance } from "@/lib/utils"

const DeedView = ({ item }: { item: UserDeed }): JSX.Element => {
  const [icon, setIcon] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    let message: string = ""
    let icon: string = ""

    switch (item?.activity) {
      case "activity_tbrush":
        message = "se cepilló los dientes"
        icon = "🪥"
        break
      case "activity_bath":
        message = "se dió un baño"
        icon = "🚿"
        break
      case "activity_homework":
        message = "hizo la tarea"
        icon = "📔"
        break
      case "activity_help":
        message = "ayudó en la casa"
        icon = "🖐"
        break
      case "activity_online":
        message = "tomó clase online"
        icon = "💻"
        break
      case "activity_excercise":
        message = "hizo ejercicio"
        icon = "👟"
        break
      case "activity_swim":
        message = "hizo natación"
        icon = "🏊"
        break
      case "activity_diet":
        message = "comió saludable"
        icon = "🍎"
        break
      default:
        break
    }
    setIcon(icon)
    setMessage(message)
  }, [item])

  return (
    <div className="rounded-2xl bg-zinc-900 p-4">
      <div className="flex items-center">
        <div className="relative">
          {item.User?.image && (
            <img
              src={item.User?.image}
              className="h-12 w-12 rounded-full"
              alt="avatar"
            />
          )}
          <div className="bg-white ring-2 ring-zinc-900 shadow absolute bottom-0 right-0 rounded-full h-6 w-6 flex justify-center items-center">
            <span className="">{icon}</span>
          </div>
        </div>
        <div className="grow flex flex-col pl-4">
          <div className="flex justify-between items-center">
            <span>{item.User?.name}</span>
            <span className="text-zinc-500 text-xs">
              {formatDistanceToNowStrict(item?.createdAt, {
                locale: { formatDistance }
              })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col grow gap-2 text-zinc-400">
              <span>{message}</span>
              {item?.comments && (
                <div>
                  <span className="rounded-lg px-2 py-1 text-sm rounded-ss-none text-zinc-200 bg-zinc-700">
                    {item?.comments}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center">
              <img
                src="/images/gem.svg"
                className="inline h-4 w-4"
                alt="coin"
              />
              <span className="ml-1 font-semibold tracking-tight text-orange-400 text-sm">
                {item.points}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeedView
