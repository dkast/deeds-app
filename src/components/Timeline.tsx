import React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { trpc } from "@/src/utils/trpc"
import DeedView from "@/components/DeedView"
import Loader from "@/components/Loader"
import LevelUpView from "./LevelUpView"

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
