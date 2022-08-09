import type { NextPage } from "next"

export type NextPageWithAuthAndLayout = NextPage & {
  auth?: boolean
  getLayout?: (page: React.ReactElement) => React.ReactNode
}
