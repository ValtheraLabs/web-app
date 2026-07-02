import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { SwapTerminal } from '@/components/swap/SwapTerminal'

export default function SwapPage() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Exchange"
        title="Asset terminal"
        description="Preview swap intent, route context, wallet state, and risk guidance before real quote or execution wiring exists."
      />
      <SwapTerminal />
    </Layout>
  )
}
