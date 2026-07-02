type TokenInputProps = {
  label: string
  amount: string
  tokenSymbol: string
  tokenName: string
  balanceLabel: string
  readOnly?: boolean
  onAmountChange?: (value: string) => void
}

export function TokenInput({
  label,
  amount,
  tokenSymbol,
  tokenName,
  balanceLabel,
  readOnly = false,
  onAmountChange
}: TokenInputProps) {
  return (
    <section className="swap-token-panel">
      <div className="swap-token-header">
        <div>
          <p className="eyebrow">{label}</p>
          <p className="swap-balance">{balanceLabel}</p>
        </div>
        <button className="token-selector" type="button" disabled>
          <span>{tokenSymbol}</span>
          <small>{tokenName}</small>
        </button>
      </div>
      <input
        aria-label={`${label} amount`}
        className="amount-input"
        inputMode="decimal"
        placeholder="0.00"
        readOnly={readOnly}
        value={amount}
        onChange={(event) => onAmountChange?.(event.target.value)}
      />
    </section>
  )
}
