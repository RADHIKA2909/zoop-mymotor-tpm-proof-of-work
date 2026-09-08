import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { Icon } from '@/components/ui/Icon'
import { CASE_STUDY_RECAP } from './_data'
import s from './CaseStudySummary.module.css'

export function CaseStudySummary() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>The complete story</Eyebrow>
        <h2 className={s.title}>From public evidence to product action</h2>

        <ScrollReveal className={s.flow}>
          {CASE_STUDY_RECAP.map((step, i) => (
            <div className={s.step} key={step.num}>
              <Link to={step.path} className={s.card}>
                <span className={s.num}>{step.num}</span>
                <span className={s.verb}>{step.verb}</span>
                <span className={s.label}>{step.label}</span>
              </Link>
              {i < CASE_STUDY_RECAP.length - 1 && (
                <Icon name="chevron-down" size={16} className={s.arrow} aria-hidden="true" />
              )}
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  )
}
