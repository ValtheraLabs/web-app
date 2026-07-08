type RoutePreviewProps = {
  slippage: string
  priceImpact: string
  inputAmount: string
  outputAmount: string
  quoteReady: boolean
  quoteStatus: string
}

const routeSteps = ['ETH input intent', 'Valthera route preview', 'USDC output estimate']

export function RoutePreview({
  slippage,
  priceImpact,
  inputAmount,
  outputAmount,
  quoteReady,
  quoteStatus
}: RoutePreviewProps) {
  return (
    <article className="card">
      <p className="eyebrow">Route preview</p>
      <h2>{quoteReady ? 'Quote preview ready' : 'Quote preview idle'}</h2>
      <p className="swap-copy">{quoteStatus}</p>
      <div className="route-steps">
        {routeSteps.map((step, index) => (
          <div className="route-step" key={step}>
            <span className={quoteReady || index === 0 ? 'route-dot active' : 'route-dot'} />
            <p>{step}</p>
          </div>
        ))}
      </div>
      <div className="swap-detail-grid">
        <div>
          <span>Input</span>
          <strong>{inputAmount ? `${inputAmount} ETH` : 'Waiting'}</strong>
        </div>
        <div>
          <span>Output</span>
          <strong>{outputAmount ? `${outputAmount} USDC` : 'Waiting'}</strong>
        </div>
        <div>
          <span>Slippage</span>
          <strong>{slippage}</strong>
        </div>
        <div>
          <span>Price impact</span>
          <strong>{priceImpact}</strong>
        </div>
      </div>
    </article>
  )
}
