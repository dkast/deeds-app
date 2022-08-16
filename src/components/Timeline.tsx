import React from "react"

import { trpc } from "@/src/utils/trpc"
import DeedView from "@/src/components/DeedView"

const Timeline = () => {
  const { data: deeds, isLoading } = trpc.useQuery(["deed.getAll"])

  if (isLoading) return <div>Cargando...</div>

  return (
    <div>
      {deeds?.map(deed => {
        console.dir(deed)
        return (
          <div key={deed.id}>
            <DeedView item={deed} />
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
