import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function AssetsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Assets"
        title="Asset workspace"
        description="A future workspace for asset balances, token metadata, and asset context."
      />
      <section className="grid">
        <article className="card"><h2>Balances</h2><p>Connected wallet balances will appear here.</p></article>
        <article className="card"><h2>Metadata</h2><p>Token metadata will appear here.</p></article>
        <article className="card"><h2>Context</h2><p>Asset context will appear here.</p></article>
      </section>
    </Layout>
  )
}
