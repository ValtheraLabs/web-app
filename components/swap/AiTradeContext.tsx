const contextItems = [
  {
    label: 'Intent',
    value: 'Estimate trade context before any wallet action.'
  },
  {
    label: 'Market read',
    value: 'Waiting for backend market and route intelligence.'
  },
  {
    label: 'Guardrail',
    value: 'AI output is informational and non-authoritative.'
  }
]

export function AiTradeContext() {
  return (
    <article className="card">
      <p className="eyebrow">AI context</p>
      <h2>Trade assistant</h2>
      <div className="swap-stack">
        {contextItems.map((item) => (
          <div className="context-row" key={item.label}>
            <span>{item.label}</span>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </article>
  )
}
