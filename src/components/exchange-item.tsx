"use client"

import { Award } from "@prisma/client"

import Button from "@/components/ui/button"

export const ExchangeItem = ({
  item,
  userId
}: {
  item: Award
  userId: string
}) => {
  // const ctx = trpc.useContext();

  // const claimPoints = trpc.useMutation("user.substractPoints", {
  //   onError: () => {
  //     toast.error("Algo salió mal 😥");
  //   },
  //   onSuccess: () => {
  //     toast.success("Puntos reclamados");
  //   },
  //   onSettled: () => {
  //     ctx.invalidateQueries(["user.getUser"]);
  //     ctx.invalidateQueries(["user.getFamilyMembers"]);
  //   }
  // });

  const onClaimPoints = (points: number) => {
    // claimPoints.mutate({
    //   userId: userId,
    //   points: points
    // });
  }

  return (
    <div className="z-10 flex overflow-hidden rounded-xl border border-neutral-700 p-3 shadow-lg">
      <img
        draggable="false"
        src={item.imageUrl}
        className="h-24 w-24 rounded-lg object-cover"
      />
      <div className="flex w-full flex-col items-start justify-between pl-4">
        <div>
          <span className="mb-2 font-bold text-zinc-200">
            {item.description}
          </span>
          <div className="flex items-center text-zinc-400">
            <img src="../images/gem.svg" className="mr-1 h-3 w-3" alt="coin" />
            <span className="text-sm">{item.points}</span>
          </div>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => onClaimPoints(item.points)}
        >
          Canjear
        </Button>
      </div>
    </div>
  )
}