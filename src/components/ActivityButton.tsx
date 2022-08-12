import React from "react"

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
    <div className="rounded-xl bg-gradient-to-b from-cyan-400 via-indigo-400 to-pink-400">
      <button
        type="button"
        className="flex w-full flex-col items-center gap-2 rounded-lg px-2 py-3"
      >
        <img src={`../images/${iconName}`} className="h-14 w-14" />
        <span className="text-violet-100">{text}</span>
        <div className="flex w-full items-center justify-end">
          <div className="flex items-center gap-1 rounded-full bg-orange-500 px-2 py-0.5">
            <span className="text-sm font-bold text-white">{points}</span>
            <img src="../images/gem.svg" className="h-4 w-4" alt="coin" />
          </div>
        </div>
      </button>
    </div>
  )
}

export default ActivityButton
