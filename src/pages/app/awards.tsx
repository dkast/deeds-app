import React from "react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Awards: NextPageWithAuthAndLayout = () => {
  return (
    <>
      <NavBar title="Premios"></NavBar>
    </>
  )
}

Awards.auth = true
Awards.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Awards
