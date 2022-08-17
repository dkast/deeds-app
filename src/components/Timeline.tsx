import React from "react"
import { AnimatePresence, motion } from "framer-motion"

import { trpc } from "@/src/utils/trpc"
import DeedView from "@/components/DeedView"

const Timeline = () => {
  const { data: deeds, isLoading } = trpc.useQuery(["deed.getAll"])

  if (isLoading) return <div>Cargando...</div>

  return (
    <div>
      <AnimatePresence initial={false} mode="popLayout">
        {deeds?.map(deed => {
          console.dir(deed)
          return (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              key={deed.id}
            >
              <DeedView item={deed} />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default Timeline
