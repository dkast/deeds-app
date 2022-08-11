import React from "react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Family: NextPageWithAuthAndLayout = () => {
  return (
    <>
      <NavBar title="Familia"></NavBar>
    </>
  )
}

Family.auth = true
Family.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Family
