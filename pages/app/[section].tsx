import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { FeatureCard } from '@/components/FeatureCard'
import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { analyzePortfolio, analyzeToken, getPortfolio } from '@/lib/api'

const DEMO_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'
const DEMO_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'

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
  const isPortfolio = sectionKey === 'portfolio'
  const isResearch = sectionKey === 'research'
  const isAi = sectionKey === 'ai'
  const usesPortfolio = isPortfolio || isAi
  const usesToken = isResearch || isAi

  const portfolioQuery = useQuery({
    queryKey: ['portfolio', DEMO_WALLET_ADDRESS],
    queryFn: () => getPortfolio(DEMO_WALLET_ADDRESS),
    enabled: usesPortfolio
  })

  const portfolioAnalysisQuery = useQuery({
    queryKey: ['portfolio-analysis', DEMO_WALLET_ADDRESS],
    queryFn: () => analyzePortfolio(DEMO_WALLET_ADDRESS),
    enabled: usesPortfolio
  })

  const tokenAnalysisQuery = useQuery({
    queryKey: ['token-analysis', 'VAL'],
    queryFn: () => analyzeToken('VAL', DEMO_TOKEN_ADDRESS),
    enabled: usesToken
  })

  return (
    <Layout>
      <PageHeader eyebrow={section.eyebrow} title={section.title} description={section.description} />
      {usesPortfolio || usesToken ? (
        <section className="panel-grid">
          {usesPortfolio ? (
            <article className="card">
              <p className="eyebrow">Backend portfolio</p>
              <h2>{portfolioQuery.data ? `$${portfolioQuery.data.total_value_usd.toLocaleString()}` : 'Loading portfolio'}</h2>
              <p>
                {portfolioQuery.data
                  ? `${portfolioQuery.data.assets.length} mock assets from backend-api. Source is marked ${
                      portfolioQuery.data.is_mock ? 'mock' : 'live'
                    }.`
                  : portfolioQuery.isError
                    ? 'Backend portfolio request failed.'
                    : 'Requesting portfolio data from backend-api.'}
              </p>
            </article>
          ) : null}
          {usesPortfolio ? (
            <article className="card">
              <p className="eyebrow">AI portfolio gateway</p>
              <h2>
                {portfolioAnalysisQuery.data?.risk_score !== null && portfolioAnalysisQuery.data?.risk_score !== undefined
                  ? `Risk ${portfolioAnalysisQuery.data.risk_score}`
                  : 'Loading analysis'}
              </h2>
              <p>
                {portfolioAnalysisQuery.data
                  ? `${portfolioAnalysisQuery.data.overall_summary} Source: ${portfolioAnalysisQuery.data.source}.`
                  : portfolioAnalysisQuery.isError
                    ? 'Backend AI analysis request failed.'
                    : 'Requesting backend-api analysis through the AI gateway.'}
              </p>
            </article>
          ) : null}
          {usesToken ? (
            <article className="card">
              <p className="eyebrow">AI token gateway</p>
              <h2>{tokenAnalysisQuery.data ? `${tokenAnalysisQuery.data.symbol} ${tokenAnalysisQuery.data.risk_level}` : 'Loading token'}</h2>
              <p>
                {tokenAnalysisQuery.data
                  ? `${tokenAnalysisQuery.data.summary} Source: ${tokenAnalysisQuery.data.source}.`
                  : tokenAnalysisQuery.isError
                    ? 'Backend token analysis request failed.'
                    : 'Requesting token analysis from backend-api.'}
              </p>
            </article>
          ) : null}
        </section>
      ) : null}
      <section className="grid">
        {section.cards.map((card) => (
          <FeatureCard key={card.title} title={card.title} description={card.description} />
        ))}
      </section>
    </Layout>
  )
}
