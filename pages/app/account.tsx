import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function AccountPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Account"
        title="Account workspace"
        description="A future workspace for user account controls."
      />
      <section className="card">
        <h2>Account</h2>
        <p>Account content will appear here.</p>
      </section>
    </Layout>
  )
}
