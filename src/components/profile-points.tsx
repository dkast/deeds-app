export const ProfilePoints = ({
  totalPoints
}: {
  totalPoints: number | undefined
}) => {
  return (
    <div className="flex flex-row gap-2">
      <span className="text-white">{totalPoints}</span>
      <span className="flex items-center gap-2 text-zinc-400">puntos</span>
    </div>
  )
}
