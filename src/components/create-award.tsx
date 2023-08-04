"use client"

import { startTransition, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { PlusIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hook"

import BottomSheet from "@/components/ui/bottom-sheet"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import { createAward } from "@/lib/actions"
import { awardSchema, type AwardValues } from "@/lib/types"

export default function CreateAward() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <PlusIcon className="h-6 w-6 text-white" />
      </button>
      <CreateAwardSheet open={open} setOpen={setOpen} />
    </>
  )
}

function CreateAwardSheet({
  open,
  setOpen
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    reset
  } = useForm<AwardValues>({
    resolver: zodResolver(awardSchema)
  })

  const { execute, isExecuting } = useAction(createAward, {
    onSuccess: () => {
      toast.success("Premio agregado")
      setOpen(false)
      reset()
    },
    onError: error => {
      toast.error("No se pudo agregar el premio")
    }
  })

  const onSubmit = (data: AwardValues) => {
    if (!isDirty) return

    execute(data)
  }

  return (
    <BottomSheet open={open} setOpen={setOpen}>
      <div className="flex h-full flex-col pt-3">
        <div className="relative text-center">
          <h2 className="text-xl text-white">Agregar Premio</h2>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 flex flex-col gap-2">
              <div>
                <label
                  htmlFor="description"
                  className="ml-2 block font-medium text-neutral-400"
                >
                  Descripcion
                </label>
                <div className="p-1">
                  <Input
                    type="text"
                    placeholder="Descripcion"
                    {...register("description")}
                    hasError={errors.description ? true : undefined}
                  ></Input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="imageUrl"
                  className="ml-2 block font-medium text-neutral-400"
                >
                  Imagen (URL)
                </label>
                <div className="p-1">
                  <Input
                    type="text"
                    placeholder="Imagen (URL)"
                    {...register("imageUrl")}
                    hasError={errors.imageUrl ? true : undefined}
                  ></Input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="points"
                  className="ml-2 block font-medium text-neutral-400"
                >
                  Puntos
                </label>
                <div className="p-1">
                  <Input
                    type="number"
                    placeholder="Puntos"
                    {...register("points", { valueAsNumber: true })}
                    hasError={errors.points ? true : undefined}
                  ></Input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="refUrl"
                  className="ml-2 block font-medium text-neutral-400"
                >
                  Liga
                </label>
                <div className="p-1">
                  <Input
                    type="text"
                    placeholder="Liga"
                    {...register("refUrl")}
                    hasError={errors.refUrl ? true : undefined}
                  ></Input>
                </div>
              </div>
            </div>
            <div className="mt-4 p-2">
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                variant="primary"
                isLoading={isSubmitting}
              >
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </BottomSheet>
  )
}
