// src/server/router/index.ts
import { createRouter } from "./context"
import superjson from "superjson"

import { deedRouter } from "./deed"
import { awardRouter } from "./award"

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("deed.", deedRouter)
  .merge("award.", awardRouter)

// export type definition of API
export type AppRouter = typeof appRouter
