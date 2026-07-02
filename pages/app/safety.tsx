import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function SafetyPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Safety"
        title="Safety workspace"
        description="A future workspace for warnings and app safety notes."
      />
      <section className="card">
        <h2>Safety</h2>
        <p>Safety content will appear here.</p>
      </section>
    </Layout>
  )
}
