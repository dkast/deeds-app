"use client"

import { useState } from "react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { Award } from "@prisma/client"

import ExchangeSheet from "@/components/exchange-sheet"

export default function ExchangePoints({
  id,
  awards
}: {
  id: string
  awards: Award[]
}) {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <EllipsisVerticalIcon className="h-6 w-6 text-neutral-400" />
      </button>
      <ExchangeSheet
        open={open}
        setOpen={setOpen}
        userId={id}
        awards={awards}
      />
    </>
  )
}
