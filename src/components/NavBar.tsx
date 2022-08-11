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
      <div className="border-b border-gray-400 px-8 py-4">
        <h1 className="text-center text-2xl font-bold">{title}</h1>
      </div>
    </>
  )
}

export default NavBar
