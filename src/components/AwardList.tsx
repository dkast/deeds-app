import React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/components/Loader"
import AwardView from "@/components/AwardView"

const AwardList = () => {
  const { data: awards, isLoading } = trpc.useQuery(["award.getAll"])

  if (isLoading) return <Loader />

  return (
    <div className="mt-6 flex flex-col gap-4 px-3">
      <AnimatePresence initial={false} mode="popLayout">
        {awards?.map(award => {
          return (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={award.id}
            >
              <AwardView item={award} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default AwardList
