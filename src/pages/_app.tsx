// src/pages/_app.tsx
import React from "react"
import { Toaster } from "react-hot-toast"
import type { AppRouter } from "@/server/router"
import { withTRPC } from "@trpc/next"
import { SessionProvider, signIn, useSession } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import superjson from "superjson"

import "@/styles/globals.css"

import type { NextPageWithAuthAndLayout } from "@/types/types"

type AppPropsWithAuthAndLayout = AppProps & {
  Component: NextPageWithAuthAndLayout
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps }
}: AppPropsWithAuthAndLayout) => {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <SessionProvider session={session}>
      {/* https://nextjs.org/docs/messages/no-document-viewport-meta */}
      <Head>
        <meta
          name="viewport"
          content="viewport-fit=cover, initial-scale=1, user-scalable=no"
        />
      </Head>
      {Component.auth ? (
        <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#6d28d9",
            color: "#fff"
          }
        }}
      />
    </SessionProvider>
  )
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return ""
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  const isUser = !!session?.user
  React.useEffect(() => {
    if (status === "loading") return // Do nothing while loading
    if (!isUser) signIn() // If not authenticated, force log ing
  }, [isUser, status])

  if (isUser) {
    return <>{children}</>
  }

  // Session is being fetched or no user. If no user, useEffect() will redirect
  return null
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`

    return {
      url,
      transformer: superjson
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false
})(MyApp)
