import React, { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import NavBar from "@/src/components/NavBar"
import BottomSheet from "@/src/components/ui/BottomSheet"
import Button from "@/src/components/ui/Button"
import Input from "@/src/components/ui/Input"
import Loader from "@/src/components/ui/Loader"
import { trpc } from "@/src/lib/trpc"
import type { NextPageWithAuthAndLayout } from "@/src/types/types"
import { PlusIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { z } from "zod"

import AwardList from "@/components/AwardList"
import AppLayout from "@/components/layout/AppLayout"

const Awards: NextPageWithAuthAndLayout = () => {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState<boolean>(false)

  if (status === "loading") return <Loader />

  return (
    <>
      <NavBar
        title="Premios"
        rightItem={
          <AddAwardButton
            role={session?.user?.role}
            onClick={() => setOpen(true)}
          />
        }
      />
      <div className="mt-20 mb-28">
        <AwardList />
      </div>
      <AddAwardSheet open={open} setOpen={setOpen} />
    </>
  )
}

Awards.auth = true
Awards.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Awards

type AddAwardButtonProps = {
  role: string | undefined
  onClick: () => void
}

const AddAwardButton = ({ role, onClick }: AddAwardButtonProps) => {
  if (role !== "PARENT") return null

  return (
    <button onClick={onClick}>
      <PlusIcon className="h-6 w-6 text-white" />
    </button>
  )
}

type AddAwardSheetProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface IFormValues {
  description: string
  imageUrl: string
  refUrl?: string
  points: number
}

const schema = z.object({
  description: z.string().min(1, { message: "Requerido" }),
  imageUrl: z.string().url(),
  refUrl: z.string().optional(),
  points: z.number().int().positive()
})

const AddAwardSheet = ({ open, setOpen }: AddAwardSheetProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IFormValues>({
    resolver: zodResolver(schema)
  })
  const ctx = trpc.useContext()
  const createAward = trpc.useMutation("award.create", {
    onError: () => {
      toast.error("Error al guardar")
    },
    onSuccess: () => {
      toast.success("Premio guardado")
      setOpen(false)
      reset()
    },
    onMutate: () => {
      ctx.cancelQuery(["award.getAll"])

      let optimisticUpdate = ctx.getQueryData(["award.getAll"])
      if (optimisticUpdate) {
        ctx.setQueryData(["award.getAll"], optimisticUpdate)
      }
    },
    onSettled: () => {
      ctx.invalidateQueries(["award.getAll"])
      setSubmitted(false)
    }
  })

  const onSubmit = (data: IFormValues) => {
    setSubmitted(true)
    createAward.mutate(data)
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
              <Button type="submit" variant="primary" isLoading={submitted}>
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </BottomSheet>
  )
}
