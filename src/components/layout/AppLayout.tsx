import React from "react"
import Link from "next/link"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import {
  GiftIcon,
  HomeIcon,
  PlusIcon,
  UserGroupIcon
} from "@heroicons/react/outline"
import { useRouter } from "next/router"
import classNames from "@/src/lib/classnames"

type AppLayoutProps = {
  children: React.ReactNode
}

type TabLinkProps = {
  href: string
  name: string
  icon: JSX.Element
  selectedPath: string
}

type TabUserProps = {
  href: string
  user: User | undefined
}

const TabBarMenu = (): JSX.Element => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const asPath = router.asPath

  if (status === "loading") {
    ;<span>Cargando...</span>
  }

  return (
    <nav className="flex justify-between bg-black px-6 py-8">
      <TabLink
        name="Inicio"
        href="/app/home"
        icon={<HomeIcon className="text-current" />}
        selectedPath={asPath}
      />
      <TabLink
        name="Premios"
        href="/app/awards"
        icon={<GiftIcon className="text-current" />}
        selectedPath={asPath}
      />
      <TabAddAction />
      <TabLink
        name="Familia"
        href="/app/family"
        icon={<UserGroupIcon className="text-current" />}
        selectedPath={asPath}
      />
      <TabUser href="/app/profile" user={session?.user as User} />
    </nav>
  )
}

const TabLink = ({
  href,
  name,
  icon,
  selectedPath
}: TabLinkProps): JSX.Element => {
  return (
    <Link href={href}>
      <a
        className={classNames(
          href === selectedPath
            ? "text-white"
            : "text-gray-500 hover:text-blue-500"
        )}
      >
        <div className="h-8 w-8">{icon}</div>
        {/* {name} */}
      </a>
    </Link>
  )
}

const TabUser = ({ href, user }: TabUserProps): JSX.Element => {
  return (
    <Link href={href}>
      <a className="text-gray-500 hover:text-blue-500">
        {user?.image ? (
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-400">
            <img src={user.image} alt="Avatar" />
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-400"></div>
        )}
      </a>
    </Link>
  )
}

const TabAddAction = (): JSX.Element => {
  return (
    <Link href="/app/compose">
      <a>
        <PlusIcon className="h-8 w-8 text-white" />
      </a>
    </Link>
  )
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  return (
    <div className="mx-auto flex h-screen w-full flex-col sm:w-1/2 lg:w-1/3">
      <main className="grow overflow-y-scroll">{children}</main>
      <TabBarMenu />
    </div>
  )
}

export default AppLayout
