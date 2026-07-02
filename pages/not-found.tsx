import { Layout } from '@/components/Layout'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="card">
        <div className="eyebrow">Not found</div>
        <h1>Page not found</h1>
        <p>The requested Valthera page does not exist yet.</p>
        <div className="button-row">
          <Link className="button" href="/app">Back to app</Link>
        </div>
      </section>
    </Layout>
  )
}
