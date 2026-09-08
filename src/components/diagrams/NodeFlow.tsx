import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Icon, type IconName } from '@/components/ui/Icon'
import s from './NodeFlow.module.css'

export interface FlowNode {
  id: string
  label: ReactNode
  sublabel?: ReactNode
  icon?: IconName
  tone?: 'default' | 'brand' | 'muted' | 'alert'
}

interface NodeFlowProps {
  nodes: FlowNode[]
  /** Row (horizontal, arrows between) or column (vertical). */
  direction?: 'row' | 'column'
  /** Connector style. */
  connector?: 'arrow' | 'line' | 'dashed'
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Simple linear node → node → node flow. For richer branded diagrams (the
 * ecosystem map) build a bespoke component per section; this covers the common
 * linear case (journey stages, request path, incident flow).
 */
export function NodeFlow({
  nodes,
  direction = 'row',
  connector = 'arrow',
  tone = 'light',
  className,
}: NodeFlowProps) {
  return (
    <div
      className={cn(s.flow, s[direction], s[tone], className)}
      data-theme={tone === 'dark' ? 'dark' : undefined}
    >
      {nodes.map((node, i) => (
        <div className={s.segment} key={node.id}>
          <div className={cn(s.node, s[`tone-${node.tone ?? 'default'}`])}>
            {node.icon && (
              <span className={s.icon} aria-hidden="true">
                <Icon name={node.icon} size={18} />
              </span>
            )}
            <span className={s.label}>{node.label}</span>
            {node.sublabel && <span className={s.sublabel}>{node.sublabel}</span>}
          </div>
          {i < nodes.length - 1 && (
            <span
              className={cn(s.connector, s[`connector-${connector}`])}
              aria-hidden="true"
            >
              {connector === 'arrow' && <Icon name="arrow-right" size={16} />}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
