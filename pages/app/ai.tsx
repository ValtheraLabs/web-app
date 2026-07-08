import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { analyzePortfolio } from '@/lib/api/ai'

const DEMO_WALLET_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to reach backend-api.'
}

export default function AiPage() {
  const { address, isConnected } = useAccount()
  const walletAddress = isConnected && address ? address : DEMO_WALLET_ADDRESS

  const portfolioAnalysisQuery = useQuery({
    queryKey: ['portfolio-analysis', walletAddress],
    queryFn: () =>
      analyzePortfolio({
        address: walletAddress,
        chain_id: 1,
        risk_profile: 'balanced'
      })
  })

  const analysis = portfolioAnalysisQuery.data
  const hasAnalysis = Boolean(analysis)
  const riskScore = analysis?.risk_score === null || analysis?.risk_score === undefined ? '--' : String(analysis.risk_score)
  const sourceLabel = analysis?.is_mock ? 'Mock analysis' : analysis?.source ?? 'AI API'

  return (
    <Layout>
      <SectionHeader
        eyebrow="AI intelligence"
        title="Portfolio analysis copilot"
        description="Backend AI analysis for summary, risk score, risk factors, recommendations, and model-source context."
        actions={
          <>
            <StatusBadge label={isConnected ? 'Connected wallet' : 'Demo wallet'} tone="info" />
            <StatusBadge label={sourceLabel} tone={analysis?.is_mock ? 'warning' : 'success'} />
          </>
        }
      />

      <section className="panel-grid">
        <MetricCard
          label="Risk score"
          value={riskScore}
          detail={analysis ? `${analysis.confidence ?? 'Unknown'} confidence from ${analysis.source}.` : `Wallet ${formatAddress(walletAddress)}`}
          trend={<StatusBadge label={sourceLabel} tone={analysis?.is_mock ? 'warning' : 'info'} />}
        />

        {portfolioAnalysisQuery.isLoading ? (
          <DataState
            status="loading"
            title="AI analysis loading"
            description="Requesting backend portfolio analysis for the selected wallet."
          />
        ) : portfolioAnalysisQuery.isError ? (
          <DataState
            status="error"
            title="AI analysis unavailable"
            description={errorMessage(portfolioAnalysisQuery.error)}
          />
        ) : !hasAnalysis ? (
          <DataState
            status="empty"
            title="No AI analysis"
            description="Backend returned no portfolio analysis payload for this wallet."
          />
        ) : analysis ? (
          <Panel
            eyebrow="Summary"
            title="Portfolio posture"
            description={analysis.overall_summary}
            className="panel-wide"
          >
            <div className="asset-list">
              <div className="asset-row">
                <span>Source</span>
                <strong>{analysis.source}</strong>
              </div>
              <div className="asset-row">
                <span>Mock status</span>
                <strong>{analysis.is_mock ? 'mock' : 'live'}</strong>
              </div>
              <div className="asset-row">
                <span>Chain ID</span>
                <strong>{analysis.chain_id}</strong>
              </div>
            </div>
          </Panel>
        ) : (
          <DataState
            status="unavailable"
            title="AI analysis unavailable"
            description="AI analysis payload is unavailable after backend request completed."
          />
        )}

        <Panel
          eyebrow="Risk factors"
          title="AI-flagged risks"
          description="Factors are explanatory only and do not trigger automated action."
        >
          {analysis && analysis.risk_factors.length > 0 ? (
            <div className="asset-list">
              {analysis.risk_factors.map((factor) => (
                <div className="asset-row" key={factor.name}>
                  <span>
                    {factor.name}
                    <br />
                    {factor.explanation}
                  </span>
                  <strong>{factor.severity}</strong>
                </div>
              ))}
            </div>
          ) : (
            <DataState
              status={portfolioAnalysisQuery.isLoading ? 'loading' : 'empty'}
              title={portfolioAnalysisQuery.isLoading ? 'Risk factors loading' : 'No risk factors'}
              description={portfolioAnalysisQuery.isLoading ? 'Waiting for AI risk factors.' : 'Backend returned no risk factor rows.'}
            />
          )}
        </Panel>

        <Panel
          eyebrow="Recommendations"
          title="AI recommended actions"
          description="Recommendations are read-only guidance for review."
        >
          {analysis && analysis.recommended_actions.length > 0 ? (
            <div className="asset-list">
              {analysis.recommended_actions.map((action) => (
                <div className="asset-row" key={action.label}>
                  <span>
                    {action.label}
                    <br />
                    {action.rationale}
                  </span>
                  <strong>{action.priority}</strong>
                </div>
              ))}
            </div>
          ) : (
            <DataState
              status={portfolioAnalysisQuery.isLoading ? 'loading' : 'empty'}
              title={portfolioAnalysisQuery.isLoading ? 'Recommendations loading' : 'No recommendations'}
              description={portfolioAnalysisQuery.isLoading ? 'Waiting for AI recommendations.' : 'Backend returned no recommendations.'}
            />
          )}
        </Panel>

        <Panel
          eyebrow="Disclaimer"
          title="Preview-only intelligence"
          description={analysis?.disclaimer ?? 'AI analysis is informational only and must not be treated as financial advice.'}
        >
          <DataState
            status="unavailable"
            title="Execution unavailable"
            description="This page never builds, signs, submits, or simulates transactions."
          />
        </Panel>
      </section>
    </Layout>
  )
}
