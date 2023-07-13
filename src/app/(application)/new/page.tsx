import { redirect } from "next/navigation"

import ActivityButton from "@/components/activyt-button"
import NavBar from "@/components/layout/nav-bar"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { ACTIVITIES } from "@/lib/types"

export default async function NewPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions.pages?.signIn || "/sign-in")
  }

  return (
    <>
      <NavBar title="Agregar" />
      <div className="mt-20 mb-28 flex flex-col items-center">
        <div>
          <ul className="grid grid-cols-2 gap-2">
            {ACTIVITIES.map(act => (
              <li key={act.id}>
                <ActivityButton
                  iconName={act.icon}
                  text={act.description}
                  points={act.points}
                  // onClick={() => onActivityTap(act)}
                ></ActivityButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
