import { useState } from "react"
import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { trpc } from "@/src/utils/trpc"
import { useRouter } from "next/router"

import Loader from "@/src/components/Loader"
import Input from "@/src/components/Input"
import Button from "@/src/components/Button"

interface IFormValues {
  name: string
  familySlug: string
}

const schema = z.object({
  name: z.string().min(1, { message: "No puede ser vacío" }),
  familySlug: z.string().min(1, { message: "No puede ser vacío" })
})

const NewUser: NextPage = () => {
  const router = useRouter()
  const ctx = trpc.useContext()
  const { data: session, status } = useSession()
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IFormValues>({
    resolver: zodResolver(schema)
  })
  const updateNewMebmer = trpc.useMutation("user.updateNewMebmer", {
    onError: error => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Perfil actualizado")
      router.push("/app/home")
    },
    onSettled: () => {
      setSubmitted(false)
      ctx.invalidateQueries(["user.getUser"])
      ctx.invalidateQueries(["user.getFamilyMembers"])
    }
  })

  if (status === "loading") return <Loader />

  const onSubmit = (data: IFormValues) => {
    // console.log(data)
    setSubmitted(true)
    updateNewMebmer.mutate({
      userId: session?.user?.id!,
      name: data.name,
      familySlug: data.familySlug
    })
  }

  return (
    <>
      <Head>
        <title>Deberes</title>
        <meta name="description" content="Aplicacion de Parenting 2.0" />
      </Head>

      <div className="flex h-screen flex-col items-center justify-start gap-10 bg-gradient-to-b from-neutral-900 to-violet-900 px-4 pt-20">
        <div className="w-full rounded-xl border border-violet-700/50 bg-neutral-800 px-4 py-6 shadow shadow-violet-900/50 sm:max-w-lg">
          <div className="flex justify-between">
            <div className="text-xl font-bold text-white">
              Hola {session?.user?.name}
            </div>
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-400">
              <img
                src={session?.user?.image as string | undefined}
                alt="Avatar"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-6 flex flex-col gap-2">
              <div>
                <label
                  htmlFor="name"
                  className="ml-2 block font-medium text-neutral-400"
                >
                  ¿Como quieres ser llamado?
                </label>
                <div className="pt-1">
                  <Input
                    type="text"
                    placeholder="Nombre"
                    {...register("name")}
                    hasError={errors.name ? true : undefined}
                  ></Input>
                </div>
              </div>
              <div>
                <label
                  htmlFor="familySlug"
                  className="ml-2 block font-medium text-neutral-400"
                >
                  ¿A que familia te unes?
                </label>
                <div className="pt-1">
                  <Input
                    type="text"
                    placeholder="Famlia"
                    {...register("familySlug")}
                    hasError={errors.name ? true : undefined}
                  ></Input>
                </div>
              </div>
              <div className="mt-3">
                <Button type="submit" variant="primary" isLoading={submitted}>
                  Unirse
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default NewUser
