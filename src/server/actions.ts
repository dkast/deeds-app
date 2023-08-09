"use server"

import { env } from "@/env/server.mjs"
import { MessageBuilder, Webhook } from "discord-webhook-node"
import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { awardSchema, deedSchema } from "@/lib/types"
import { action } from "./safe-action"

const discord = new Webhook(env.DISCORD_WEBHOOK)

export const createDeed = action(
  deedSchema,
  async ({ userId, activity, points, comments }) => {
    try {
      await prisma.$transaction([
        prisma.deed.create({
          data: {
            userId,
            activity,
            points,
            comments
          }
        }),
        prisma.user.update({
          where: {
            id: userId
          },
          data: {
            totalPoints: {
              increment: points
            },
            levelPoints: {
              increment: points
            }
          }
        })
      ])

      revalidatePath("/home")

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)

export const createAward = action(
  awardSchema,
  async ({ description, imageUrl, refUrl, points }) => {
    try {
      await prisma.award.create({
        data: {
          description,
          imageUrl,
          refUrl,
          points
        }
      })

      revalidatePath("/awards")

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)

export const deleteAward = action(
  z.object({
    id: z.string()
  }),
  async ({ id }) => {
    try {
      await prisma.award.delete({
        where: {
          id
        }
      })

      revalidatePath("/awards")

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)

export const addPoints = action(
  z.object({
    userId: z.string(),
    points: z.number()
  }),
  async ({ userId, points }) => {
    try {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          totalPoints: {
            increment: points
          }
        }
      })

      revalidatePath("/family")

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)

export const substractPoints = action(
  z.object({
    userId: z.string(),
    points: z.number()
  }),
  async ({ userId, points }) => {
    try {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          totalPoints: {
            decrement: points
          }
        }
      })

      revalidatePath("/family")

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)

export const updateNewUser = action(
  z.object({
    userId: z.string(),
    name: z.string(),
    familySlug: z.string()
  }),
  async ({ userId, name, familySlug }) => {
    try {
      await prisma.$transaction(async _tx => {
        // Search family by slug
        const family = await prisma.family.findFirst({
          where: {
            slug: familySlug
          }
        })

        if (!family) {
          throw new Error("Familia no encontrada")
        }

        prisma.user.update({
          data: {
            name,
            familyId: family.id
          },
          where: {
            id: userId
          }
        })
      })

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)

export const updateUser = action(
  z.object({
    userId: z.string(),
    name: z.string()
  }),
  async ({ userId, name }) => {
    try {
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          name
        }
      })

      revalidatePath("/profile")

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)

export const sendMessage = action(
  z.object({
    content: z.string(),
    author: z.string().optional(),
    authorAvatar: z.string().optional(),
    description: z.string().optional(),
    color: z.number()
  }),
  async ({ content, author, authorAvatar, description, color }) => {
    if (env.NODE_ENV === "development") {
      return {
        success: true
      }
    }
    try {
      const msg = new MessageBuilder()
      if (description) {
        msg.setText(content)
        msg.setAuthor(author, authorAvatar)
        msg.setDescription(description!)
        msg.setColor(color)
        discord.send(msg)
      } else {
        discord.send(content)
      }

      return {
        success: true
      }
    } catch (error) {
      let message
      if (typeof error === "string") {
        message = error
      } else if (error instanceof Error) {
        message = error.message
      }
      return {
        failure: {
          reason: message
        }
      }
    }
  }
)
