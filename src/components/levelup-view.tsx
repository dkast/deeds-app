"use client"

import Lottie from "react-lottie-player"

import { type UserDeed } from "@/lib/types"
import lottieJSON from "../../public/assets/level-up.json"

const LevelUpView = ({ item }: { item: UserDeed }) => {
  return (
    <div className="relative flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-200 via-violet-300 to-orange-200 px-4 py-3">
      <div className="relative">
        {item?.User?.image && (
          <div className="h-14 w-14 overflow-hidden rounded-full bg-gray-400">
            <img src={item?.User?.image} alt="Avatar" />
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
        <span className="font-semibold text-zinc-950">{item?.User?.name}</span>
        <span className="ml-1 text-zinc-900">¡subió de nivel!</span>
      </div>
      <div className="absolute top-0 right-2 flex justify-end">
        <div>
          <div className="my-2 flex items-center justify-center rounded-full bg-orange-700/10 px-2 py-0.5">
            <img
              src="../images/gem.svg"
              className="inline h-4 w-4"
              alt="coin"
            />
            <span className="ml-1 font-semibold tracking-tight text-zinc-950 text-sm">
              {item?.points}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelUpView
