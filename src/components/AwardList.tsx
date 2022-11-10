import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSession } from "next-auth/react"

import { trpc } from "@/src/utils/trpc"
import Loader from "@/ui/Loader"
import AwardView from "@/components/AwardView"
import { Role } from "@prisma/client"

const AwardList = () => {
  const { data: session, status } = useSession()
  const { data: awards, isLoading } = trpc.useQuery(["award.getAll"])

  if (isLoading || status === "loading") return <Loader />

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
              <AwardView
                item={award}
                allowDelete={session?.user?.role === Role.PARENT}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default AwardList
