/**
 * Tiny class-name joiner. Filters out falsy values so conditional classes read
 * cleanly: cn(s.card, isActive && s.active, className)
 */
export type ClassValue = string | number | false | null | undefined

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
