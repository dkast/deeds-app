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
