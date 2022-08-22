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
      userId: z.string().optional(),
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
        await ctx.prisma.user.update({
          where: {
            id: input.userId
          },
          data: {
            totalPoints: {
              increment: input.points
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
