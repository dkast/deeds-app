import React from "react"
import { motion } from "framer-motion"

import BottomSheet from "@/components/BottomSheet"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { trpc } from "@/src/utils/trpc"
import AwardView from "@/components/AwardView"

type ExchangeSheetProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  userId: string
}

const ExchangeSheet = ({ open, setOpen, userId }: ExchangeSheetProps) => {
  const { data: awards, isLoading } = trpc.useQuery(["award.getAll"])

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
          {/* <span className="text-white">{userId}</span> */}
          <div className="mt-6 flex flex-col gap-2">
            <label
              htmlFor="points"
              className="ml-2 block font-medium text-neutral-400"
            >
              Puntos
            </label>
            <div className="p-1">
              <Input type="number" placeholder="0"></Input>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="primary">
                Agregar
              </Button>
              <Button type="button" variant="danger">
                Restar
              </Button>
            </div>
            <label className="my-2 block font-medium text-neutral-400">
              Premios
            </label>
            <div className="flex flex-col gap-2">
              {awards?.map(award => {
                return (
                  <motion.div key={award.id} whileTap={{ scale: 0.95 }}>
                    <AwardView item={award} allowDelete={false}></AwardView>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}

export default ExchangeSheet
