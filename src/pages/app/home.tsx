import React from "react"

import NavBar from "@/src/components/NavBar"
import Timeline from "@/src/components/Timeline"
import AppLayout from "@/components/layout/AppLayout"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Home: NextPageWithAuthAndLayout = () => {
  return (
    <>
      <NavBar title="Inicio"></NavBar>
      <Timeline />
    </>
  )
}

Home.auth = true
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Home
