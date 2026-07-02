import { FeatureCard } from '@/components/FeatureCard'
import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function DashboardPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Dashboard"
        title="Command center"
        description="The Valthera dashboard will unify portfolio value, market context, risk alerts, and AI recommendations."
      />
      <section className="panel-grid">
        <FeatureCard title="Portfolio Value" metric="$0.00" description="Wallet connection and live balances arrive in MVP-002." />
        <FeatureCard title="Risk Score" metric="--" description="Risk scoring will be powered by backend and AI engine outputs." />
        <FeatureCard title="Market Pulse" description="Market scanner and trending token modules will connect here." />
        <FeatureCard title="AI Briefing" description="Daily wallet and market summaries will appear in this panel." />
      </section>
    </Layout>
  )
}
