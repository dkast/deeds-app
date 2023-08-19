"use client"

import { useState } from "react"
import { type Award } from "@prisma/client"
import { MoreVertical } from "lucide-react"

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
        <MoreVertical size={24} className="text-zinc-300" />
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
