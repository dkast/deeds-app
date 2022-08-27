import React from "react"

import NavBar from "@/src/components/NavBar"
import Timeline from "@/src/components/Timeline"
import AppLayout from "@/components/layout/AppLayout"

import type { NextPageWithAuthAndLayout } from "@/src/types/types"
import { LevelModal } from "@/src/components/LevelModal"
import useAchievementStore from "@/src/store/achievement"

const Home: NextPageWithAuthAndLayout = () => {
  const { unlocked, setUnlocked } = useAchievementStore()
  return (
    <>
      <NavBar title="Inicio"></NavBar>
      <div className="mt-20 mb-28">
        <Timeline />
      </div>
      <LevelModal show={unlocked} />
    </>
  )
}

Home.auth = true
Home.getLayout = function getLayout(page: React.ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default Home
