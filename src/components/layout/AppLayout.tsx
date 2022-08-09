import React from "react"
import { GiftIcon, HomeIcon } from "@heroicons/react/outline"
import Link from "next/link"

type AppLayoutProps = {
  children: React.ReactNode
}

type TabLinkProps = {
  href: string
  name: string
  icon: JSX.Element
}

const navigation = [
  { name: "Inicio", href: "/app/home", icon: HomeIcon },
  { name: "Premios", href: "/app/awards", icon: GiftIcon }
]

const TabBarMenu = (): JSX.Element => {
  return (
    <nav>
      <div className="flex justify-between px-4 py-2">
        <TabLink
          name="Inicio"
          href="/app/home"
          icon={<HomeIcon className="text-current" />}
        />
        <TabLink
          name="Premios"
          href="/app/awards"
          icon={<GiftIcon className="text-current" />}
        />
      </div>
    </nav>
  )
}

const TabLink = ({ href, name, icon }: TabLinkProps): JSX.Element => {
  return (
    <Link href={href}>
      <a className="text-gray-500 hover:text-blue-500">
        <div className="h-8 w-8">{icon}</div>
        {name}
      </a>
    </Link>
  )
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  return (
    <div className="mx-auto flex h-screen w-full flex-col bg-gray-100 sm:w-1/3">
      <main className="grow">{children}</main>
      <TabBarMenu />
    </div>
  )
}

export default AppLayout
