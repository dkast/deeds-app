import React, { useEffect, useState } from "react"
import { Deed, User } from "@prisma/client"
import esLocale from "date-fns/locale/es"
import { formatDistanceToNowStrict } from "date-fns"

import { UserDeed } from "@/src/types/types"

type DeedProps = {
  item: UserDeed
}

const DeedView = ({ item }: DeedProps): JSX.Element => {
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
    <div className="mb-3 flex px-4">
      <div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-pink-300">
        <img src={`../images/${icon}`} className="h-12 w-12" />
      </div>
      <div>
        <div className="col-span-3 flex flex-grow flex-col">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="font-semibold text-violet-500">
                {item?.User?.name}
              </span>
              <span className="ml-1 text-gray-300">{message}</span>
            </div>
          </div>
          <span className="text-sm text-gray-400">
            Hace{" "}
            {formatDistanceToNowStrict(item.createdAt, {
              locale: esLocale
            })}
          </span>
        </div>
      </div>
      <div>Puntos</div>
    </div>
  )
}

export default DeedView
