import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import Lottie from "react-lottie-player"

import lottieJSON from "../../public/assets/robot-playing.json"

type TechnologyCardProps = {
  name: string
  description: string
  documentation: string
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deberes</title>
        <meta name="description" content="Aplicacion de Parenting 2.0" />
      </Head>

      <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-neutral-900 to-violet-900">
        <div>
          <Lottie
            loop
            animationData={lottieJSON}
            play
            className="h-60 w-60"
          ></Lottie>
        </div>
        <Link href="/app/home">
          <a className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-orange-500 px-4 py-2 text-2xl text-white">
            Entrar
          </a>
        </Link>
      </div>
    </>
  )
}

export default Home
