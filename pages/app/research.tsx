import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'

const researchFeeds = [
  { name: 'Market structure', state: 'planned', detail: 'Liquidity depth, venue coverage, and spread context.' },
  { name: 'Token fundamentals', state: 'planned', detail: 'Issuer, supply, contract, and governance metadata.' },
  { name: 'Narrative watch', state: 'manual', detail: 'Analyst notes and catalyst tracking before API activation.' }
]

export default function ResearchPage() {
  return (
    <Layout>
      <SectionHeader
        eyebrow="Market research"
        title="Research intelligence desk"
        description="Read-only workspace for token dossiers, market context, and data-source readiness before execution review."
        actions={
          <>
            <StatusBadge label="Preview shell" tone="warning" />
            <StatusBadge label="No execution" tone="danger" />
          </>
        }
      />

      <section className="panel-grid">
        <MetricCard
          label="Coverage universe"
          value="3 feeds"
          detail="Market structure, fundamentals, and narrative monitoring are staged for backend wiring."
          trend={<StatusBadge label="Source map" tone="info" />}
        />
        <MetricCard
          label="Execution access"
          value="0 paths"
          detail="Research output cannot build, sign, submit, or simulate transactions."
          trend={<StatusBadge label="Observation only" tone="success" />}
        />

        <Panel
          eyebrow="Research queue"
          title="Data-source readiness"
          description="Feeds are explicit so empty states remain actionable instead of generic placeholder copy."
          className="panel-wide"
        >
          <div className="asset-list">
            {researchFeeds.map((feed) => (
              <div className="asset-row" key={feed.name}>
                <span>
                  {feed.name}
                  <br />
                  {feed.detail}
                </span>
                <strong>{feed.state}</strong>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="Analyst controls"
          title="Dossier guardrails"
          description="Research pages stay informational until backend evidence feeds are available."
        >
          <DataState
            status="unavailable"
            title="Live token dossier unavailable"
            description="Connect curated market, contract, and issuer data before showing token-specific ratings."
          />
        </Panel>
      </section>
    </Layout>
  )
}
