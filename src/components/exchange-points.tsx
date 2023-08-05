"use client"

import { useState } from "react"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"

import ExchangeSheet from "@/components/exchange-sheet"

export default function ExchangePoints({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<string>("")

  const openModal = (id: string): void => {
    setSelectedUserId(id)
    setOpen(true)
  }

  return (
    <>
      <button onClick={() => openModal(id)}>
        <EllipsisVerticalIcon className="h-6 w-6 text-neutral-400" />
      </button>
      <ExchangeSheet open={open} setOpen={setOpen} />
    </>
  )
}
