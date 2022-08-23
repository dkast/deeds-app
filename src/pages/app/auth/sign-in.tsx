import React from "react"
import Head from "next/head"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"
import { unstable_getServerSession } from "next-auth/next"

import Button from "@/components/Button"
import { authOptions } from "@/src/utils/auth"

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next"

const SignIn = ({
  providers
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Biztro - Bienvenido</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold leading-9 text-white">Hola!</h2>
        <span className="mt-2 text-neutral-500">
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
