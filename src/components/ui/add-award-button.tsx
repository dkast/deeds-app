"use client"

import { PlusIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

const AddAwardButton = ({
  role,
  onClick
}: {
  role: string
  onClick?: () => void
}) => {
  if (role !== "PARENT") return null

  return (
    <Link href="/award">
      <PlusIcon className="h-6 w-6 text-white" />
    </Link>
  )
}

export default AddAwardButton
