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
import classNames from "@/src/utils/classnames"
import { motion } from "framer-motion"

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
  selectedPath: string
}

const TabBarMenu = (): JSX.Element => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const asPath = router.asPath

  if (status === "loading") {
    ;<span>Cargando...</span>
  }

  return (
    <div className="fixed inset-x-0 bottom-0 sm:mx-auto sm:max-w-lg">
      <nav className="flex items-center justify-between bg-black px-4 pb-9 sm:m-2 sm:rounded-2xl">
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
        <TabUser
          href="/app/profile"
          user={session?.user as User}
          selectedPath={asPath}
        />
      </nav>
    </div>
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
            ? "border-t-2 border-violet-500 bg-gradient-to-b from-violet-800/50 to-black text-white"
            : "text-gray-500 hover:text-violet-500",
          "py-3 px-4"
        )}
      >
        <div className="h-8 w-8">{icon}</div>
        {/* {name} */}
      </a>
    </Link>
  )
}

const TabUser = ({ href, user, selectedPath }: TabUserProps): JSX.Element => {
  return (
    <Link href={href}>
      <a
        className={classNames(
          href === selectedPath
            ? "border-t-2 border-violet-500 bg-gradient-to-b from-violet-800/50 to-black"
            : "",
          "py-3 px-4 pt-3"
        )}
      >
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
      <motion.a whileTap={{ scale: 0.9 }}>
        <PlusIcon className="mx-2 -mt-3 h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-red-400 p-2 text-white shadow-lg shadow-pink-600/50" />
      </motion.a>
    </Link>
  )
}

const AppLayout = ({ children }: AppLayoutProps): JSX.Element => {
  return (
    <div className="mx-auto flex h-screen w-full flex-col sm:max-w-lg">
      <main className="grow overflow-y-scroll">{children}</main>
      <TabBarMenu />
    </div>
  )
}

export default AppLayout
