import React from "react"
import Lottie from "react-lottie-player"

import { UserDeed } from "@/src/types/types"

import lottieJSON from "../../public/assets/level-up.json"

type LevelUpProps = {
  item: UserDeed
}

const LevelUpView = ({ item }: LevelUpProps) => {
  return (
    <div className="relative flex flex-col items-center gap-3 rounded-xl bg-gradient-to-r from-violet-800 to-violet-500 px-4 py-3">
      <div className="relative">
        {item?.User?.image && (
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-400">
            <img src={item?.User?.image!} alt="Avatar" />
          </div>
        )}
        <div className="absolute -top-10 -left-8">
          <Lottie
            loop
            animationData={lottieJSON}
            play
            className="h-32 w-32"
          ></Lottie>
        </div>
      </div>
      <div>
        <span className="font-semibold text-white">{item?.User?.name}</span>
        <span className="ml-1 text-violet-300">¡subió de nivel!</span>
      </div>
      <div className="absolute top-0 right-2 flex justify-end">
        <div>
          <div className="my-2 flex items-center justify-center rounded-full bg-violet-700/60 px-2 py-0.5">
            <img
              src="../images/gem.svg"
              className="inline h-4 w-4"
              alt="coin"
            />
            <span className="ml-2 font-bold tracking-tight text-violet-300">
              {item?.points}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelUpView
