import { Award } from "@prisma/client"

import { ExchangeItem } from "@/components/exchange-item"

export default function ExchangeList({
  userId,
  awards
}: {
  userId: string
  awards: Award[]
}) {
  return (
    <div>
      {awards?.map(award => {
        return (
          <div key={award.id} className="select-none">
            <ExchangeItem item={award} userId={userId}></ExchangeItem>
          </div>
        )
      })}
    </div>
  )
}
