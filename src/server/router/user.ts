import { z } from "zod"
import { createProtectedRouter } from "./protected-router"

export const userRouter = createProtectedRouter().query("getFamilyMembers", {
  input: z.object({
    familyId: z.string().nullish()
  }),
  resolve({ ctx, input }) {
    return ctx.prisma.user.findMany({
      where: {
        familyId: input.familyId
      }
    })
  }
})
