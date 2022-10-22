import * as trpc from "@trpc/server"
import { Prisma } from "@prisma/client"
import { z } from "zod"

import { createProtectedRouter } from "./protected-router"

export const userRouter = createProtectedRouter()
  .query("getFamilyMembers", {
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
  .query("getUser", {
    input: z.object({
      userId: z.string().optional()
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId
        }
      })
    }
  })
  .mutation("updateNewMebmer", {
    input: z.object({
      userId: z.string(),
      name: z.string(),
      familySlug: z.string()
    }),
    async resolve({ ctx, input }) {
      await ctx.prisma.$transaction(
        async (prisma: Prisma.TransactionClient) => {
          // Search family by slug
          const family = await prisma.family.findFirst({
            where: {
              slug: input.familySlug
            }
          })

          if (family == null) {
            throw new trpc.TRPCError({
              code: "NOT_FOUND",
              message: "Familia no encontrada"
            })
          }

          // Update user data
          const user = prisma.user.update({
            data: {
              name: input.name,
              familyId: family.id
            },
            where: {
              id: input.userId
            }
          })

          return user
        }
      )
    }
  })
  .mutation("addPoints", {
    input: z.object({
      userId: z.string(),
      points: z.number()
    }),
    async resolve({ ctx, input }) {
      try {
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
  .mutation("substractPoints", {
    input: z.object({
      userId: z.string(),
      points: z.number()
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.user.update({
          where: {
            id: input.userId
          },
          data: {
            totalPoints: {
              decrement: input.points
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  })
