export default function getLevel(levelPoints: number | undefined): number {
  const level = !levelPoints ? 1 : Math.floor(levelPoints / 1000) + 1
  return level
}
