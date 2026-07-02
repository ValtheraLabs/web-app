import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function ActivityPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Activity"
        title="Activity workspace"
        description="A future workspace for wallet events and app history."
      />
      <section className="card">
        <h2>Activity feed</h2>
        <p>Wallet and app activity will appear here.</p>
      </section>
    </Layout>
  )
}
