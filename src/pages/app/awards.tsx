import React from "react"
import { PlusIcon } from "@heroicons/react/outline"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"
import AwardList from "@/components/AwardList"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Awards: NextPageWithAuthAndLayout = () => {
  return (
    <>
      <NavBar title="Premios" rightItem={<AddAward />} />
      <div className="mt-20 mb-28">
        <AwardList />
      </div>
    </>
  )
}

Awards.auth = true
Awards.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Awards

const AddAward = () => {
  return (
    <button onClick={() => alert("agrega")}>
      <PlusIcon className="h-6 w-6 text-white" />
    </button>
  )
}
