import { z } from "zod"
import * as trpc from "@trpc/server"
import { MessageBuilder } from "discord-webhook-node"

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
        await ctx.prisma.$transaction([
          ctx.prisma.deed.create({
            data: {
              userId: input.userId,
              activity: input.activity,
              points: input.points,
              comments: input.comments
            }
          }),
          ctx.prisma.user.update({
            where: {
              id: input.userId
            },
            data: {
              totalPoints: {
                increment: input.points
              },
              levelPoints: {
                increment: input.points
              }
            }
          })
        ])
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error as string
        })
      }
    }
  })
  .mutation("message", {
    input: z.object({
      content: z.string(),
      author: z.string().optional(),
      authorAvatar: z.string().optional(),
      description: z.string().optional(),
      color: z.number()
    }),
    async resolve({ ctx, input }) {
      if (process.env.NODE_ENV !== "production") return
      if (input.description) {
        const msg = new MessageBuilder()
        msg.setText(input.content)
        msg.setAuthor(input.author, input.authorAvatar)
        msg.setDescription(input.description!)
        msg.setColor(input.color)
        ctx.discord.send(msg)
      } else {
        ctx.discord.send(input.content)
      }
    }
  })
