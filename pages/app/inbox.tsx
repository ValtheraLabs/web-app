import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function InboxPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Inbox"
        title="Inbox workspace"
        description="A future workspace for product messages and system notes."
      />
      <section className="card">
        <h2>Inbox</h2>
        <p>Messages will appear here.</p>
      </section>
    </Layout>
  )
}
