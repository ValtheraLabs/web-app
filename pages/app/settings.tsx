import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'

const settingsGroups = [
  { name: 'Network posture', value: 'Ethereum preview', detail: 'Display chain context without switching or prompting wallet actions.' },
  { name: 'Privacy mode', value: 'Local display', detail: 'No profile persistence or personal settings storage in this shell.' },
  { name: 'Interface density', value: 'Command center', detail: 'Dense panels, explicit badges, and operational copy remain enabled.' }
]

export default function SettingsPage() {
  return (
    <Layout>
      <SectionHeader
        eyebrow="Controls"
        title="Settings and operating posture"
        description="Interface, privacy, and network controls for a preview-safe institutional command center."
        actions={
          <>
            <StatusBadge label="Local shell" tone="info" />
            <StatusBadge label="No wallet writes" tone="success" />
          </>
        }
      />

      <section className="panel-grid">
        <MetricCard
          label="Signing controls"
          value="Disabled"
          detail="Settings expose no wallet signing, transaction submission, or simulation controls."
          trend={<StatusBadge label="Preview safe" tone="success" />}
        />
        <MetricCard
          label="Persisted profile"
          value="None"
          detail="This MVP shell avoids account preferences until storage policy is explicit."
          trend={<StatusBadge label="Privacy first" tone="info" />}
        />

        <Panel
          eyebrow="Operating posture"
          title="Control groups"
          description="Settings are descriptive now, with each future control scoped before it becomes interactive."
          className="panel-wide"
        >
          <div className="asset-list">
            {settingsGroups.map((group) => (
              <div className="asset-row" key={group.name}>
                <span>
                  {group.name}
                  <br />
                  {group.detail}
                </span>
                <strong>{group.value}</strong>
              </div>
            ))}
          </div>
        </Panel>

        <Panel
          eyebrow="Persistence"
          title="Preferences storage"
          description="User preferences need explicit schema and migration rules before browser storage is introduced."
        >
          <DataState
            status="unavailable"
            title="Saved preferences unavailable"
            description="No localStorage, database profile, or wallet-bound preferences are written by this page."
          />
        </Panel>
      </section>
    </Layout>
  )
}
