import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function WatchlistPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Watchlist"
        title="Watchlist workspace"
        description="A future workspace for saved assets and notes."
      />
      <section className="grid">
        <article className="card"><h2>Saved assets</h2><p>Saved assets will appear here.</p></article>
        <article className="card"><h2>Notes</h2><p>User notes will appear here.</p></article>
        <article className="card"><h2>Alerts</h2><p>User alerts will appear here.</p></article>
      </section>
    </Layout>
  )
}
