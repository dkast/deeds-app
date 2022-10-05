import React from "react"
import BottomSheet from "./BottomSheet"

type ExchangeSheetProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
}

const ExchangeSheet = ({ open, setOpen, userId }: ExchangeSheetProps) => {
  return (
    <BottomSheet open={open} setOpen={setOpen}>
      <div className="flex h-full flex-col pt-3">
        <div className="relative text-center">
          <h2 className="text-xl text-white">Canjear Puntos</h2>
          <div className="absolute inset-y-0 right-0">
            <button
              onClick={() => setOpen(false)}
              className="mr-1 text-violet-400 focus:outline-none"
            >
              Cerrar
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll">
          <span className="text-white">{userId}</span>
        </div>
      </div>
    </BottomSheet>
  )
}

export default ExchangeSheet
