"use client"

import { type Award, Role } from "@prisma/client"
import { AnimatePresence, motion } from "framer-motion"

import AwardView from "@/components/award-view"

const AwardList = ({
  awards,
  userRole
}: {
  awards: Award[]
  userRole: string
}) => {
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
              <AwardView item={award} allowDelete={userRole === Role.PARENT} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default AwardList
