import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

export default function ProfilePage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Profile"
        title="User profile"
        description="A future workspace for account preferences and app profile context."
      />
      <section className="card">
        <h2>Profile</h2>
        <p>User profile content will appear here.</p>
      </section>
    </Layout>
  )
}
