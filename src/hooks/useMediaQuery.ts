import { useEffect, useState } from 'react'

/**
 * Subscribe to a CSS media query. SSR-safe default of `false`.
 * Usage: const isDesktop = useMediaQuery('(min-width: 960px)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia(query).matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Named breakpoint helpers kept in sync with the layout CSS. */
export const useIsDesktop = () => useMediaQuery('(min-width: 960px)')
export const useIsTablet = () => useMediaQuery('(min-width: 640px)')
export const usePrefersReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
