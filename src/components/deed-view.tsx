"use client"

import React, { useEffect, useState } from "react"
import { formatDistanceToNowStrict } from "date-fns"
import esLocale from "date-fns/locale/es"

import { UserDeed } from "@/lib/types"

const DeedView = ({ item }: { item: UserDeed }): JSX.Element => {
  const [icon, setIcon] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    let message: string = ""
    let icon: string = ""

    switch (item?.activity) {
      case "activity_tbrush":
        message = "se cepilló los dientes."
        icon = "dental-care.svg"
        break
      case "activity_bath":
        message = "se dió un baño."
        icon = "rubber-duck.svg"
        break
      case "activity_homework":
        message = "hizo la tarea."
        icon = "backpack.svg"
        break
      case "activity_help":
        message = "ayudó en la casa."
        icon = "volunteer.svg"
        break
      case "activity_online":
        message = "tomó clase online."
        icon = "laptop.svg"
        break
      case "activity_excercise":
        message = "hizo ejercicio."
        icon = "triangle.svg"
        break
      case "activity_swim":
        message = "hizo natación."
        icon = "swimmer.svg"
        break
      case "activity_diet":
        message = "comió saludable."
        icon = "diet.svg"
        break
      default:
        break
    }
    setIcon(icon)
    setMessage(message)
  }, [item])

  return (
    <div className="rounded-xl bg-neutral-800 px-4 py-3">
      <div className="grid grid-cols-5 py-2">
        <div>
          <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-cyan-300 to-pink-400">
            <img src={`/images/${icon}`} className="h-12 w-12" alt="icon" />
          </div>
        </div>
        <div className="col-span-3 flex flex-grow flex-col">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-semibold text-violet-400">
                {item?.User?.name}
              </span>
              <span className="ml-1 text-gray-300">{message}</span>
            </div>
          </div>
          <span className="text-sm text-gray-400">
            Hace{" "}
            {formatDistanceToNowStrict(item?.createdAt, {
              locale: esLocale
            })}
          </span>
        </div>
        <div className="flex justify-end">
          <div>
            <div className="flex items-center justify-center rounded-full bg-orange-800 bg-opacity-20 px-2 py-0.5">
              <img
                src="/images/gem.svg"
                className="inline h-4 w-4"
                alt="coin"
              />
              <span className="ml-2 font-bold tracking-tight text-orange-600">
                {item?.points}
              </span>
            </div>
          </div>
        </div>
        {item?.comments && (
          <span className="col-span-4 col-start-2 mt-2 text-white">
            {item?.comments}
          </span>
        )}
      </div>
    </div>
  )
}

export default DeedView
