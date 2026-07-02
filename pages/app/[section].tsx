import { useRouter } from 'next/router'
import { FeatureCard } from '@/components/FeatureCard'
import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'

const sections: Record<string, { eyebrow: string; title: string; description: string; cards: Array<{ title: string; description: string }> }> = {
  swap: {
    eyebrow: 'Exchange',
    title: 'Asset terminal',
    description: 'A placeholder screen for asset selection, quote context, and Valthera AI guidance.',
    cards: [
      { title: 'Asset controls', description: 'Input and output controls will be added after wallet setup.' },
      { title: 'Route context', description: 'Route, fee, and market context will appear here.' },
      { title: 'AI notes', description: 'Valthera AI will summarize useful context for the user.' }
    ]
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Wallet intelligence',
    description: 'A placeholder screen for balances, allocation, exposure, and health signals.',
    cards: [
      { title: 'Allocation', description: 'Portfolio allocation visualization will be connected to backend data.' },
      { title: 'Exposure', description: 'Risk and concentration signals will be shown here.' },
      { title: 'History', description: 'Wallet activity and performance summaries will be added later.' }
    ]
  },
  research: {
    eyebrow: 'Research',
    title: 'Token research',
    description: 'A placeholder screen for token, liquidity, holder, and contract context.',
    cards: [
      { title: 'Token profile', description: 'Core token metadata and market data will appear here.' },
      { title: 'Liquidity view', description: 'Liquidity and volatility context will be added in future tasks.' },
      { title: 'Risk factors', description: 'Structured warnings and uncertainty notes will appear here.' }
    ]
  },
  ai: {
    eyebrow: 'AI',
    title: 'Valthera copilot',
    description: 'A placeholder screen for portfolio analysis, market summaries, and research prompts.',
    cards: [
      { title: 'Portfolio agent', description: 'Summarizes allocation, exposure, and wallet health.' },
      { title: 'Research agent', description: 'Summarizes token and market context.' },
      { title: 'Risk agent', description: 'Explains possible risk factors and uncertainty.' }
    ]
  },
  settings: {
    eyebrow: 'Settings',
    title: 'User preferences',
    description: 'A placeholder screen for network, interface, and privacy preferences.',
    cards: [
      { title: 'Networks', description: 'Preferred chains and environments will be configured here.' },
      { title: 'Interface', description: 'Display and terminal preferences will be configured here.' },
      { title: 'Privacy', description: 'User-side privacy settings will be configured here.' }
    ]
  }
}

export default function AppSectionPage() {
  const router = useRouter()
  const sectionKey = String(router.query.section || 'ai')
  const section = sections[sectionKey] || sections.ai

  return (
    <Layout>
      <PageHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
      <section className="grid">
        {section.cards.map((card) => (
          <FeatureCard key={card.title} title={card.title} description={card.description} />
        ))}
      </section>
    </Layout>
  )
}
