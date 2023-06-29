"use client"

import Lottie from "react-lottie-player"

const LottiePlayer = ({
  lottieJSON,
  className = "h-48 w-48"
}: {
  lottieJSON: object
  className?: string
}) => {
  return (
    <Lottie loop animationData={lottieJSON} play className={className}></Lottie>
  )
}

export default LottiePlayer
