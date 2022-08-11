import React from "react"

import AppLayout from "@/components/layout/AppLayout"
import NavBar from "@/src/components/NavBar"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"

const Profile: NextPageWithAuthAndLayout = () => {
  return (
    <>
      <NavBar title="Mi Perfil"></NavBar>
    </>
  )
}

Profile.auth = true
Profile.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Profile
