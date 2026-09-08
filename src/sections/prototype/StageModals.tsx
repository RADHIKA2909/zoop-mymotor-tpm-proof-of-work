import { useState, type Dispatch } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Callout } from '@/components/ui/Callout'
import { CUSTOMER_STATUS_OPTIONS, SCENARIOS } from './_data'
import type { PrototypeAction, PrototypeState } from './_state'
import s from './StageModals.module.css'

interface Props {
  state: PrototypeState
  dispatch: Dispatch<PrototypeAction>
}

export function StageModals({ state, dispatch }: Props) {
  const sc = SCENARIOS[state.scenario]
  const close = () => dispatch({ type: 'CLOSE_MODAL' })

  return (
    <>
      {/* ---- Contact provider ---- */}
      <Modal
        open={state.modal === 'provider'}
        onClose={close}
        title="Contact provider"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button iconRight="arrow-right" onClick={() => dispatch({ type: 'CONTACT_PROVIDER' })}>
              Send request
            </Button>
          </>
        }
      >
        <dl className={s.defs}>
          <div><dt>Issue</dt><dd>{sc.incident.issue}</dd></div>
          <div><dt>Transaction</dt><dd>{sc.customerImpact.txnId}</dd></div>
          <div><dt>Current state</dt><dd>{sc.customerImpact.state}</dd></div>
          <div><dt>Dependency</dt><dd>{sc.overview.dependency}</dd></div>
        </dl>
        <label className={s.fieldLabel} htmlFor="provider-msg">Message</label>
        <textarea
          id="provider-msg"
          className={s.textarea}
          readOnly
          rows={3}
          value="Please confirm the current transaction state and settlement status for the transaction above."
        />
        <Callout kind="assumption" className={s.modalNote}>
          Simulated — no request is actually sent.
        </Callout>
      </Modal>

      {/* ---- Escalate ---- */}
      <Modal
        open={state.modal === 'escalate'}
        onClose={close}
        title="Escalate incident"
        footer={
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button iconRight="arrow-up-right" onClick={() => dispatch({ type: 'ESCALATE' })}>
              Escalate incident
            </Button>
          </>
        }
      >
        <dl className={s.defs}>
          <div><dt>Escalation reason</dt><dd>SLA at risk</dd></div>
          <div><dt>Customer impact</dt><dd>{sc.incident.customers}</dd></div>
          <div><dt>Current age</dt><dd>{sc.incident.age}</dd></div>
          <div><dt>Escalate to</dt><dd>{sc.overview.owner} Lead</dd></div>
        </dl>
        <Callout kind="proposed" className={s.modalNote}>
          Proposed escalation workflow — escalation priority follows time elapsed + customer impact + issue severity.
        </Callout>
      </Modal>

      {/* ---- Update customer status ---- */}
      <CustomerStatusModal state={state} dispatch={dispatch} onClose={close} />
    </>
  )
}

function CustomerStatusModal({
  state,
  dispatch,
  onClose,
}: Props & { onClose: () => void }) {
  const [value, setValue] = useState(CUSTOMER_STATUS_OPTIONS[0].value)
  const preview =
    CUSTOMER_STATUS_OPTIONS.find((o) => o.value === value)?.message ?? ''

  return (
    <Modal
      open={state.modal === 'customer'}
      onClose={onClose}
      title="Update customer status"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            iconRight="arrow-right"
            onClick={() => dispatch({ type: 'UPDATE_CUSTOMER_STATUS', value })}
          >
            Apply update
          </Button>
        </>
      }
    >
      <label className={s.fieldLabel} htmlFor="cust-status">Status</label>
      <select
        id="cust-status"
        className={s.select}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {CUSTOMER_STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.value}
          </option>
        ))}
      </select>
      <p className={s.previewLabel}>Customer-facing message preview</p>
      <blockquote className={s.preview}>{preview}</blockquote>
      <Callout kind="proposed" className={s.modalNote}>
        Demonstrates operational action paired with customer communication.
      </Callout>
    </Modal>
  )
}
