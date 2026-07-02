import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { FeatureCard } from '@/components/FeatureCard'
import { Layout } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { analyzePortfolio } from '@/lib/api/ai'
import { getPortfolio } from '@/lib/api/portfolio'

const MOCK_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'

type SectionConfig = {
  eyebrow: string
  title: string
  description: string
  cards: Array<{ title: string; description: string }>
}

const sections: Record<string, SectionConfig> = {
  swap: {
    eyebrow: 'Exchange',
    title: 'Asset terminal',
    description:
      'A placeholder screen for asset selection, quote context, and Valthera AI guidance.',
    cards: [
      {
        title: 'Asset controls',
        description: 'Input and output controls will be added after wallet setup.'
      },
      {
        title: 'Route context',
        description: 'Route, fee, and market context will appear here.'
      },
      {
        title: 'AI notes',
        description: 'Valthera AI will summarize useful context for the user.'
      }
    ]
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Wallet intelligence',
    description:
      'Backend portfolio data for a mock wallet, ready for wallet-driven addresses later.',
    cards: [
      {
        title: 'Exposure',
        description: 'Risk and concentration signals will be shown here.'
      },
      {
        title: 'History',
        description: 'Wallet activity and performance summaries will be added later.'
      }
    ]
  },
  research: {
    eyebrow: 'Research',
    title: 'Token research',
    description:
      'A placeholder screen for token, liquidity, holder, and contract context.',
    cards: [
      {
        title: 'Token profile',
        description: 'Core token metadata and market data will appear here.'
      },
      {
        title: 'Liquidity view',
        description: 'Liquidity and volatility context will be added in future tasks.'
      },
      {
        title: 'Risk factors',
        description: 'Structured warnings and uncertainty notes will appear here.'
      }
    ]
  },
  ai: {
    eyebrow: 'AI',
    title: 'Valthera copilot',
    description:
      'Backend AI portfolio analysis for a mock wallet routed through backend-api.',
    cards: [
      {
        title: 'Research agent',
        description: 'Summarizes token and market context.'
      },
      {
        title: 'Risk agent',
        description: 'Explains possible risk factors and uncertainty.'
      }
    ]
  },
  settings: {
    eyebrow: 'Settings',
    title: 'User preferences',
    description:
      'A placeholder screen for network, interface, and privacy preferences.',
    cards: [
      {
        title: 'Networks',
        description: 'Preferred chains and environments will be configured here.'
      },
      {
        title: 'Interface',
        description: 'Display and terminal preferences will be configured here.'
      },
      {
        title: 'Privacy',
        description: 'User-side privacy settings will be configured here.'
      }
    ]
  }
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value)
}

function errorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : 'Unable to reach backend-api.'
}

export default function AppSectionPage() {
  const router = useRouter()
  const sectionKey = String(router.query.section || 'ai')
  const section = sections[sectionKey] || sections.ai
  const isPortfolio = sectionKey === 'portfolio'
  const isAi = sectionKey === 'ai'

  const portfolioQuery = useQuery({
    queryKey: ['portfolio', MOCK_WALLET_ADDRESS],
    queryFn: () => getPortfolio(MOCK_WALLET_ADDRESS),
    enabled: isPortfolio
  })

  const portfolioAnalysisQuery = useQuery({
    queryKey: ['portfolio-analysis', MOCK_WALLET_ADDRESS],
    queryFn: () =>
      analyzePortfolio({
        address: MOCK_WALLET_ADDRESS,
        chain_id: 1,
        risk_profile: 'balanced'
      }),
    enabled: isAi
  })

  return (
    <Layout>
      <PageHeader
        eyebrow={section.eyebrow}
        title={section.title}
        description={section.description}
      />

      {isPortfolio ? (
        <section className="panel-grid">
          <article className="card">
            <p className="eyebrow">Portfolio value</p>
            {portfolioQuery.isLoading ? (
              <>
                <h2>Loading portfolio</h2>
                <p>Requesting wallet data from backend-api.</p>
              </>
            ) : portfolioQuery.isError ? (
              <>
                <h2>Backend unavailable</h2>
                <p>{errorMessage(portfolioQuery.error)}</p>
              </>
            ) : portfolioQuery.data && portfolioQuery.data.assets.length > 0 ? (
              <>
                <h2>{formatUsd(portfolioQuery.data.total_value_usd)}</h2>
                <p>
                  {portfolioQuery.data.assets.length} assets on chain{' '}
                  {portfolioQuery.data.chain_id}. Data source is{' '}
                  {portfolioQuery.data.is_mock ? 'mock backend data' : 'live backend data'}.
                </p>
              </>
            ) : (
              <>
                <h2>No assets found</h2>
                <p>The backend returned an empty portfolio for this mock wallet.</p>
              </>
            )}
          </article>

          <article className="card">
            <p className="eyebrow">Allocation</p>
            {portfolioQuery.data && portfolioQuery.data.assets.length > 0 ? (
              <div className="asset-list">
                {portfolioQuery.data.assets.map((asset) => (
                  <div className="asset-row" key={asset.token_address}>
                    <span>{asset.symbol}</span>
                    <strong>{asset.allocation_percent.toFixed(2)}%</strong>
                  </div>
                ))}
              </div>
            ) : portfolioQuery.isLoading ? (
              <p>Loading allocation data.</p>
            ) : portfolioQuery.isError ? (
              <p>Allocation is unavailable until backend-api responds.</p>
            ) : (
              <p>No allocation data is available for this wallet.</p>
            )}
          </article>
        </section>
      ) : null}

      {isAi ? (
        <section className="panel-grid">
          <article className="card">
            <p className="eyebrow">AI portfolio analysis</p>
            {portfolioAnalysisQuery.isLoading ? (
              <>
                <h2>Loading analysis</h2>
                <p>Sending mock wallet data to backend-api.</p>
              </>
            ) : portfolioAnalysisQuery.isError ? (
              <>
                <h2>Analysis unavailable</h2>
                <p>{errorMessage(portfolioAnalysisQuery.error)}</p>
              </>
            ) : portfolioAnalysisQuery.data ? (
              <>
                <h2>
                  {portfolioAnalysisQuery.data.risk_score === null
                    ? 'Risk pending'
                    : `Risk ${portfolioAnalysisQuery.data.risk_score}`}
                </h2>
                <p>
                  {portfolioAnalysisQuery.data.overall_summary} Source:{' '}
                  {portfolioAnalysisQuery.data.source}.
                </p>
              </>
            ) : (
              <>
                <h2>No analysis yet</h2>
                <p>The backend returned no portfolio analysis for this wallet.</p>
              </>
            )}
          </article>

          <article className="card">
            <p className="eyebrow">Risk factors</p>
            {portfolioAnalysisQuery.data &&
            portfolioAnalysisQuery.data.risk_factors.length > 0 ? (
              <div className="asset-list">
                {portfolioAnalysisQuery.data.risk_factors.map((factor) => (
                  <div className="asset-row" key={factor.name}>
                    <span>{factor.name}</span>
                    <strong>{factor.severity}</strong>
                  </div>
                ))}
              </div>
            ) : portfolioAnalysisQuery.isLoading ? (
              <p>Loading risk factors.</p>
            ) : portfolioAnalysisQuery.isError ? (
              <p>Risk factors are unavailable until backend-api responds.</p>
            ) : (
              <p>No risk factors were returned for this analysis.</p>
            )}
          </article>
        </section>
      ) : null}

      <section className="grid">
        {section.cards.map((card) => (
          <FeatureCard
            key={card.title}
            title={card.title}
            description={card.description}
          />
        ))}
      </section>
    </Layout>
  )
}
