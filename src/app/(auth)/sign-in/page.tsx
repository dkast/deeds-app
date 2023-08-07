import { getProviders } from "next-auth/react"

import { AuthOptions } from "@/components/auth-options"
import LottiePlayer from "@/components/shared/lottie-player"
import lottieJSON from "../../../../public/assets/robot-says-hi.json"

export default async function SignInPage() {
  const providers = await getProviders()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-violet-900">
      <div>
        <LottiePlayer
          lottieJSON={lottieJSON}
          className="h-80 w-80"
        ></LottiePlayer>
      </div>
      <h2 className="bg-gradient-to-l from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-3xl font-semibold leading-9 text-transparent">
        ¡Hola!
      </h2>
      <span className="mt-2 text-violet-500">
        Ingresa con tu cuenta de Discord
      </span>

      <div className="mt-6">
        <AuthOptions providers={providers} />
      </div>
    </div>
  )
}
