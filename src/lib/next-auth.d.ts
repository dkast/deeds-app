import { type DefaultSession, type Session } from "next-auth"
import type { NextComponentType, NextPageContext } from "next"
import type { Router } from "next/router"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string
      role: Role
      familyId: string
    } & DefaultSession["user"]
  }

  interface User {
    role: Role
    familyId: string
  }
}

declare module "next/app" {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P>
    router: Router
    __N_SSG?: boolean
    __N_SSP?: boolean
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session
    }
  }
}
