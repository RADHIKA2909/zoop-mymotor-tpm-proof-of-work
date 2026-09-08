import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { SECTIONS } from '@/data/sections'
import { Icon } from '@/components/ui/Icon'
import { Portal, useEscapeKey, useScrollLock } from '@/components/ui/Portal'
import { LogoLockup } from './LogoLockup'
import { SectionProgress } from './SectionProgress'
import { ThemeToggle } from './ThemeToggle'
import s from './MobileNav.module.css'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useScrollLock(open)
  useEscapeKey(open, onClose)

  return (
    <Portal>
      <div className={cn(s.root, open && s.open)} aria-hidden={!open}>
        <div className={s.backdrop} onClick={onClose} />
        <div className={s.panel} role="dialog" aria-modal="true" aria-label="Menu">
          <div className={s.head}>
            <LogoLockup size="sm" />
            <div className={s.headActions}>
              <ThemeToggle />
              <button className={s.close} onClick={onClose} aria-label="Close menu">
                <Icon name="close" size={18} />
              </button>
            </div>
          </div>

          <nav className={s.nav}>
            <NavLink to="/" end className={({ isActive }) => cn(s.link, isActive && s.linkActive)} onClick={onClose}>
              <span className={s.num}>00</span>
              <span>Overview</span>
            </NavLink>
            {SECTIONS.map((section) => (
              <NavLink
                key={section.id}
                to={section.path}
                className={({ isActive }) => cn(s.link, isActive && s.linkActive)}
                onClick={onClose}
              >
                <span className={s.num}>{section.num}</span>
                <span>
                  <span className={s.linkTitle}>{section.navLabel}</span>
                  <span className={s.linkTagline}>{section.tagline}</span>
                </span>
              </NavLink>
            ))}
          </nav>

          <div className={s.foot}>
            <SectionProgress />
          </div>
        </div>
      </div>
    </Portal>
  )
}
