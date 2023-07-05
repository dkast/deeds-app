// src/server/router/context.ts
import { env } from "@/src/env/server.mjs"
import { authOptions as nextAuthOptions } from "@/src/lib/auth"
import { prisma } from "@/src/server/db/client"
import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { Webhook } from "discord-webhook-node"
import { unstable_getServerSession as getServerSession } from "next-auth"

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
