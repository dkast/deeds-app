import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { trpc } from "../utils/trpc"

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

      <div className="flex h-screen items-center justify-center">
        <Link href="/app/home">
          <a className="text-2xl text-white">Entrar</a>
        </Link>
      </div>
    </>
  )
}

export default Home
