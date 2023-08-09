import { type User } from "@prisma/client"

import TabBar from "@/components/layout/tab-bar"
import { getCurrentUser } from "@/lib/session"

export default async function AppLayout({
  children
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()
  return (
    <div className="mx-auto flex h-full w-full flex-col sm:max-w-lg">
      <div className="grow overflow-y-scroll">{children}</div>
      <TabBar user={user as User} />
    </div>
  )
}
