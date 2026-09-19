import type { Dispatch } from 'react'
import { Tabs, type TabItem } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ARCHITECTURE_LINK_LABEL, CT_TABS, permissionFor } from './_simData'
import type { SimAction, SimState } from './_simState'
import { OverviewTab } from './OverviewTab'
import { TransactionsTab } from './TransactionsTab'
import { VendorsTab } from './VendorsTab'
import { IncidentsTab } from './IncidentsTab'
import { ConfigurationTab } from './ConfigurationTab'
import s from './ControlTowerPanel.module.css'

interface Props {
  state: SimState
  dispatch: Dispatch<SimAction>
}

export function ControlTowerPanel({ state, dispatch }: Props) {
  const visible = CT_TABS.filter((t) => permissionFor(state.role, t.id) !== 'hidden')
  const activeId = visible.some((t) => t.id === state.ctTab) ? state.ctTab : visible[0].id

  const items: TabItem[] = visible.map((t) => {
    const perm = permissionFor(state.role, t.id)
    return {
      id: t.id,
      label: (
        <span className={s.tabLabel}>
          <Icon name={t.icon} size={14} />
          {t.label}
        </span>
      ),
      content: (() => {
        switch (t.id) {
          case 'overview':
            return <OverviewTab />
          case 'transactions':
            return <TransactionsTab state={state} />
          case 'vendors':
            return <VendorsTab />
          case 'incidents':
            return <IncidentsTab state={state} dispatch={dispatch} perm={perm} />
          case 'configuration':
            return <ConfigurationTab state={state} dispatch={dispatch} perm={perm} />
          default:
            return null
        }
      })(),
    }
  })

  return (
    <div className={s.panel}>
      <Tabs
        items={items}
        activeId={activeId}
        onChange={(id) => dispatch({ type: 'SELECT_CT_TAB', tab: id as SimState['ctTab'] })}
        variant="pill"
      />
      <Button
        variant="link"
        size="sm"
        iconRight="arrow-right"
        to="/control-tower-deep-dive#architecture"
        className={s.archLink}
      >
        {ARCHITECTURE_LINK_LABEL}
      </Button>
    </div>
  )
}
