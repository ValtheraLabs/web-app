import { useQuery } from '@tanstack/react-query'

import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { analyzePortfolio } from '@/lib/api/ai'
import { getPortfolio } from '@/lib/api/portfolio'

const DEMO_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'

function formatUsd(value: number | undefined): string {
  if (typeof value !== 'number') {
    return '--'
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value)
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to reach backend-api.'
}

export default function DashboardPage() {
  const portfolioQuery = useQuery({
    queryKey: ['overview-portfolio', DEMO_WALLET_ADDRESS],
    queryFn: () => getPortfolio(DEMO_WALLET_ADDRESS)
  })

  const portfolioAnalysisQuery = useQuery({
    queryKey: ['overview-portfolio-analysis', DEMO_WALLET_ADDRESS],
    queryFn: () =>
      analyzePortfolio({
        address: DEMO_WALLET_ADDRESS,
        chain_id: 1,
        risk_profile: 'balanced'
      })
  })

  const backendIsLoading = portfolioQuery.isLoading || portfolioAnalysisQuery.isLoading
  const backendIsError = portfolioQuery.isError || portfolioAnalysisQuery.isError
  const backendIsReady = portfolioQuery.isSuccess && portfolioAnalysisQuery.isSuccess
  const portfolio = portfolioQuery.data
  const analysis = portfolioAnalysisQuery.data
  const riskScore = analysis?.risk_score === null || analysis?.risk_score === undefined ? '--' : String(analysis.risk_score)
  const mockLabel = portfolio?.is_mock || analysis?.is_mock ? 'Mock data' : 'Backend data'

  return (
    <Layout>
      <SectionHeader
        eyebrow="Command overview"
        title="Institutional command center"
        description="Demo wallet telemetry, backend readiness, and AI risk posture in one preview-safe operations view."
        actions={
          <>
            <StatusBadge label="Preview only" tone="warning" />
            <StatusBadge label={mockLabel} tone={portfolio?.is_mock || analysis?.is_mock ? 'info' : 'success'} />
          </>
        }
      />

      <section className="panel-grid">
        <MetricCard
          label="Wallet status"
          value="Demo wallet"
          detail={`${DEMO_WALLET_ADDRESS.slice(0, 6)}...${DEMO_WALLET_ADDRESS.slice(-4)} on chain ${portfolio?.chain_id ?? 1}`}
          trend={<StatusBadge label="Read only" tone="info" />}
        />

        <MetricCard
          label="Portfolio value"
          value={formatUsd(portfolio?.total_value_usd)}
          detail={portfolio ? `${portfolio.assets.length} assets returned by portfolio service.` : 'Waiting for portfolio service.'}
          trend={<StatusBadge label={portfolio?.is_mock ? 'Mock portfolio' : 'Portfolio API'} tone="info" />}
        />

        <MetricCard
          label="AI risk score"
          value={riskScore}
          detail={analysis ? `${analysis.confidence ?? 'Unknown'} confidence from ${analysis.source}.` : 'Waiting for AI portfolio analysis.'}
          trend={<StatusBadge label={analysis?.is_mock ? 'Mock analysis' : 'AI API'} tone="warning" />}
        />

        <MetricCard
          label="Quote readiness"
          value="Preview-ready"
          detail="Swap route review may display quotes, but no transaction is built, signed, submitted, or simulated."
          trend={<StatusBadge label="No execution" tone="danger" />}
        />

        {backendIsLoading ? (
          <DataState
            status="loading"
            title="Backend data loading"
            description="Portfolio and AI analysis requests are running for the demo wallet."
          />
        ) : backendIsError ? (
          <DataState
            status="error"
            title="Backend data unavailable"
            description={portfolioQuery.isError ? errorMessage(portfolioQuery.error) : errorMessage(portfolioAnalysisQuery.error)}
          />
        ) : backendIsReady && portfolio && analysis ? (
          <Panel
            eyebrow="Backend data state"
            title="Portfolio and AI online"
            description="Both overview feeds returned data for command-center display."
          >
            <div className="asset-list">
              <div className="asset-row">
                <span>Portfolio feed</span>
                <strong>{portfolio.is_mock ? 'mock' : 'live'}</strong>
              </div>
              <div className="asset-row">
                <span>AI analysis feed</span>
                <strong>{analysis.is_mock ? 'mock' : analysis.source}</strong>
              </div>
            </div>
          </Panel>
        ) : (
          <DataState
            status="empty"
            title="No backend data yet"
            description="Overview will populate when portfolio and AI services respond."
          />
        )}

        <Panel
          eyebrow="Preview-only safety"
          title="Observation mode enforced"
          description="This dashboard exposes portfolio, quote readiness, and AI risk context without creating execution paths."
        >
          <div className="asset-list">
            <div className="asset-row">
              <span>Transaction signing</span>
              <strong>disabled</strong>
            </div>
            <div className="asset-row">
              <span>Transaction submission</span>
              <strong>disabled</strong>
            </div>
            <div className="asset-row">
              <span>Transaction simulation</span>
              <strong>disabled</strong>
            </div>
          </div>
        </Panel>
      </section>
    </Layout>
  )
}
