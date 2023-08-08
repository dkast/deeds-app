"use client"

import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { updateNewUser } from "@/server/actions"
import { zodResolver } from "@hookform/resolvers/zod"
import { type User } from "next-auth"
import { useAction } from "next-safe-action/hook"
import { useRouter } from "next/navigation"
import { z } from "zod"

import Button from "@/components/ui/button"
import Input from "@/components/ui/input"

const schema = z.object({
  name: z.string().min(1, { message: "No puede ser vacío" }),
  familySlug: z.string().min(1, { message: "No puede ser vacío" })
})

export default function NewUserForm({ user }: { user: User }) {
  const router = useRouter()
  type IFormValues = z.infer<typeof schema>
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset
  } = useForm<IFormValues>({
    resolver: zodResolver(schema)
  })

  const { execute } = useAction(updateNewUser, {
    onSuccess: data => {
      console.log(data)
      if (data?.success) {
        toast.success("Perfil actualizado")
        router.push("/home")
      } else if (data?.failure) {
        toast.error(data.failure.reason!)
      }
    },
    onError: error => {
      toast.error("Algo salio mal")
    }
  })

  const onSubmit = (data: IFormValues) => {
    console.log(data)
    execute({
      userId: user?.id!,
      name: data.name,
      familySlug: data.familySlug
    })
  }

  return (
    <div className="flex h-screen flex-col items-center justify-start gap-10 bg-gradient-to-b from-neutral-900 to-violet-900 px-4 pt-20">
      <div className="w-full rounded-xl border border-violet-700/50 bg-neutral-800 px-4 py-6 shadow shadow-violet-900/50 sm:max-w-lg">
        <div className="flex justify-between">
          <div className="text-xl font-bold text-white">Hola {user?.name}</div>
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-400">
            <img src={user?.image as string | undefined} alt="Avatar" />
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
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                variant="primary"
                isLoading={isSubmitting}
              >
                Unirse
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
