import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { primaryAppRoutes } from '@/lib/routes'

const legacyCanonicalRoutes = primaryAppRoutes.filter((route) => route.href !== '/app')

export default function AppSectionPage() {
  return (
    <Layout>
      <SectionHeader
        eyebrow="Unsupported route"
        title="Command section not found"
        description="This fallback no longer hosts portfolio or AI implementations. Use canonical command-center routes below."
        actions={<StatusBadge label="Safe fallback" tone="warning" />}
      />

      <section className="panel-grid">
        <DataState
          status="unavailable"
          title="Legacy dynamic route disabled"
          description="Portfolio and AI now live at canonical static Pages Router routes to avoid duplicate backend implementations."
        />

        <Panel
          eyebrow="Canonical routes"
          title="Available command sections"
          description="Navigate through the command shell or open one of these supported routes."
        >
          <div className="asset-list">
            {legacyCanonicalRoutes.map((route) => (
              <div className="asset-row" key={route.href}>
                <span>{route.label}</span>
                <strong>{route.href}</strong>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </Layout>
  )
}
