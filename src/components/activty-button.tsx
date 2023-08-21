"use client"

import { motion } from "framer-motion"

type ActivityButtonProps = {
  iconName: string
  text: string
  points: number
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ActivityButton = ({
  iconName,
  text,
  points,
  onClick
}: ActivityButtonProps) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.9
      }}
      type="button"
      className="relative flex w-full select-none flex-col items-center gap-4 rounded-3xl bg-zinc-900 px-2 py-4 ring-2 ring-zinc-800"
      onClick={onClick}
    >
      <div className="mt-8">
        <span className="text-5xl">{iconName}</span>
      </div>
      <span className="text-sm font-semibold text-zinc-300">{text}</span>
      <div className="absolute top-2 right-2">
        <div className="flex items-center gap-1 px-2 py-1">
          <img src="/images/gem.svg" className="h-4 w-4" alt="coin" />
          <span className="text-sm font-semibold text-orange-400">
            {points}
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export default ActivityButton
