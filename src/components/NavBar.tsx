import Head from "next/head"
import React from "react"

type NavBarProps = {
  title: string
}

const NavBar = ({ title }: NavBarProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Deberes &emdash; {title}</title>
      </Head>
      <div className="w-full border-b border-indigo-900 px-8 py-4">
        <h1 className="text-center text-2xl font-bold text-white">{title}</h1>
      </div>
    </>
  )
}

export default NavBar
