import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { getAdjacentSections, SECTION_BY_ID } from '@/data/sections'
import s from './SectionScaffold.module.css'

interface SectionScaffoldProps {
  sectionId: string
  children: ReactNode
}

/**
 * Shared frame for every section route: title block + content + prev/next.
 * Individual sections pass their built content as children (currently the
 * <Placeholder>).
 */
export function SectionScaffold({ sectionId, children }: SectionScaffoldProps) {
  const section = SECTION_BY_ID[sectionId]
  const { prev, next } = getAdjacentSections(sectionId)

  return (
    <article>
      <header className={s.hero}>
        <Container>
          <Eyebrow number={section.num}>{section.phase}</Eyebrow>
          <h1 className={s.title}>{section.title}</h1>
          <p className={s.tagline}>{section.tagline}</p>
        </Container>
      </header>

      <Container>
        <div className={s.body}>{children}</div>

        <nav className={s.pager} aria-label="Section navigation">
          {prev ? (
            <Link to={prev.path} className={s.pagerLink}>
              <Icon name="arrow-left" size={16} />
              <span>
                <span className={s.pagerKicker}>Previous</span>
                <span className={s.pagerTitle}>
                  {prev.num} · {prev.navLabel}
                </span>
              </span>
            </Link>
          ) : (
            <Link to="/" className={s.pagerLink}>
              <Icon name="arrow-left" size={16} />
              <span>
                <span className={s.pagerKicker}>Back to</span>
                <span className={s.pagerTitle}>Overview</span>
              </span>
            </Link>
          )}

          {next ? (
            <Link to={next.path} className={s.pagerLinkNext}>
              <span>
                <span className={s.pagerKicker}>Next</span>
                <span className={s.pagerTitle}>
                  {next.num} · {next.navLabel}
                </span>
              </span>
              <Icon name="arrow-right" size={16} />
            </Link>
          ) : (
            <Link to="/" className={s.pagerLinkNext}>
              <span>
                <span className={s.pagerKicker}>End of walkthrough</span>
                <span className={s.pagerTitle}>Back to Overview</span>
              </span>
              <Icon name="arrow-right" size={16} />
            </Link>
          )}
        </nav>
      </Container>
    </article>
  )
}
