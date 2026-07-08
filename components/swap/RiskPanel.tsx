type RiskPanelProps = {
  providerWarnings: string[]
  quoteReady: boolean
}

const previewRisks = [
  'Preview only. No transaction is built, signed, submitted, or simulated.',
  'Execution controls remain disabled until a separate reviewed flow exists.',
  'Liquidity, fees, and market movement are indicative until backend quotes are connected.'
]

export function RiskPanel({ providerWarnings, quoteReady }: RiskPanelProps) {
  const risks = [...providerWarnings, ...previewRisks]

  return (
    <article className="card risk-panel">
      <p className="eyebrow">Risk warning</p>
      <h2>{quoteReady ? 'Preview constraints active' : 'Quote not ready'}</h2>
      <ul className="swap-list">
        {risks.map((risk) => (
          <li key={risk}>{risk}</li>
        ))}
      </ul>
    </article>
  )
}
