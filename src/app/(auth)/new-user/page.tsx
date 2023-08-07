import { redirect } from "next/navigation"

import NewUserForm from "@/components/new-user-form"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"

export default async function NewUserPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }
  return <NewUserForm user={user} />
}
