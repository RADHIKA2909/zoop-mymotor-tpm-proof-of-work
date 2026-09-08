import { cn } from '@/lib/cn'
import { useTheme } from '@/hooks/useTheme'
import { Icon } from '@/components/ui/Icon'
import s from './ThemeToggle.module.css'

/**
 * Optional global light/dark switch. The case study is light-first and mostly
 * uses section-scoped dark treatments, but this is handy for reviewing the
 * Control Tower / prototype in dark and for accessibility.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className={cn(s.toggle, className)}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={16} />
    </button>
  )
}
