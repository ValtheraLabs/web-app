import { useMemo, useState } from 'react'
import { useAccount, useChainId } from 'wagmi'
import { AiTradeContext } from './AiTradeContext'
import { RiskPanel } from './RiskPanel'
import { RoutePreview } from './RoutePreview'
import { TokenInput } from './TokenInput'

const OUTPUT_RATE = 1830

function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function formatOutputAmount(amount: string) {
  const parsed = Number(amount)

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return ''
  }

  return (parsed * OUTPUT_RATE).toLocaleString('en-US', {
    maximumFractionDigits: 2
  })
}

export function SwapTerminal() {
  const [amount, setAmount] = useState('')
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const outputAmount = useMemo(() => formatOutputAmount(amount), [amount])

  return (
    <div className="swap-terminal-layout">
      <section className="swap-main">
        <div className="swap-status-grid">
          <article className="card compact-card">
            <p className="eyebrow">Network status</p>
            <h2>{chainId ? `Chain ${chainId}` : 'No network'}</h2>
            <p>Network-aware quotes are placeholders in this UI milestone.</p>
          </article>
          <article className="card compact-card">
            <p className="eyebrow">Wallet state</p>
            <h2>{isConnected && address ? shortenAddress(address) : 'Not connected'}</h2>
            <p>
              {isConnected
                ? 'Wallet is connected for display state only.'
                : 'Connect a wallet to preview personalized state later.'}
            </p>
          </article>
        </div>

        <article className="card swap-card">
          <div className="swap-card-header">
            <div>
              <p className="eyebrow">Swap terminal</p>
              <h2>Prepare trade</h2>
            </div>
            <div className="slippage-control">
              <span>Slippage</span>
              <strong>0.50%</strong>
            </div>
          </div>

          <TokenInput
            amount={amount}
            balanceLabel="Balance placeholder"
            label="You pay"
            tokenName="Token selector"
            tokenSymbol="ETH"
            onAmountChange={setAmount}
          />
          <div className="swap-direction">v</div>
          <TokenInput
            amount={outputAmount}
            balanceLabel="Estimated output"
            label="You receive"
            readOnly
            tokenName="Token selector"
            tokenSymbol="USDC"
          />

          <div className="portfolio-impact">
            <span>Portfolio impact</span>
            <strong>Placeholder until balances and quotes are connected.</strong>
          </div>
          <button className="button disabled-action" type="button" disabled>
            UI preview only
          </button>
        </article>
      </section>

      <aside className="swap-side">
        <RoutePreview priceImpact="Placeholder" slippage="0.50%" />
        <RiskPanel />
        <AiTradeContext />
      </aside>
    </div>
  )
}
