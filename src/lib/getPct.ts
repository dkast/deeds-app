export default function getPct(levelPoints: number | undefined): number {
  const points = !levelPoints ? 0 : levelPoints % 1000
  const pct = Math.round((points / 1000) * 100)
  return pct
}
