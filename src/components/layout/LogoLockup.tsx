import { cn } from '@/lib/cn'
import s from './LogoLockup.module.css'

interface LogoLockupProps {
  /** Compact hides the "MyMotor" wordmark on small screens. */
  size?: 'sm' | 'md'
  tone?: 'default' | 'inverse'
  className?: string
}

/**
 * "ZOOP × MyMotor" lockup from the reference nav. Text-based marks (no official
 * logo assets) — deliberately simple so it reads as a candidate's proof of work,
 * not an impersonation of ZOOP branding.
 */
export function LogoLockup({ size = 'md', tone = 'default', className }: LogoLockupProps) {
  return (
    <span className={cn(s.lockup, s[size], s[tone], className)}>
      <span className={s.zoop}>ZOOP</span>
      <span className={s.cross} aria-hidden="true">
        ×
      </span>
      <span className={s.myMotorMark} aria-hidden="true">
        M
      </span>
      <span className={s.myMotor}>MyMotor</span>
      <span className="sr-only">ZOOP and MyMotor — Technical Product Manager proof of work</span>
    </span>
  )
}
