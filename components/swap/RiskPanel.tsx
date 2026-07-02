const risks = [
  'Quote execution is not connected yet.',
  'Liquidity, fees, and market movement are placeholders.',
  'Wallet signing will require a separate confirmation flow.'
]

export function RiskPanel() {
  return (
    <article className="card risk-panel">
      <p className="eyebrow">Risk warning</p>
      <h2>Review before signing</h2>
      <ul className="swap-list">
        {risks.map((risk) => (
          <li key={risk}>{risk}</li>
        ))}
      </ul>
    </article>
  )
}
