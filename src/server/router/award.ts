import { z } from "zod"
import { createProtectedRouter } from "./protected-router"

export const awardRouter = createProtectedRouter().query("getAll", {
  resolve({ ctx }) {
    return ctx.prisma.award.findMany()
  }
})
