"use client"

import Lottie from "react-lottie-player"

const LottiePlayer = ({
  lottieJSON,
  className
}: {
  lottieJSON: object
  className: string
}) => {
  return (
    <Lottie loop animationData={lottieJSON} play className={className}></Lottie>
  )
}

export default LottiePlayer
