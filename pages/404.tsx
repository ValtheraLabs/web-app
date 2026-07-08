import Link from 'next/link'

import { Layout } from '@/components/Layout'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'

export default function Custom404Page() {
  return (
    <Layout>
      <SectionHeader
        eyebrow="Route missing"
        title="Command section not found"
        description="This Pages Router route is not part of the Valthera command-center map."
        actions={<StatusBadge label="404" tone="warning" />}
      />

      <Panel
        eyebrow="Navigation recovery"
        title="Return to canonical command center"
        description="Use supported routes from the shell navigation. Alias routes are not part of the canonical map."
      >
        <div className="button-row">
          <Link className="button" href="/app">
            Open overview
          </Link>
          <Link className="button secondary" href="/app/research">
            Open research
          </Link>
        </div>
      </Panel>
    </Layout>
  )
}
