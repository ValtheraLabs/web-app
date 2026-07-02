type RoutePreviewProps = {
  slippage: string
  priceImpact: string
}

const routeSteps = ['Input token', 'Valthera route engine', 'Output token']

export function RoutePreview({ slippage, priceImpact }: RoutePreviewProps) {
  return (
    <article className="card">
      <p className="eyebrow">Route preview</p>
      <h2>Preview only</h2>
      <div className="route-steps">
        {routeSteps.map((step) => (
          <div className="route-step" key={step}>
            <span />
            <p>{step}</p>
          </div>
        ))}
      </div>
      <div className="swap-detail-grid">
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
