import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { PlusIcon } from "@heroicons/react/outline"

import Loader from "@/src/components/Loader"
import NavBar from "@/src/components/NavBar"
import AwardList from "@/components/AwardList"
import AppLayout from "@/components/layout/AppLayout"
import BottomSheet from "@/src/components/BottomSheet"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

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
      <AddAwardSheet open={open} onClose={setOpen} />
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
  onClose: React.Dispatch<React.SetStateAction<boolean>>
}

const AddAwardSheet = ({ open, onClose }: AddAwardSheetProps) => {
  return (
    <BottomSheet open={open} setOpen={onClose}>
      <span>Pruebas</span>
    </BottomSheet>
  )
}
