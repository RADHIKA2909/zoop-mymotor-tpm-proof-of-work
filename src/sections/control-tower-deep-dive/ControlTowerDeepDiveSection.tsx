import { DeepDiveHero } from './DeepDiveHero'
import { TransactionFlow } from './TransactionFlow'
import { FailureModes } from './FailureModes'
import { OperationalMetrics } from './OperationalMetrics'
import { OperatingLoop } from './OperatingLoop'
import { ArchitectureReveal } from './ArchitectureReveal'
import { DeepDiveTransition } from './DeepDiveTransition'

/**
 * Section 06 — "Behind the Control Tower" (CTO deep-dive branch only, not on
 * `main`). Extends Section 05's proposed Control Tower with the transaction-
 * reliability operating model behind it: the multi-system flow behind one
 * transaction, illustrative failure modes, the metrics that would show system
 * health, the detect -> diagnose -> act -> verify -> learn loop, and an
 * expandable illustrative architecture view. Everything here is proposed /
 * illustrative — see `_data.ts` header and CLAUDE.md §22.
 */
export function ControlTowerDeepDiveSection() {
  return (
    <article>
      <DeepDiveHero />
      <TransactionFlow />
      <FailureModes />
      <OperationalMetrics />
      <OperatingLoop />
      <ArchitectureReveal />
      <DeepDiveTransition />
    </article>
  )
}
