import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function InsightsPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Insights"
        title="Valthera insights"
        description="A future workspace for portfolio, research, and market summaries."
      />
      <section className="grid">
        <article className="card"><h2>Portfolio</h2><p>Portfolio summaries will appear here.</p></article>
        <article className="card"><h2>Research</h2><p>Research summaries will appear here.</p></article>
        <article className="card"><h2>Markets</h2><p>Market summaries will appear here.</p></article>
      </section>
    </Layout>
  )
}
