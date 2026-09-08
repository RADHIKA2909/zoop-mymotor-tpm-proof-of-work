import { cn } from '@/lib/cn'
import { DiagramFrame } from '@/components/ui/DiagramFrame'
import { Icon } from '@/components/ui/Icon'
import { ECO_CAPTION, ECO_NODES, ECOSYSTEM_HEADER, type EcoNode } from './_data'
import s from './EcosystemDiagram.module.css'

function NodeBody({ node }: { node: EcoNode }) {
  return (
    <div className={cn(s.node, s[`node-${node.kind}`])}>
      <span className={s.nodeIcon} aria-hidden="true">
        <Icon name={node.icon} size={node.kind === 'app' ? 22 : 18} />
      </span>
      <p className={s.nodeLabel}>{node.label}</p>

      {node.sublabel && <p className={s.nodeSub}>{node.sublabel}</p>}

      {node.steps && (
        <div className={s.steps}>
          {node.steps.map((step, i) => (
            <span className={s.step} key={step}>
              {step}
              {i < node.steps!.length - 1 && (
                <span className={s.stepArrow} aria-hidden="true">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
      )}

      {node.providers && (
        <div className={s.providers}>
          {node.providers.map((p) => (
            <span className={s.provider} key={p}>
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function EcosystemDiagram() {
  return (
    <DiagramFrame
      tone="dark"
      disclaimer={ECOSYSTEM_HEADER.disclaimer}
      caption={ECO_CAPTION}
    >
      <div className={s.flow}>
        {ECO_NODES.map((node, i) => (
          <div className={s.segment} key={node.id}>
            <NodeBody node={node} />
            {i < ECO_NODES.length - 1 && (
              <span className={s.connector} aria-hidden="true">
                <Icon name="arrow-right" size={16} />
              </span>
            )}
          </div>
        ))}
      </div>
    </DiagramFrame>
  )
}
