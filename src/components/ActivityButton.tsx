import React from "react"
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
      className="relative flex w-full select-none flex-col items-center gap-3 rounded-2xl bg-violet-500 px-2 py-3"
      onClick={onClick}
    >
      <div className="mt-6 rounded-full border-4 border-cyan-300/70 bg-cyan-500">
        <img src={`../images/${iconName}`} className="h-14 w-14" />
      </div>
      <span className="text-sm font-semibold text-white">{text}</span>
      <div className="absolute top-1 right-1">
        <div className="flex items-center gap-1 rounded-full bg-violet-600 px-2 py-1">
          <span className="text-xs font-bold text-white">{points}</span>
          <img src="../images/gem.svg" className="h-4 w-4" alt="coin" />
        </div>
      </div>
    </motion.button>
  )
}

export default ActivityButton
