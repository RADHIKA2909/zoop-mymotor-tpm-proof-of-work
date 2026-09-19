import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Pill } from '@/components/ui/Pill'
import { Icon } from '@/components/ui/Icon'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { FAILURE_HEADER, FAILURE_LABEL, FAILURE_MODES } from './_data'
import s from './FailureModes.module.css'

export function FailureModes() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <div className={s.head}>
          <div>
            <Eyebrow>{FAILURE_HEADER.eyebrow}</Eyebrow>
            <h2 className={s.title}>{FAILURE_HEADER.title}</h2>
            <p className={s.lead}>{FAILURE_HEADER.lead}</p>
          </div>
          <Pill tone="proposed" variant="outline" caps size="sm">
            {FAILURE_LABEL}
          </Pill>
        </div>

        <ScrollReveal className={s.grid}>
          {FAILURE_MODES.map((f) => (
            <div className={s.card} key={f.title}>
              <span className={s.icon} aria-hidden="true">
                <Icon name={f.icon} size={18} />
              </span>
              <h3 className={s.cardTitle}>{f.title}</h3>
              <dl className={s.rows}>
                <div className={s.row}>
                  <dt>Detection</dt>
                  <dd>{f.detection}</dd>
                </div>
                <div className={s.row}>
                  <dt>Customer impact</dt>
                  <dd>{f.impact}</dd>
                </div>
                <div className={s.row}>
                  <dt>Operational response</dt>
                  <dd>{f.response}</dd>
                </div>
              </dl>
            </div>
          ))}
        </ScrollReveal>
      </Container>
    </section>
  )
}
