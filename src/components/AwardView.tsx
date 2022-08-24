import React from "react"
import { Award } from "@prisma/client"
import { motion, PanInfo } from "framer-motion"
import { TrashIcon } from "@heroicons/react/24/outline"
import toast from "react-hot-toast"

import { trpc } from "@/src/utils/trpc"

type AwardProps = {
  item: Award
}

const AwardView = ({ item }: AwardProps): JSX.Element => {
  const ctx = trpc.useContext()
  const deleteAward = trpc.useMutation("award.delete", {
    onError: () => {
      toast.error("Error al eliminar")
    },
    onMutate: () => {
      ctx.cancelQuery(["award.getAll"])

      let optimisticUpdate = ctx.getQueryData(["award.getAll"])
      if (optimisticUpdate) {
        ctx.setQueryData(["award.getAll"], optimisticUpdate)
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["award.getAll"])
    }
  })

  const handleDragEnd = (info: PanInfo, awardId: string) => {
    const dragDistance = info.offset.x
    console.log(dragDistance)
    if (dragDistance < -300) {
      // Delete item
      console.log("borra")
      deleteAward.mutate({ id: awardId })
    }
  }

  return (
    <div className="relative">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => handleDragEnd(info, item.id)}
        className="relative z-10 overflow-hidden rounded-lg shadow-lg"
      >
        <img
          draggable="false"
          src={item.imageUrl}
          className="h-48 w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-12 w-full items-center justify-between rounded-b-lg bg-black/50 p-4 text-gray-200 backdrop-blur">
          <span className="font-bold">{item.description}</span>
          <div className="flex items-center rounded-full bg-orange-500 px-2 py-1 text-white">
            <img src="../images/gem.svg" className="mr-1 h-4 w-4" alt="coin" />
            <span className="text-sm font-bold">{item.points}</span>
          </div>
        </div>
      </motion.div>
      <div className="absolute inset-y-0 right-0 flex w-[120px] items-center justify-center rounded-xl bg-red-500 text-white">
        <TrashIcon className="h-10 w-10 text-current" />
      </div>
    </div>
  )
}

export default AwardView
