import React from "react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Home: NextPageWithAuthAndLayout = () => {
  return (
    <>
      <NavBar title="Inicio"></NavBar>
    </>
  )
}

Home.auth = true
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Home
