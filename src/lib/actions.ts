"use server"

import { z } from "zod"

import prisma from "@/lib/prisma"
import { action } from "./safe-action"

const inputDeed = z.object({
  userId: z.string().optional(),
  activity: z.string(),
  points: z.number(),
  comments: z.string().nullish()
})

export const createDeed = action(
  inputDeed,
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
