import type { NextPage } from "next"

export type NextPageWithAuthAndLayout = NextPage & {
  auth?: boolean
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export const ACTIVITIES = [
  {
    id: "activity_tbrush",
    icon: "dental-care.svg",
    description: "Cepillarme los dientes",
    points: 10,
    requireComments: false
  },
  {
    id: "activity_bath",
    icon: "rubber-duck.svg",
    description: "Bañarme",
    points: 30,
    requireComments: false
  },
  {
    id: "activity_homework",
    icon: "backpack.svg",
    description: "Hacer la tarea",
    points: 50,
    requireComments: false
  },
  {
    id: "activity_help",
    icon: "volunteer.svg",
    description: "Ayudar en la casa",
    points: 30,
    requireComments: true
  },
  {
    id: "activity_online",
    icon: "laptop.svg",
    description: "Tomar clase online",
    points: 30
  },
  {
    id: "activity_excercise",
    icon: "triangle.svg",
    description: "Hacer ejercicio 30 min",
    points: 30,
    requireComments: true
  },
  {
    id: "activity_swim",
    icon: "swimmer.svg",
    description: "Nadar 30 min",
    points: 30,
    requireComments: false
  },
  {
    id: "activity_diet",
    icon: "diet.svg",
    description: "Comer saludable",
    points: 50,
    requireComments: true
  }
]
