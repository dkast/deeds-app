import { env } from "@/env/server.mjs"
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"]
  })

if (env.NODE_ENV !== "production") {
  global.prisma = prisma
}

export default prisma
