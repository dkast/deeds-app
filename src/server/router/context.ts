// src/server/router/context.ts
import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { unstable_getServerSession as getServerSession } from "next-auth"
import { Webhook } from "discord-webhook-node"

import { authOptions as nextAuthOptions } from "@/src/utils/auth"
import { prisma } from "@/src/server/db/client"
import { env } from "@/src/env/server.mjs"

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions
) => {
  const req = opts?.req
  const res = opts?.res

  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions))

  const discord = new Webhook(env.DISCORD_WEBHOOK)

  return {
    req,
    res,
    session,
    prisma,
    discord
  }
}

type Context = trpc.inferAsyncReturnType<typeof createContext>

export const createRouter = () => trpc.router<Context>()
