import React from "react"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/components/Loader"
import AwardView from "@/components/AwardView"

const AwardList = () => {
  const { data: awards, isLoading } = trpc.useQuery(["award.getAll"])

  if (isLoading) return <Loader />

  return (
    <div>
      {awards?.map(award => {
        return (
          <div className="mt-6 px-3" key={award.id}>
            <AwardView item={award} />
          </div>
        )
      })}
    </div>
  )
}

export default AwardList
