import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function SandboxPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Sandbox"
        title="Valthera sandbox"
        description="A future workspace for prototypes."
      />
      <section className="card">
        <h2>Prototype area</h2>
        <p>Prototype modules will appear here.</p>
      </section>
    </Layout>
  )
}
