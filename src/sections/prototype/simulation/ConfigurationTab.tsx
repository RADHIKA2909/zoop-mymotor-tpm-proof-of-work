import { useEffect, useState, type Dispatch } from 'react'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import {
  CONFIG_NOTE,
  CONFIG_SAVED_MESSAGE,
  NO_EDIT_NOTE,
  PRICING_LABEL,
  PRICING_PROVIDER,
  type PermissionLevel,
} from './_simData'
import type { SimAction, SimState } from './_simState'
import s from './ConfigurationTab.module.css'

interface Props {
  state: SimState
  dispatch: Dispatch<SimAction>
  perm: PermissionLevel
}

export function ConfigurationTab({ state, dispatch, perm }: Props) {
  const canEdit = perm === 'edit'
  const [draft, setDraft] = useState(String(state.pricing.providerA))
  const [saved, setSaved] = useState(false)

  // Keep the draft in sync if pricing changes elsewhere (e.g. Reset simulation).
  useEffect(() => setDraft(String(state.pricing.providerA)), [state.pricing.providerA])

  useEffect(() => {
    if (!saved) return
    const t = window.setTimeout(() => setSaved(false), 2500)
    return () => window.clearTimeout(t)
  }, [saved])

  const save = () => {
    const value = Number(draft)
    if (!Number.isFinite(value) || value <= 0) return
    dispatch({ type: 'UPDATE_PRICING', value })
    setSaved(true)
  }

  return (
    <div className={s.wrap}>
      <p className={s.title}>{PRICING_LABEL}</p>
      <div className={s.card}>
        <div className={s.row}>
          <span className={s.key}>Provider</span>
          <span className={s.val}>{PRICING_PROVIDER}</span>
        </div>
        <div className={s.row}>
          <span className={s.key}>Current price</span>
          <span className={s.val}>₹{state.pricing.providerA} / kWh</span>
        </div>

        {canEdit ? (
          <div className={s.editRow}>
            <label className={s.field}>
              <span className={s.fieldLabel}>New price (₹ / kWh)</span>
              <input
                className={s.input}
                type="number"
                min={1}
                step={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </label>
            <Button size="sm" onClick={save}>Save Configuration</Button>
          </div>
        ) : (
          <Callout kind="assumption" className={s.permNote}>
            {NO_EDIT_NOTE}
          </Callout>
        )}

        {saved && <p className={s.saved}>{CONFIG_SAVED_MESSAGE}</p>}
      </div>
      <p className={s.note}>{CONFIG_NOTE}</p>
    </div>
  )
}
