import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'

const activityRows = [
  { event: 'Portfolio snapshot requested', status: 'display', detail: 'Read-only backend portfolio request lifecycle.' },
  { event: 'AI analysis requested', status: 'display', detail: 'Summary and recommendation fetch without automated action.' },
  { event: 'Swap preview opened', status: 'preview', detail: 'Quote review only; no transaction construction.' }
]

export default function ActivityPage() {
  return (
    <Layout>
      <SectionHeader
        eyebrow="Timeline"
        title="Activity operations log"
        description="Preview activity, backend request history, and wallet event placeholders in one audit-oriented shell."
        actions={
          <>
            <StatusBadge label="Audit shell" tone="info" />
            <StatusBadge label="No writes" tone="success" />
          </>
        }
      />

      <section className="panel-grid">
        <MetricCard
          label="Tracked event types"
          value={String(activityRows.length)}
          detail="Portfolio, AI, and swap preview events are modeled for future request logging."
          trend={<StatusBadge label="Read model" tone="info" />}
        />
        <MetricCard
          label="Mutable operations"
          value="0"
          detail="Activity view cannot alter wallet, portfolio, or swap state."
          trend={<StatusBadge label="Display only" tone="success" />}
        />

        <Panel
          eyebrow="Event model"
          title="Command-center activity lanes"
          description="Concrete lanes show which frontend events should become auditable when backend logging exists."
          className="panel-wide"
        >
          <div className="asset-list">
            {activityRows.map((row) => (
              <div className="asset-row" key={row.event}>
                <span>
                  {row.event}
                  <br />
                  {row.detail}
                </span>
                <strong>{row.status}</strong>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="Wallet events"
          title="Connected-wallet timeline"
          description="Wallet event ingestion is intentionally unavailable until safe read-only indexing is defined."
        >
          <DataState
            status="empty"
            title="No wallet events loaded"
            description="Connect a read-only event index before showing transfers, approvals, or protocol actions."
          />
        </Panel>
      </section>
    </Layout>
  )
}
