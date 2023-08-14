"use client"

import {
  GiftIcon,
  HomeIcon,
  PlusIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline"
import { type User } from "@prisma/client"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"

export default function TabBar({ user }: { user: User | undefined }) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 sm:mx-auto sm:max-w-lg pb-5 bg-gradient-to-b from-transparent to-zinc-950">
      <nav className="flex items-center justify-between bg-zinc-900 ring-2 ring-zinc-800 shadow-lg p-2 m-2 rounded-full">
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
          ? "bg-zinc-500/20 rounded-full text-zinc-100"
          : "text-zinc-500 hover:text-white",
        "py-3 px-4"
      )}
      aria-description={name}
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
    <Link href={href} className="py-3 px-4 pt-3">
      {user?.image ? (
        <div
          className={cn(
            href.includes(selectedPath!) ? "ring-2 ring-white" : "",
            "h-8 w-8 overflow-hidden rounded-full bg-gray-400"
          )}
        >
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
        <PlusIcon className="mx-2 -mt-5 h-16 w-16 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-orange-400 p-2 text-white shadow-lg shadow-pink-400/50" />
      </motion.div>
    </Link>
  )
}
