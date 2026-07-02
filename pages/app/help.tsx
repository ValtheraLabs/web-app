import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function HelpPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Help"
        title="Help center"
        description="A future workspace for docs, FAQs, and product guidance."
      />
      <section className="card">
        <h2>Coming soon</h2>
        <p>Help content will be added as the product grows.</p>
      </section>
    </Layout>
  )
}
