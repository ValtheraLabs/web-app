import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { WalletStatusCard } from '@/components/wallet/WalletStatusCard'

export default function WalletPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Wallet"
        title="Wallet connection"
        description="Connect a wallet and inspect basic address, connector, and network state."
      />
      <section className="panel-grid">
        <WalletStatusCard />
        <article className="card">
          <div className="eyebrow">Scope</div>
          <h2>MVP-002</h2>
          <p>This milestone adds connection UX only. Asset balances, transaction preparation, and portfolio data come later.</p>
        </article>
      </section>
    </Layout>
  )
}
