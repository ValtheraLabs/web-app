import { useQuery } from '@tanstack/react-query'
import { useAccount } from 'wagmi'

import { Layout } from '@/components/Layout'
import { DataState } from '@/components/ui/DataState'
import { MetricCard } from '@/components/ui/MetricCard'
import { Panel } from '@/components/ui/Panel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatusBadge } from '@/components/ui/StatusBadge'
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

function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to reach backend-api.'
}

export default function PortfolioPage() {
  const { address, isConnected } = useAccount()
  const walletAddress = isConnected && address ? address : DEMO_WALLET_ADDRESS

  const portfolioQuery = useQuery({
    queryKey: ['portfolio', walletAddress],
    queryFn: () => getPortfolio(walletAddress)
  })

  const portfolio = portfolioQuery.data
  const hasAssets = Boolean(portfolio && portfolio.assets.length > 0)
  const mockLabel = portfolio?.is_mock ? 'Mock portfolio' : 'Portfolio API'

  return (
    <Layout>
      <SectionHeader
        eyebrow="Wallet intelligence"
        title="Portfolio command ledger"
        description="Backend portfolio telemetry for wallet exposure, asset allocations, chain context, and risk flags."
        actions={
          <>
            <StatusBadge label={isConnected ? 'Connected wallet' : 'Demo wallet'} tone="info" />
            <StatusBadge label={mockLabel} tone={portfolio?.is_mock ? 'warning' : 'success'} />
          </>
        }
      />

      <section className="panel-grid">
        <MetricCard
          label="Total value"
          value={formatUsd(portfolio?.total_value_usd)}
          detail={`Wallet ${formatAddress(walletAddress)}`}
          trend={<StatusBadge label={`Chain ${portfolio?.chain_id ?? 1}`} tone="neutral" />}
        />

        <MetricCard
          label="Assets"
          value={portfolio ? String(portfolio.assets.length) : '--'}
          detail={portfolio ? `${portfolio.risk_flags.length} portfolio-level risk flags.` : 'Waiting for portfolio service.'}
          trend={<StatusBadge label={mockLabel} tone={portfolio?.is_mock ? 'warning' : 'info'} />}
        />

        {portfolioQuery.isLoading ? (
          <DataState
            status="loading"
            title="Portfolio loading"
            description="Requesting backend portfolio data for the selected wallet."
          />
        ) : portfolioQuery.isError ? (
          <DataState
            status="error"
            title="Portfolio unavailable"
            description={errorMessage(portfolioQuery.error)}
          />
        ) : !hasAssets ? (
          <DataState
            status="empty"
            title="No portfolio assets"
            description="Backend returned no asset rows for this wallet."
          />
        ) : portfolio ? (
          <Panel
            eyebrow="Asset rows"
            title="Holdings and risk flags"
            description="Read-only backend data. Values are display-only and do not create execution paths."
            className="panel-wide"
          >
            <div className="asset-list">
              {portfolio.assets.map((asset) => (
                <div className="asset-row" key={`${asset.chain_id}-${asset.token_address}`}>
                  <span>
                    {asset.symbol} - {asset.name}
                    <br />
                    {formatUsd(asset.value_usd)} - {asset.allocation_percent.toFixed(2)}% - chain {asset.chain_id}
                  </span>
                  <strong>{asset.risk_flags.length > 0 ? asset.risk_flags.join(', ') : 'clear'}</strong>
                </div>
              ))}
            </div>
          </Panel>
        ) : (
          <DataState
            status="unavailable"
            title="Portfolio unavailable"
            description="Portfolio payload is unavailable after backend request completed."
          />
        )}

        <Panel
          eyebrow="Portfolio risk"
          title="Risk flags"
          description="Portfolio-level flags returned by backend portfolio service."
        >
          {portfolio && portfolio.risk_flags.length > 0 ? (
            <div className="asset-list">
              {portfolio.risk_flags.map((flag) => (
                <div className="asset-row" key={flag}>
                  <span>{flag}</span>
                  <strong>flagged</strong>
                </div>
              ))}
            </div>
          ) : (
            <DataState
              status={portfolioQuery.isLoading ? 'loading' : 'empty'}
              title={portfolioQuery.isLoading ? 'Risk flags loading' : 'No portfolio flags'}
              description={portfolioQuery.isLoading ? 'Waiting for backend risk flags.' : 'Backend returned no portfolio-level risk flags.'}
            />
          )}
        </Panel>
      </section>
    </Layout>
  )
}
