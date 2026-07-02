import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function AboutPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="About"
        title="About Valthera"
        description="Valthera is an AI-native DeFi product built by ValtheraLabs."
      />
      <section className="card">
        <h2>Genesis phase</h2>
        <p>This application is in the first MVP foundation phase.</p>
      </section>
    </Layout>
  )
}
