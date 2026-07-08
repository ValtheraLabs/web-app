type AiTradeContextProps = {
  quoteReady: boolean
  slippage: string
  provider: string | null
}

export function AiTradeContext({ quoteReady, slippage, provider }: AiTradeContextProps) {
  const contextItems = [
    {
      label: 'Intent',
      value: quoteReady
        ? 'Real-time quote loaded from backend provider.'
        : 'Enter an amount to fetch quote.'
    },
    {
      label: 'Market read',
      value: quoteReady && provider
        ? `Quote sourced from ${provider}.`
        : 'Backend quote provider waiting for input.'
    },
    {
      label: 'Guardrail',
      value: `Slippage tolerance: ${slippage}. Quote is real — execution requires wallet confirmation.`
    }
  ]

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
