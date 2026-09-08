import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import s from './PhoneFrame.module.css'

interface PhoneFrameProps {
  children: ReactNode
  /** Label under the device. */
  caption?: ReactNode
  size?: 'sm' | 'md'
  tone?: 'light' | 'dark'
  className?: string
}

/** Stylised phone mockup for MyMotor app screens in journeys / prototype. */
export function PhoneFrame({
  children,
  caption,
  size = 'md',
  tone = 'light',
  className,
}: PhoneFrameProps) {
  return (
    <figure className={cn(s.wrap, className)}>
      <div className={cn(s.device, s[size], s[tone])}>
        <span className={s.notch} aria-hidden="true" />
        <div className={s.screen}>{children}</div>
      </div>
      {caption && <figcaption className={s.caption}>{caption}</figcaption>}
    </figure>
  )
}
