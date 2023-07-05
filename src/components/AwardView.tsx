import React from "react"
import toast from "react-hot-toast"
import { trpc } from "@/src/lib/trpc"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid"
import { TrashIcon } from "@heroicons/react/24/outline"
import { Award } from "@prisma/client"
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion"

type AwardProps = {
  item: Award
  allowDelete: boolean
}

const AwardView = ({ item, allowDelete }: AwardProps): JSX.Element => {
  const x = useMotionValue(100)
  const xInput = [-100, 100]
  const opacityOutput = [1, 0]
  const scaleOutput = [1, 0.9]
  const opacity = useTransform(x, xInput, opacityOutput)
  const scale = useTransform(x, xInput, scaleOutput)

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

  const deleteItem = (awardId: string) => {
    x.set(0)
    deleteAward.mutate({ id: awardId })
  }

  return (
    <div className="relative">
      <motion.div
        drag={allowDelete ? "x" : false}
        dragConstraints={{ left: -110, right: 0 }}
        dragDirectionLock
        onDrag={(_, info) => x.set(info.offset.x)}
        className="relative z-10 overflow-hidden rounded-lg shadow-lg"
      >
        <img
          draggable="false"
          src={item.imageUrl}
          className="h-48 w-full rounded-lg object-cover"
        />
        <div className="absolute bottom-0 left-0 flex h-12 w-full items-center justify-between rounded-b-lg bg-black/50 p-4 text-gray-200 backdrop-blur">
          {item.refUrl ? (
            <a
              href={item.refUrl!}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <span className="font-bold">{item.description}</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-current" />
            </a>
          ) : (
            <span className="font-bold">{item.description}</span>
          )}
          <div className="flex items-center rounded-full bg-orange-500 px-2 py-1 text-white">
            <img src="/images/gem.svg" className="mr-1 h-4 w-4" alt="coin" />
            <span className="text-sm font-bold">{item.points}</span>
          </div>
        </div>
      </motion.div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        style={{ opacity, scale }}
        onClick={() => deleteItem(item.id)}
        className="absolute inset-y-0 right-0 flex w-[100px] items-center justify-center rounded-xl bg-red-500 text-white"
      >
        <TrashIcon className="h-8 w-8 text-current" />
      </motion.button>
    </div>
  )
}

export default AwardView
