# Task 4: Swap Terminal — Centered Single-Column Layout

**Files:**
- Modify: `components/swap/SwapTerminal.tsx` (restructure layout)
- Modify: `app/globals.css` (add new CSS, remove old swap classes)

## What to Do

Restructure SwapTerminal from 2-column layout to centered single-column Kromatika-style card.

## Changes to SwapTerminal.tsx

Replace entire file content with:

```tsx
import { AiTradeContext } from './AiTradeContext'
import { RiskPanel } from './RiskPanel'
import { RoutePreview } from './RoutePreview'
import { TokenInput } from './TokenInput'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { DataState } from '@/components/ui/DataState'

export function SwapTerminal() {
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
            token="ETH"
            balance="12.5 ETH"
            defaultValue="1.0"
          />

          <div className="swap-arrow-btn">
            <button aria-label="Switch tokens">↓</button>
          </div>

          <TokenInput
            label="You receive"
            token="USDC"
            balance="15,000 USDC"
            defaultValue="3,245.60"
          />

          <div className="swap-settings">
            <div className="swap-setting-row">
              <span>Limit Price</span>
              <input
                type="text"
                className="swap-setting-input"
                placeholder="0.00"
                defaultValue="3245.60"
              />
            </div>
            <div className="swap-setting-row">
              <span>Slippage</span>
              <div className="slippage-pills">
                <button className="pill active">0.5%</button>
                <button className="pill">1.0%</button>
                <button className="pill">Custom</button>
              </div>
            </div>
          </div>

          <RoutePreview />

          <button className="swap-cta" disabled>
            Preview Swap
          </button>

          <div className="swap-footer">
            <span>Network: Ethereum</span>
            <span className="swap-connected"><span className="dot" />Connected</span>
          </div>
        </div>

        <div className="swap-terminal-side">
          <AiTradeContext />
          <RiskPanel />
          <div className="card">
            <div className="eyebrow">Portfolio</div>
            <DataState
              status="unavailable"
              title="Portfolio impact"
              description="Portfolio impact will appear when swap details are available."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
```

## New CSS to Add to globals.css

Add these blocks just before the `@media` section at the end:

```css
/* === Kromatika Swap Terminal === */
.swap-page-layout {
  display: flex;
  justify-content: center;
}

.swap-terminal-center {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 960px;
}

.swap-terminal-card {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.25rem;
  display: grid;
  gap: 0.75rem;
}

.swap-terminal-side {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.swap-tabs {
  display: flex;
  gap: 0.5rem;
}

.swap-tab {
  border: 0;
  border-radius: 999px;
  padding: 0.5rem 1.25rem;
  background: transparent;
  color: var(--faint);
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
}

.swap-tab.active {
  background: var(--accent);
  color: #fff;
}

.swap-tab:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.swap-arrow-btn {
  display: flex;
  justify-content: center;
}

.swap-arrow-btn button {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--accent);
  font-size: 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swap-settings {
  display: grid;
  gap: 0.5rem;
}

.swap-setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--panel-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.6rem 0.85rem;
}

.swap-setting-row span {
  color: var(--faint);
  font-size: 0.85rem;
}

.swap-setting-input {
  background: transparent;
  border: 0;
  color: var(--text);
  font-weight: 600;
  text-align: right;
  width: 120px;
}

.slippage-pills {
  display: flex;
  gap: 0.35rem;
}

.pill {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  background: transparent;
  color: var(--faint);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}

.pill.active {
  background: var(--panel-strong);
  color: var(--text);
  border-color: var(--accent);
}

.swap-cta {
  width: 100%;
  border: 0;
  border-radius: 1rem;
  padding: 0.85rem;
  background: var(--accent);
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}

.swap-cta:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.swap-footer {
  display: flex;
  justify-content: space-between;
  color: var(--faint);
  font-size: 0.8rem;
}

.swap-connected {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--success);
}

.swap-connected .dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: var(--success);
}
```

## Remove Old Swap CSS

Remove these unused CSS classes from globals.css (they exist in the current file):
- `.swap-terminal-layout` 
- `.swap-main`
- `.swap-side` 
- `.swap-stack`
- `.swap-card`
- `.swap-card-header`
- `.swap-token-header`
- `.swap-token-panel`
- `.amount-input`
- `.swap-direction`
- `.slippage-control`
- `.token-selector`
- `.swap-input-helper`
- `.swap-copy`
- `.swap-disabled-copy`
- `.preview-safety-banner`
- `.disabled-action`
- `.swap-balance`
- `.swap-detail-grid`
- `.context-row`
- `.swap-list`
- `.risk-panel`
- `.swap-status-grid`
- `.compact-card`
- `.portfolio-impact`

Be careful: some of these classes might also be used by other components (like `AiTradeContext`, `RiskPanel`). Only remove classes that are defined in globals.css AND only used by the old swap layout. If a class like `.swap-list` or `.context-row` is used elsewhere, keep it.

## Verification

Run `npm run build` — must compile with no errors.

## Commit

```
git add components/swap/SwapTerminal.tsx app/globals.css
git commit -m "feat: restructure swap terminal to centered Kromatika-style layout"
```
