import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { AUTHOR, CASE_STUDY, DISCLAIMER, SOURCES } from '@/data/company'
import { LogoLockup } from './LogoLockup'
import { SectionProgress } from './SectionProgress'
import s from './Footer.module.css'

export function Footer() {
  return (
    <footer className={s.footer}>
      <Container size="wide">
        <div className={s.top}>
          <div className={s.brandCol}>
            <LogoLockup size="sm" />
            <p className={s.tagline}>{CASE_STUDY.thesis}</p>
            <SectionProgress variant="inline" className={s.progress} />
          </div>

          <div className={s.linkCol}>
            <h3 className={s.colTitle}>Public sources</h3>
            <ul className={s.linkList}>
              {SOURCES.map((source) => (
                <li key={source.id}>
                  <a href={source.url} target="_blank" rel="noreferrer noopener">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={s.linkCol}>
            <h3 className={s.colTitle}>Prepared by</h3>
            <p className={s.author}>{AUTHOR.name}</p>
            <p className={s.authorMeta}>For: {AUTHOR.forRole}</p>
            <p className={s.authorMeta}>{AUTHOR.context}</p>
            <Link to="/styleguide" className={s.styleguideLink}>
              Design system reference
            </Link>
          </div>
        </div>

        <p className={s.disclaimer}>{DISCLAIMER}</p>
      </Container>
    </footer>
  )
}
