import React from "react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"
import ActivityButton from "@/src/components/ActivityButton"

import { ACTIVITIES } from "@/src/types/types"
import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Compose: NextPageWithAuthAndLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <NavBar title="Agregar una Actividad"></NavBar>
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
              ></ActivityButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Compose.auth = true
Compose.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Compose
