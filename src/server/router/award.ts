import { z } from "zod"
import { createProtectedRouter } from "./protected-router"

export const awardRouter = createProtectedRouter()
  .query("getAll", {
    resolve({ ctx }) {
      return ctx.prisma.award.findMany()
    }
  })
  .mutation("create", {
    input: z.object({
      description: z.string().min(1),
      imageUrl: z.string().url(),
      refUrl: z.string().optional(),
      points: z.number().int().positive()
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.award.create({
          data: {
            description: input.description,
            imageUrl: input.imageUrl,
            points: input.points,
            refUrl: input?.refUrl
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
  .mutation("delete", {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.award.delete({
          where: {
            id: input.id
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
