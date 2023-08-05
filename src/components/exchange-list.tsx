import { redirect } from "next/navigation"

import { ExchangeItem } from "@/components/exchange-item"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { getCurrentUser } from "@/lib/session"

async function ExchangeList() {
  const user = await getCurrentUser()
  const awards = await prisma.award.findMany()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  return (
    <div>
      {awards?.map(award => {
        return (
          <div key={award.id} className="select-none">
            <ExchangeItem item={award} userId={user.id}></ExchangeItem>
          </div>
        )
      })}
    </div>
  )
}

export default ExchangeList
