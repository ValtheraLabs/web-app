import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { SwapTerminal } from '@/components/swap/SwapTerminal'

export default function SwapPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Preview terminal"
        title="Swap command center"
        description="Preview only. No transaction is built, signed, submitted, or simulated."
      />
      <SwapTerminal />
    </Layout>
  )
}
