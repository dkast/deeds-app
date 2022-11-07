import React from "react"
import { SpiralSpinner } from "react-spinners-kit"

const Loader = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <SpiralSpinner frontColor="#8b5cf6" />
    </div>
  )
}

export default Loader
