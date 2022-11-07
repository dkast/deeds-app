import React, { useState } from "react"
import { User } from "@prisma/client"

import BottomSheet from "@/ui/BottomSheet"
import Input from "@/ui/Input"
import Button from "./ui/Button"

type ProfileEditSheetProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: User
}

const ProfileEditSheet = ({ open, setOpen, user }: ProfileEditSheetProps) => {
  const [name, setName] = useState<string>(user.name!)

  return (
    <BottomSheet open={open} setOpen={setOpen}>
      <div className="pb-safe flex h-full flex-col pt-3">
        <div className="relative text-center">
          <h2 className="text-xl text-white">Modificar Perfil</h2>
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
          <div className="mt-6 flex flex-col gap-2 p-1">
            <label
              htmlFor="name"
              className="block font-medium text-neutral-400"
            >
              Nombre
            </label>
            <Input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={event =>
                setName((event.target as HTMLInputElement).value)
              }
            ></Input>
            <Button type="button" variant="primary">
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}

export default ProfileEditSheet
