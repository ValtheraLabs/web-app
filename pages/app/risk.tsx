import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function RiskPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Risk"
        title="Risk intelligence"
        description="A future workspace for wallet, token, and market risk signals."
      />
      <section className="grid">
        <article className="card"><h2>Wallet risk</h2><p>Wallet-level risk signals will appear here.</p></article>
        <article className="card"><h2>Token risk</h2><p>Token-level risk signals will appear here.</p></article>
        <article className="card"><h2>Market risk</h2><p>Market-level risk signals will appear here.</p></article>
      </section>
    </Layout>
  )
}
