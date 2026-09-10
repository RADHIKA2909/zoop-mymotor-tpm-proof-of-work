import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Icon } from '@/components/ui/Icon'
import { TPM_HEADER } from './_data'
import s from './FeedbackTpmLens.module.css'

export function FeedbackTpmLens() {
  return (
    <section className={s.section}>
      <Container size="wide">
        <Eyebrow>{TPM_HEADER.eyebrow}</Eyebrow>
        <h2 className={s.title}>{TPM_HEADER.title}</h2>

        <div className={s.shift}>
          <div className={s.shiftCol}>
            <span className={s.shiftLabel}>Before</span>
            <p className={s.shiftText}>{TPM_HEADER.before}</p>
          </div>
          <Icon name="arrow-right" size={20} className={s.shiftArrow} />
          <div className={s.shiftCol} data-after>
            <span className={s.shiftLabel}>After</span>
            <p className={s.shiftText}>{TPM_HEADER.after}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
