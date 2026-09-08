import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Callout } from '@/components/ui/Callout'
import { StatusDot } from '@/components/ui/StatusDot'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { IMPACT_ROWS } from './_data'
import s from './CustomerImpact.module.css'

export function CustomerImpact() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>Customer impact</Eyebrow>
        <h2 className={s.title}>Not every incident is equally important.</h2>
        <p className={s.lead}>
          Prioritisation should follow who is affected and how badly — not just when the
          issue was raised.
        </p>

        <ScrollReveal className={s.grid}>
          {IMPACT_ROWS.map((row) => (
            <div className={s.card} key={row.issue}>
              <div className={s.cardHead}>
                <span className={s.issue}>{row.issue}</span>
                <span className={s.stage}>{row.stage}</span>
              </div>
              <dl className={s.metrics}>
                <div><dt>Customers</dt><dd>{row.customers}</dd></div>
                <div><dt>Transactions</dt><dd>{row.transactions}</dd></div>
                <div><dt>Estimated delay</dt><dd>{row.delay}</dd></div>
              </dl>
              <StatusDot tone={row.statusTone} label={row.status} />
            </div>
          ))}
        </ScrollReveal>

        <Callout kind="assumption" className={s.note}>
          Illustrative customer impact data — used to demonstrate impact-based prioritisation.
        </Callout>
      </Container>
    </section>
  )
}
