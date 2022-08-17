import { z } from "zod"
import { createProtectedRouter } from "./protected-router"

export const deedRouter = createProtectedRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.deed.findMany({
        include: {
          User: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 20
      })
    }
  })
  .mutation("create", {
    input: z.object({
      userId: z.string().nullish(),
      activity: z.string(),
      points: z.number(),
      comments: z.string().nullish()
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.deed.create({
          data: {
            userId: input.userId,
            activity: input.activity,
            points: input.points,
            comments: input.comments
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
