import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLevel(levelPoints: number | undefined): number {
  const level = !levelPoints ? 1 : Math.floor(levelPoints / 1000) + 1
  return level
}

export function getPct(levelPoints: number | undefined): number {
  const points = !levelPoints ? 0 : levelPoints % 1000
  const pct = Math.round((points / 1000) * 100)
  return pct
}

const formatDistanceLocale = {
  lessThanXSeconds: "{{count}}s",
  xSeconds: "{{count}}s",
  halfAMinute: "30s",
  lessThanXMinutes: "{{count}}min",
  xMinutes: "{{count}}min",
  aboutXHours: "{{count}}h",
  xHours: "{{count}}h",
  xDays: "{{count}}d",
  aboutXWeeks: "{{count}}sem",
  xWeeks: "{{count}}sem",
  aboutXMonths: "{{count}}m",
  xMonths: "{{count}}m",
  aboutXYears: "{{count}}a",
  xYears: "{{count}}a",
  overXYears: "{{count}}a",
  almostXYears: "{{count}}a"
}

export const formatDistance = (
  token: keyof typeof formatDistanceLocale,
  count: string
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = (formatDistanceLocale[token] as any).replace(
    "{{count}}",
    count
  )

  return result
}
