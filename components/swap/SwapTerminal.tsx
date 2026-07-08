import { useState, useEffect, useCallback, useRef } from 'react'
import { useAccount, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'
import { AiTradeContext } from './AiTradeContext'
import { RiskPanel } from './RiskPanel'
import { RoutePreview } from './RoutePreview'
import { TokenInput } from './TokenInput'
import { DataState } from '@/components/ui/DataState'
import { getQuote, type QuoteResponse } from '@/lib/api/quote'

const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'

type SwapState = {
  amountIn: string
  slippage: number
  quote: QuoteResponse | null
  loading: boolean
  error: string | null
}

export function SwapTerminal() {
  const { address, isConnected } = useAccount()
  const { sendTransactionAsync, isPending: isSending } = useSendTransaction()
  const [state, setState] = useState<SwapState>({
    amountIn: '',
    slippage: 50,
    quote: null,
    loading: false,
    error: null,
  })
  const [txHash, setTxHash] = useState<string | null>(null)
  const [txError, setTxError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchQuote = useCallback(async (amount: string) => {
    if (!amount || parseFloat(amount) <= 0) {
      setState(s => ({ ...s, quote: null, error: null, loading: false }))
      return
    }
    setState(s => ({ ...s, loading: true, error: null }))
    try {
      const quote = await getQuote({
        chain_id: 1,
        token_in: ETH_ADDRESS,
        token_out: USDC_ADDRESS,
        amount_in: amount,
        slippage_bps: state.slippage,
      })
      setState(s => ({ ...s, quote, loading: false }))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Quote fetch failed'
      setState(s => ({ ...s, quote: null, loading: false, error: message }))
    }
  }, [state.slippage])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchQuote(state.amountIn), 600)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [state.amountIn, fetchQuote])

  function handleAmountChange(value: string) {
    if (/^\d*\.?\d*$/.test(value)) {
      setState(s => ({ ...s, amountIn: value }))
    }
  }

  function handleSlippage(bps: number) {
    setState(s => ({ ...s, slippage: bps }))
  }

  async function executeSwap() {
    const q = state.quote
    if (!q || !q.to || !q.data) return
    setTxError(null)
    setTxHash(null)
    try {
      const tx = await sendTransactionAsync({
        to: q.to as `0x${string}`,
        data: q.data as `0x${string}`,
        value: q.value !== '0' ? parseEther(state.amountIn) : undefined,
      })
      setTxHash(tx)
    } catch (err) {
      setTxError(err instanceof Error ? err.message : 'Transaction failed')
    }
  }

  const quote = state.quote
  const quoteReady = !!quote && !state.loading && !state.error
  const outputAmount = quote ? parseFloat(quote.amount_out).toLocaleString(undefined, { maximumFractionDigits: 6 }) : ''
  const priceImpact = quote ? `${quote.price_impact}%` : '—'

  return (
    <div className="swap-page-layout">
      <div className="swap-terminal-center">
        <div className="swap-terminal-card">
          <div className="swap-tabs">
            <button className="swap-tab active">Swap</button>
            <button className="swap-tab" disabled>Limit</button>
          </div>

          <TokenInput
            label="You sell"
            tokenSymbol="ETH"
            tokenName="Ethereum"
            balanceLabel="—"
            amount={state.amountIn}
            onAmountChange={handleAmountChange}
          />

          <div className="swap-arrow-btn">
            <button aria-label="Switch tokens">↓</button>
          </div>

          <TokenInput
            label="You receive"
            tokenSymbol="USDC"
            tokenName="USD Coin"
            balanceLabel="—"
            amount={outputAmount}
            readOnly
          />

          <div className="swap-settings">
            <div className="swap-setting-row">
              <span>Slippage</span>
              <div className="slippage-pills">
                <button
                  className={state.slippage === 50 ? 'pill active' : 'pill'}
                  onClick={() => handleSlippage(50)}
                >
                  0.5%
                </button>
                <button
                  className={state.slippage === 100 ? 'pill active' : 'pill'}
                  onClick={() => handleSlippage(100)}
                >
                  1.0%
                </button>
                <button
                  className={state.slippage === 200 ? 'pill active' : 'pill'}
                  onClick={() => handleSlippage(200)}
                >
                  2.0%
                </button>
              </div>
            </div>
          </div>

          {state.loading ? (
            <div className="card"><p className="swap-copy">Fetching quote...</p></div>
          ) : state.error ? (
            <div className="card"><p className="swap-copy error">{state.error}</p></div>
          ) : null}

          <RoutePreview
            inputAmount={state.amountIn}
            outputAmount={outputAmount}
            priceImpact={priceImpact}
            quoteReady={quoteReady}
            quoteStatus={
              quoteReady
                ? `Quote via ${quote?.provider}. ${quote?.route.join(' → ')}`
                : 'Enter amount to get quote.'
            }
            slippage={`${state.slippage / 100}%`}
          />

          {txHash ? (
            <div className="card">
              <p className="swap-copy">Transaction submitted</p>
              <a
                href={`https://etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Etherscan
              </a>
            </div>
          ) : txError ? (
            <div className="card">
              <p className="swap-copy error">Transaction failed: {txError}</p>
            </div>
          ) : null}

          <button
            className="swap-cta"
            disabled={!quoteReady || !isConnected || isSending}
            onClick={executeSwap}
          >
            {!isConnected ? 'Connect Wallet to Swap' : isSending ? 'Sending...' : 'Execute Swap'}
          </button>

          <div className="swap-footer">
            <span>Network: Ethereum</span>
            <span className={isConnected ? 'swap-connected' : ''}>
              {isConnected ? <><span className="dot" />Connected</> : 'Wallet not connected'}
            </span>
          </div>
        </div>

        <div className="swap-terminal-side">
          <AiTradeContext
            quoteReady={quoteReady}
            slippage={`${state.slippage / 100}%`}
            provider={quote?.provider || null}
          />
          <RiskPanel
            providerWarnings={quote?.warnings || ['Enter amount and fetch quote to see risk warnings.']}
            quoteReady={quoteReady}
          />
          <div className="card">
            <div className="eyebrow">Portfolio</div>
            <DataState
              status={address ? 'unavailable' : 'empty'}
              title="Portfolio impact"
              description={
                address
                  ? 'Portfolio impact will appear when swap details are available.'
                  : 'Connect wallet to see portfolio impact.'
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
