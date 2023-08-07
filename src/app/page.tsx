import Link from "next/link"

import LottiePlayer from "@/components/shared/lottie-player"
import lottieJSON from "../../public/assets/robot-playing.json"

export default function StartPage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center gap-10 bg-gradient-to-b from-neutral-900 to-violet-900">
      <div className="relative mb-16 gap-2">
        <h1 className="text-4xl font-semibold text-violet-300">Deberes</h1>
        <div className="absolute top-0 -right-10">
          <small className="rounded-full bg-cyan-500 px-2 text-sm font-semibold tracking-tight text-cyan-900">
            v3
          </small>
        </div>
      </div>
      <div>
        <LottiePlayer lottieJSON={lottieJSON} className="h-48 w-48" />
      </div>
      <Link
        href="/home"
        className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-500 to-orange-500 px-4 py-2 text-2xl text-white"
      >
        Entrar
      </Link>
    </div>
  )
}
