"use client"

import { AnimatePresence, motion } from "framer-motion"

import DeedView from "@/components/deed-view"
import LevelUpView from "@/components/levelup-view"
import { UserDeed } from "@/lib/types"

const Timeline = ({ deeds }: { deeds: UserDeed[] }) => {
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
