import React, { useEffect, useState } from "react"
import Lottie from "react-lottie-player"
import useWindowSize from "react-use/lib/useWindowSize"
import Confetti from "react-confetti"

import Modal from "@/src/components/Modal"
import Button from "@/src/components/Button"
import lottieJSON from "../../public/assets/trophy.json"
import useAchievementStore from "@/src/store/achievement"

type LevelModalProps = {
  show: boolean
}
export const LevelModal = ({ show }: LevelModalProps) => {
  const { width, height } = useWindowSize()
  const [open, setOpen] = useState(show)
  const setUnlocked = useAchievementStore(state => state.setUnlocked)

  useEffect(() => {
    setOpen(show)
  }, [show])

  const onCloseModal = () => {
    setOpen(false)
    setUnlocked(false)
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center gap-3 text-neutral-400">
        <Confetti width={width} height={height} />
        <div>
          <Lottie
            loop={false}
            animationData={lottieJSON}
            play
            className="h-52 w-60"
          ></Lottie>
        </div>
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-cyan-400 via-violet-400 to-orange-400 bg-clip-text text-xl font-semibold leading-9 text-transparent">
            ¡Felicidades! Subiste de Nivel
          </h2>
          <span>Sigue así 😎</span>
        </div>
        <Button type="button" variant="primary" onClick={() => onCloseModal()}>
          Listo
        </Button>
      </div>
    </Modal>
  )
}
