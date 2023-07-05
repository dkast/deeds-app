"use client"

import { BuiltInProviderType } from "next-auth/providers"
import { LiteralUnion, signIn, type ClientSafeProvider } from "next-auth/react"
import { useSearchParams } from "next/navigation"

import Button from "@/components/ui/Button"

export function AuthOptions({
  providers
}: {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}) {
  const searchParams = useSearchParams()

  return (
    <>
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
    </>
  )
}
