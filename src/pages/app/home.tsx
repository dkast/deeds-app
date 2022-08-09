import React from "react"

import AppLayout from "@/components/layout/AppLayout"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Home: NextPageWithAuthAndLayout = () => {
  return <div>Home</div>
}

Home.auth = true
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Home
