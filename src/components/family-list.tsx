import { ArrowUpFromDot, Gem } from "lucide-react"
import Link from "next/link"

import ExchangePoints from "@/components/exchange-points"
import prisma from "@/lib/prisma"
import { getLevel } from "@/lib/utils"

export default async function FamilyList({
  familyId,
  userRole
}: {
  familyId: string
  userRole: string
}) {
  const members = await prisma.user.findMany({
    where: {
      familyId: familyId
    }
  })

  const awards = await prisma.award.findMany()

  return (
    <>
      <div className="mt-6 flex flex-col gap-2 px-3">
        {members?.map(member => {
          return (
            <div key={member.id}>
              <div className="flex flex-row items-center rounded-2xl bg-zinc-900 p-4 gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-400">
                  <Link href={`/family/${member?.id}`}>
                    <img
                      src={member.image as string | undefined}
                      alt="Avatar"
                    />
                  </Link>
                </div>
                <div className="ml-2 flex grow flex-col justify-between gap-2">
                  <Link
                    href={`/family/${member?.id}`}
                    className="text-xl font-semibold text-violet-400"
                  >
                    {member.name}
                  </Link>
                  <div className="flex gap-6 justify-between">
                    <div className="flex items-start gap-2">
                      <Gem className="h-5 w-5 rounded-full bg-zinc-600/40 p-1 text-zinc-400" />
                      <span className="text-sm text-zinc-400">
                        {member.totalPoints} puntos
                      </span>
                    </div>
                    <div className="flex items-end gap-2">
                      <ArrowUpFromDot className="h-5 w-5 rounded-full bg-zinc-600/40 p-1 text-zinc-400" />
                      <span className="text-sm text-zinc-400">
                        Nivel {getLevel(member.levelPoints)}
                      </span>
                    </div>
                  </div>
                </div>
                {userRole === "PARENT" && (
                  <ExchangePoints id={member.id} awards={awards} />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
