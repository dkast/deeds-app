import React from "react"
import Lottie from "react-lottie-player"
import Button from "@/src/components/ui/Button"
import { authOptions } from "@/src/lib/auth"
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next"
import { unstable_getServerSession } from "next-auth/next"
import { getProviders, signIn } from "next-auth/react"
import Head from "next/head"

import lottieJSON from "../../../../public/assets/robot-says-hi.json"

const SignIn = ({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Deberes - Bienvenido</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-violet-900">
        <div>
          <Lottie
            loop
            animationData={lottieJSON}
            play
            className="h-60 w-60"
          ></Lottie>
        </div>
        <h2 className="bg-gradient-to-l from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-3xl font-semibold leading-9 text-transparent">
          ¡Hola!
        </h2>
        <span className="mt-2 text-violet-500">
          Ingresa con tu cuenta de Discord
        </span>

        <div className="mt-6">
          {Object.values(providers!).map(provider => (
            <div key={provider.name} onClick={() => signIn(provider.id)}>
              <Button
                variant="primary"
                mode="full"
                leftIcon={
                  <img
                    src={`/images/${provider.name.toLowerCase()}.svg`}
                    alt={provider.name}
                  />
                }
              >
                Continuar con {provider.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { callbackUrl } = context.query
  const providers = await getProviders()
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )

  if (session?.user) {
    return {
      redirect: {
        permanent: false,
        destination: callbackUrl
      },
      props: { providers }
    }
  }

  return {
    props: { providers }
  }
}

export default SignIn
