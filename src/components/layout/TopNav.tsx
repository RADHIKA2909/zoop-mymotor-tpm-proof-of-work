import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { SECTIONS } from '@/data/sections'
import { Icon } from '@/components/ui/Icon'
import { LogoLockup } from './LogoLockup'
import { ThemeToggle } from './ThemeToggle'
import { MobileNav } from './MobileNav'
import s from './TopNav.module.css'

/** Sticky horizontal navigation from the reference design. */
export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <Link to="/" className={s.brand} aria-label="Home">
          <LogoLockup />
        </Link>

        <nav className={s.nav} aria-label="Case study sections">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              to={section.path}
              className={({ isActive }) => cn(s.link, isActive && s.linkActive)}
            >
              <span className={s.linkNum}>{section.num}</span>
              {section.navLabel}
            </NavLink>
          ))}
        </nav>

        <div className={s.right}>
          <div className={s.badge}>
            <span className={s.badgeSub}>Building a more reliable EV future</span>
          </div>
          <ThemeToggle className={s.themeToggle} />
          <button
            type="button"
            className={s.menuBtn}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Icon name="menu" size={20} />
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
