import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'

const riskControls = [
  { label: 'Wallet concentration', state: 'monitor', detail: 'Flag outsized exposure by token, chain, and sector.' },
  { label: 'Route safety', state: 'preview', detail: 'Surface provider warnings without simulating or preparing transactions.' },
  { label: 'Data freshness', state: 'manual', detail: 'Track stale portfolio, quote, and AI analysis responses.' }
]

export default function RiskPage() {
  return (
    <Layout>
      <SectionHeader
        eyebrow="Safety desk"
        title="Risk command center"
        description="Exposure controls, execution safeguards, and freshness checks for preview-only portfolio operations."
        actions={
          <>
            <StatusBadge label="Safeguards active" tone="success" />
            <StatusBadge label="Preview only" tone="warning" />
          </>
        }
      />

      <section className="panel-grid">
        <MetricCard
          label="Execution mode"
          value="Locked"
          detail="No transaction is built, signed, submitted, or simulated from risk review."
          trend={<StatusBadge label="Read only" tone="danger" />}
        />
        <MetricCard
          label="Risk controls"
          value={String(riskControls.length)}
          detail="Command-center controls staged for portfolio, route, and data freshness review."
          trend={<StatusBadge label="Control plane" tone="info" />}
        />

        <Panel
          eyebrow="Control register"
          title="Operational safeguards"
          description="Risk output explains what to inspect before any future execution workflow exists."
          className="panel-wide"
        >
          <div className="asset-list">
            {riskControls.map((control) => (
              <div className="asset-row" key={control.label}>
                <span>
                  {control.label}
                  <br />
                  {control.detail}
                </span>
                <strong>{control.state}</strong>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="Risk data"
          title="Signal availability"
          description="Backend risk scoring can be attached here after portfolio and quote feeds expose stable fields."
        >
          <DataState
            status="unavailable"
            title="Automated risk score unavailable"
            description="Current shell provides guardrails and review categories without producing trade decisions."
          />
        </Panel>
      </section>
    </Layout>
  )
}
