"use client"

import {
  GiftIcon,
  HomeIcon,
  PlusIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline"
import { User } from "@prisma/client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"

export default function TabBar({ user }: { user: User | undefined }) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 sm:mx-auto sm:max-w-lg">
      <nav className="flex items-center justify-between bg-black px-4 pb-9 sm:m-2 sm:rounded-2xl">
        <TabLink
          name="Inicio"
          href="/home"
          icon={<HomeIcon className="text-current" />}
          selectedPath={segment}
        />
        <TabLink
          name="Premios"
          href="/awards"
          icon={<GiftIcon className="text-current" />}
          selectedPath={segment}
        />
        <TabAddAction />
        <TabLink
          name="Familia"
          href="/family"
          icon={<UserGroupIcon className="text-current" />}
          selectedPath={segment}
        />
        <TabUser href="/profile" user={user} selectedPath={segment} />
      </nav>
    </div>
  )
}

type TabLinkProps = {
  href: string
  name: string
  icon: JSX.Element
  selectedPath: string | null
}

function TabLink({ href, name, icon, selectedPath }: TabLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        href.includes(selectedPath!)
          ? "border-t-2 border-violet-500 bg-gradient-to-b from-violet-800/50 to-black text-white"
          : "text-gray-500 hover:text-violet-500",
        "py-3 px-4"
      )}
    >
      <div className="h-8 w-8">{icon}</div>
    </Link>
  )
}

type TabUserProps = {
  href: string
  user: User | undefined
  selectedPath: string | null
}

function TabUser({ href, user, selectedPath }: TabUserProps) {
  return (
    <Link
      href={href}
      className={cn(
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
    </Link>
  )
}

function TabAddAction() {
  return (
    <Link href="/new">
      <motion.div whileTap={{ scale: 0.9 }}>
        <PlusIcon className="mx-2 -mt-3 h-14 w-14 rounded-full bg-gradient-to-br from-cyan-400 via-purple-500 to-red-400 p-2 text-white shadow-lg shadow-pink-600/50" />
      </motion.div>
    </Link>
  )
}
