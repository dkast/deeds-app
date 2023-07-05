import React from "react"
import { trpc } from "@/src/lib/trpc"
import Loader from "@/ui/Loader"
import { AnimatePresence, motion } from "framer-motion"

import DeedView from "@/components/DeedView"
import LevelUpView from "@/components/LevelUpView"

const Timeline = () => {
  const { data: deeds, isLoading } = trpc.useQuery(["deed.getAll"])

  if (isLoading) return <Loader />

  return (
    <div className="flex flex-col gap-3 px-3">
      <AnimatePresence initial={false} mode="popLayout">
        {deeds?.map(deed => {
          return (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={deed.id}
            >
              {deed.activity === "activity_levelup" ? (
                <LevelUpView item={deed} />
              ) : (
                <DeedView item={deed} />
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default Timeline
