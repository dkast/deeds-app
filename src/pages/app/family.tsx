import React from "react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"
import FamilyList from "@/src/components/FamilyList"

const Family: NextPageWithAuthAndLayout = () => {
  return (
    <>
      <NavBar title="Familia"></NavBar>
      <div className="mt-20 mb-28">
        <FamilyList />
      </div>
    </>
  )
}

Family.auth = true
Family.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Family
