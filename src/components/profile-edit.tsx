"use client"

import { useState } from "react"
import toast from "react-hot-toast"
import { updateUser } from "@/server/actions"
import { PencilIcon } from "@heroicons/react/20/solid"
import { User } from "@prisma/client"
import { useAction } from "next-safe-action/hook"

import BottomSheet from "@/components/ui/bottom-sheet"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

export default function ProfileEdit({ user }: { user: User }) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <button
        type="button"
        className="rounded-full bg-neutral-700/50 p-1"
        onClick={() => setOpen(true)}
      >
        <PencilIcon className="h-4 w-4 text-neutral-400"></PencilIcon>
      </button>
      <ProfileEditSheet open={open} setOpen={setOpen} user={user} />
    </>
  )
}

const ProfileEditSheet = ({
  open,
  setOpen,
  user
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  user: User
}) => {
  const [name, setName] = useState<string>(user.name!)
  const { execute, isExecuting } = useAction(updateUser, {
    onSuccess: () => {
      toast.success("Perfil actualizado")
      setOpen(false)
    },
    onError: error => {
      toast.error("No se pudo actualizar el perfil")
    }
  })

  const onUpdateUser = () => {
    execute({
      userId: user.id,
      name: name
    })
  }

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
            <Button
              disabled={!name || isExecuting}
              type="button"
              variant="primary"
              onClick={onUpdateUser}
              isLoading={isExecuting}
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
