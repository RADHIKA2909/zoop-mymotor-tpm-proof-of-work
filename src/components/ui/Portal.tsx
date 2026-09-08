import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** Renders children into <body> (client-only). */
export function Portal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])
  if (!mounted || typeof document === 'undefined') return null
  return createPortal(children, document.body)
}

/** Locks <body> scroll while `active` is true. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    document.body.classList.add('is-locked')
    return () => document.body.classList.remove('is-locked')
  }, [active])
}

/** Calls `handler` when Escape is pressed while `active`. */
export function useEscapeKey(active: boolean, handler: () => void) {
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [active, handler])
}
