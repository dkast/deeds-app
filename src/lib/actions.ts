"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"

import prisma from "@/lib/prisma"
import { action } from "./safe-action"
import { awardSchema, deedSchema } from "./types"

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
      return {
        failure: {
          reason: error
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
      return {
        failure: {
          reason: error
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
      return {
        failure: {
          reason: error
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
      return {
        failure: {
          reason: error
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
      return {
        failure: {
          reason: error
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
      return {
        failure: {
          reason: error
        }
      }
    }
  }
)
