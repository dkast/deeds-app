"use client"

import { type BuiltInProviderType } from "next-auth/providers"
import {
  signIn,
  type ClientSafeProvider,
  type LiteralUnion
} from "next-auth/react"

import Button from "@/components/ui/button"

export function AuthProvidersList({
  providers
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}) {
  return (
    <>
      {Object.values(providers!).map(provider => (
        <div
          key={provider.name}
          onClick={() =>
            signIn(provider.id, {
              callbackUrl: "/home"
            })
          }
        >
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
    </>
  )
}
