import { useEffect, useRef, useState } from 'react'

interface Options {
  /** Fraction of the element visible before it counts as "in view". */
  threshold?: number
  /** Root margin, e.g. '0px 0px -10% 0px' to trigger slightly early. */
  rootMargin?: string
  /** Stop observing after the first reveal (default true). */
  once?: boolean
}

/**
 * IntersectionObserver wrapper powering scroll-reveal animations without a
 * motion library. Returns a ref to attach and a boolean.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: Options = {},
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, inView]
}
