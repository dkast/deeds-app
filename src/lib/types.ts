import { type Deed, type User } from "@prisma/client"
import { z } from "zod"

export type Activity = {
  id: string
  icon: string
  description: string
  points: number
  requireComments: boolean
}

export const ACTIVITIES: Activity[] = [
  {
    id: "activity_tbrush",
    icon: "🪥",
    description: "Cepillarme los dientes",
    points: 10,
    requireComments: false
  },
  {
    id: "activity_bath",
    icon: "🚿",
    description: "Bañarme",
    points: 20,
    requireComments: false
  },
  {
    id: "activity_homework",
    icon: "📔",
    description: "Hacer la tarea",
    points: 50,
    requireComments: false
  },
  {
    id: "activity_help",
    icon: "🖐",
    description: "Ayudar en la casa",
    points: 50,
    requireComments: true
  },
  {
    id: "activity_online",
    icon: "💻",
    description: "Tomar clase online",
    points: 30,
    requireComments: false
  },
  {
    id: "activity_excercise",
    icon: "👟",
    description: "Ejercicio +30 min",
    points: 30,
    requireComments: true
  },
  {
    id: "activity_swim",
    icon: "🏊",
    description: "Nadar +30 min",
    points: 30,
    requireComments: false
  },
  {
    id: "activity_diet",
    icon: "🍎",
    description: "Comer saludable",
    points: 30,
    requireComments: true
  }
]

export const GREETINGS = [
  "¡Muy bien! Sigue así 👍",
  "¡Bien hecho! Tú puedes 💪",
  "Sigue arrasando 🔥",
  "Eso fue pan comido 😎",
  "¡Excelente! Sigue así 👊"
]

export interface UserDeed extends Deed {
  User: User | null
}

export const deedSchema = z.object({
  userId: z.string().optional(),
  activity: z.string(),
  points: z.number(),
  comments: z.string().nullish()
})

export type DeedValues = z.infer<typeof deedSchema>

export const awardSchema = z.object({
  description: z.string().min(1, { message: "Requerido" }),
  imageUrl: z.string().url(),
  refUrl: z.string().optional(),
  points: z.number().int().positive()
})

export type AwardValues = z.infer<typeof awardSchema>
