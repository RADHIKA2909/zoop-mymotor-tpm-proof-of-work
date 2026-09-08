import { Eyebrow } from '@/components/ui/Eyebrow'
import { NodeFlow } from '@/components/diagrams/NodeFlow'
import { TPM_LENS } from './_data'
import s from './TpmLens.module.css'

export function TpmLens() {
  return (
    <div className={s.wrap}>
      <Eyebrow tone="inverse">{TPM_LENS.eyebrow}</Eyebrow>
      <h3 className={s.title}>{TPM_LENS.title}</h3>
      <p className={s.body}>{TPM_LENS.body}</p>

      <div className={s.flow}>
        <NodeFlow
          tone="dark"
          connector="arrow"
          nodes={TPM_LENS.steps.map((step, i) => ({
            id: String(i),
            label: step,
            tone: i === TPM_LENS.steps.length - 1 ? 'brand' : 'default',
          }))}
        />
      </div>
    </div>
  )
}
