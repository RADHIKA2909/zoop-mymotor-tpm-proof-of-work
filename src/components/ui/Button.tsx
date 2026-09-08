import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from './Icon'
import s from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'ghost' | 'link'
type Size = 'sm' | 'md' | 'lg'

interface CommonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  iconLeft?: IconName
  iconRight?: IconName
  fullWidth?: boolean
  className?: string
  /** Internal route (react-router). */
  to?: string
  /** External URL — opens in a new tab. */
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  className,
  to,
  href,
  onClick,
  disabled,
  type = 'button',
  ...rest
}: CommonProps) {
  const classes = cn(
    s.btn,
    s[variant],
    s[size],
    fullWidth && s.fullWidth,
    className,
  )

  const inner = (
    <>
      {iconLeft && <Icon name={iconLeft} size={size === 'sm' ? 15 : 17} />}
      <span>{children}</span>
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 15 : 17} />}
    </>
  )

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...rest}>
        {inner}
      </Link>
    )
  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onClick}
        {...rest}
      >
        {inner}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {inner}
    </button>
  )
}
