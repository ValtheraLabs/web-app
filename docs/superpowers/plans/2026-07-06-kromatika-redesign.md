# Kromatika Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply Kromatika Finance-inspired visual redesign (purple palette, clean cards, centered swap terminal) to Valthera web-app.

**Architecture:** Pure CSS + component props change. No new features, no backend, no routing changes. All visual.

**Tech Stack:** Next.js 14, TypeScript, CSS custom properties (no Tailwind)

## Global Constraints

- All colors defined as CSS custom properties in `app/globals.css` `:root`
- Kromatika purple `#945DC8` replaces gold `#d6a84f` as accent
- Valthera cyan `#60d6e7` kept as secondary accent
- No new dependencies or packages
- Build must remain clean (`npm run build` passes)

---

### Task 1: CSS Design Tokens — Update All Variables

**Files:**
- Modify: `app/globals.css:1-19` (CSS custom properties)

**Interfaces:** Consumes: nothing. Produces: updated `:root` block with new color values.

- [ ] **Step 1: Update `:root` CSS variables**

Replace the `:root` block in `app/globals.css`:

```css
:root {
  color-scheme: dark;
  --bg: #131316;
  --panel: #1A1A1E;
  --panel-soft: #242429;
  --panel-strong: #2E2E35;
  --border: #373742;
  --border-strong: #4A4A57;
  --text: #FFFFFF;
  --muted: #C3C5CB;
  --faint: #8F96AC;
  --accent: #945DC8;
  --accent-soft: rgba(148, 93, 200, 0.15);
  --cyan: #60d6e7;
  --success: #27AE60;
  --danger: #FF4343;
  --radius: 1rem;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
}
```

- [ ] **Step 2: Build check**

Run: `cd /d C:\TrinexOS\projects\ValtheraApp\web-app && npm run build`
Expected: "Compiled successfully"

- [ ] **Step 3: Commit**

```
git add app/globals.css
git commit -m "feat: update CSS tokens to purple Kromatika palette"
```

---

### Task 2: Base Layout — Body, Shell, Header, Sidebar

**Files:**
- Modify: `app/globals.css:20-219` (body, shell, header, nav)

**Interfaces:** Consumes: new CSS vars from Task 1. Produces: updated layout styles.

- [ ] **Step 1: Update body background**

Replace body block in `globals.css`. Keep subtle grid lines but use purple-tinted radials:

```css
body {
  margin: 0;
  background:
    linear-gradient(90deg, rgba(148, 93, 200, 0.04) 1px, transparent 1px),
    linear-gradient(rgba(96, 214, 231, 0.025) 1px, transparent 1px),
    radial-gradient(circle at top left, rgba(148, 93, 200, 0.1), transparent 30rem),
    radial-gradient(circle at top right, rgba(96, 214, 231, 0.07), transparent 28rem),
    var(--bg);
  background-size: 72px 72px, 72px 72px, auto, auto, auto;
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
```

- [ ] **Step 2: Update header background**

Change `.header` background from gold-tinted to neutral dark:

```css
.header {
  /* ... all existing props stay ... */
  background: rgba(19, 19, 22, 0.88);
  /* ... */
}
```

- [ ] **Step 3: Update header status badge**

Replace `.header-status` gold border with purple:

```css
.header-status {
  /* ... existing props ... */
  border: 1px solid rgba(148, 93, 200, 0.26);
  background: var(--accent-soft);
  color: #c8a8e6;
}
```

- [ ] **Step 4: Update brand mark (logo)**

Replace `.brand-mark` gold gradient with purple gradient:

```css
.brand-mark {
  /* ... existing size/border ... */
  border: 1px solid rgba(148, 93, 200, 0.5);
  background:
    linear-gradient(135deg, transparent 42%, rgba(148, 93, 200, 0.9) 43%, rgba(148, 93, 200, 0.9) 56%, transparent 57%),
    linear-gradient(135deg, #1A1A1E, #2E2E35);
  box-shadow: 0 0 32px rgba(148, 93, 200, 0.28);
}
```

- [ ] **Step 5: Update sidebar nav**

Replace `.command-rail` gradient with solid panel bg; update `.nav-item[aria-current="page"]` from gold to purple:

```css
.command-rail {
  /* ... layout stays ... */
  background: var(--panel);
}

.nav-item:hover,
.nav-item:focus-visible {
  border-color: var(--border-strong);
  background: rgba(148, 93, 200, 0.07);
}

.nav-item[aria-current="page"] {
  border-color: rgba(148, 93, 200, 0.58);
  background: linear-gradient(90deg, rgba(148, 93, 200, 0.18), rgba(96, 214, 231, 0.055));
  box-shadow: inset 3px 0 0 var(--accent);
}

.nav-item[aria-current="page"] span {
  color: #c8a8e6;
}
```

- [ ] **Step 6: Build check**

Run: `npm run build`
Expected: "Compiled successfully"

- [ ] **Step 7: Commit**

```
git add app/globals.css
git commit -m "feat: update layout styles to purple palette"
```

---

### Task 3: Cards, Panels, Eyebrows — Remove Accent Bars

**Files:**
- Modify: `app/globals.css:220-330` (card, panel, grid, button styles)

**Interfaces:** Consumes: new CSS vars. Produces: clean card styles.

- [ ] **Step 1: Remove left accent bars**

Remove the `::before` pseudo-element block from `.panel::before`, `.metric-card::before`, `.data-state::before`:

```css
/* DELETE these lines entirely:
.panel::before,
.metric-card::before,
.data-state::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--accent), transparent 70%);
  opacity: 0.65;
}
*/
```

- [ ] **Step 2: Update eyebrow text color**

Change `.eyebrow` from gold to purple:

```css
.eyebrow {
  color: var(--accent);
  /* rest stays */
}
```

- [ ] **Step 3: Update primary button**

Change `.button` from gold gradient to solid purple:

```css
.button {
  /* ... existing layout ... */
  background: var(--accent);
  color: #fff;
}
```

- [ ] **Step 4: Update status badge colors**

Update the status badge variants to use Kromatika palette:

```css
.status-badge-success {
  border-color: rgba(39, 174, 96, 0.42);
  color: #6fcf97;
}

.status-badge-warning {
  border-color: rgba(148, 93, 200, 0.5);
  color: #c8a8e6;
}

.status-badge-danger {
  border-color: rgba(255, 67, 67, 0.5);
  color: #ff9a9a;
}

.status-badge-info {
  border-color: rgba(96, 214, 231, 0.45);
  color: #a5edf6;
}
```

- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: "Compiled successfully"

- [ ] **Step 6: Commit**

```
git add app/globals.css
git commit -m "feat: clean cards, remove accent bars, update badges/buttons to purple"
```

---

### Task 4: Swap Terminal — Centered Single-Column Layout

**Files:**
- Modify: `components/swap/SwapTerminal.tsx` (restructure layout)

**Interfaces:**
- Consumes: TokenInput, RoutePreview, RiskPanel, AiTradeContext components (props unchanged)
- Produces: new centered layout with Kromatika-style token panels

- [ ] **Step 1: Restructure SwapTerminal layout**

Current: 2-column grid (`swap-terminal-layout`). New: centered single-column + optional side panel below.

Replace `components/swap/SwapTerminal.tsx` content:

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

- [ ] **Step 2: Add new CSS for swap terminal card**

Add to `app/globals.css` before the `@media` block:

```css
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

- [ ] **Step 3: Build check**

Run: `npm run build`
Expected: "Compiled successfully"

- [ ] **Step 4: Commit**

```
git add components/swap/SwapTerminal.tsx app/globals.css
git commit -m "feat: restructure swap terminal to centered Kromatika-style layout"
```

---

### Task 5: TokenInput — Kromatika-Style Token Panels

**Files:**
- Modify: `components/swap/TokenInput.tsx` (redesign layout)

**Interfaces:**
- Consumes: props `label`, `token`, `balance`, `defaultValue` (string)
- Produces: rendered token panel with selector + amount input

- [ ] **Step 1: Redesign TokenInput component**

Replace `components/swap/TokenInput.tsx`:

```tsx
type TokenInputProps = {
  label: string
  token: string
  balance: string
  defaultValue?: string
}

export function TokenInput({ label, token, balance, defaultValue }: TokenInputProps) {
  return (
    <div className="token-panel">
      <div className="token-panel-header">
        <span className="token-panel-label">{label}</span>
      </div>
      <div className="token-panel-body">
        <div className="token-selector-btn">
          <span className="token-icon" />
          <span className="token-symbol">{token}</span>
          <span className="token-chevron">▼</span>
        </div>
        <input
          type="text"
          className="token-amount-input"
          placeholder="0"
          defaultValue={defaultValue}
          inputMode="decimal"
          autoComplete="off"
        />
      </div>
      <div className="token-balance">Balance: {balance}</div>
    </div>
  )
}
```

- [ ] **Step 2: Add TokenInput CSS to globals.css**

Add before the `@media` block:

```css
.token-panel {
  background: var(--panel-soft);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 0.85rem;
}

.token-panel-header {
  margin-bottom: 0.35rem;
}

.token-panel-label {
  color: var(--faint);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.token-panel-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.token-selector-btn {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--panel-strong);
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 150ms;
}

.token-selector-btn:hover {
  border-color: var(--accent);
}

.token-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 999px;
  background: var(--accent);
  flex-shrink: 0;
}

.token-symbol {
  color: var(--text);
  font-weight: 700;
  font-size: 1rem;
}

.token-chevron {
  color: var(--faint);
  font-size: 0.65rem;
}

.token-amount-input {
  background: transparent;
  border: 0;
  color: var(--text);
  font-size: 1.75rem;
  font-weight: 700;
  text-align: right;
  width: auto;
  min-width: 0;
  flex: 1;
  outline: 0;
}

.token-amount-input::placeholder {
  color: rgba(148, 163, 184, 0.45);
}

.token-balance {
  color: var(--faint);
  font-size: 0.78rem;
  text-align: right;
  margin-top: 0.35rem;
}
```

- [ ] **Step 3: Clean up old swap CSS**

Remove old swap-specific classes that are no longer used: `.swap-terminal-layout`, `.swap-main`, `.swap-side`, `.swap-stack`, `.swap-card`, `.swap-card-header`, `.swap-token-header`, `.swap-token-panel`, `.amount-input`, `.swap-direction`, `.slippage-control`, `.token-selector`, `.swap-input-helper`, `.swap-copy`, `.swap-disabled-copy`, `.preview-safety-banner`, `.disabled-action`, `.swap-balance`, `.swap-detail-grid`, `.context-row`, `.swap-list`, `.risk-panel`, `.swap-status-grid`, `.compact-card`.

- [ ] **Step 4: Build check**

Run: `npm run build`
Expected: "Compiled successfully"

- [ ] **Step 5: Commit**

```
git add components/swap/TokenInput.tsx app/globals.css
git commit -m "feat: redesign TokenInput to Kromatika-style token panels"
```

---

### Task 6: RoutePreview Polish + Final Cleanup

**Files:**
- Modify: `components/swap/RoutePreview.tsx` (visual polish)
- Modify: `app/globals.css` (remove unused classes, verify all)

- [ ] **Step 1: Polish RoutePreview**

Update `components/swap/RoutePreview.tsx`:

```tsx
export function RoutePreview() {
  return (
    <div className="route-preview-card">
      <div className="route-preview-label">Route Preview</div>
      <div className="route-preview-path">
        <span className="route-node">
          <span className="route-dot-purple" />ETH
        </span>
        <span className="route-arrow">→</span>
        <span className="route-node">
          <span className="route-dot-blue" />USDC
        </span>
        <span className="route-best">Best route</span>
      </div>
      <div className="route-detail">Min received: 3,237.50 USDC · Fee: 0.05%</div>
    </div>
  )
}
```

Add RoutePreview CSS to globals.css:

```css
.route-preview-card {
  background: var(--panel-soft);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.85rem;
}

.route-preview-label {
  color: var(--faint);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.route-preview-path {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.route-node {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text);
  font-size: 0.85rem;
  font-weight: 600;
}

.route-dot-purple {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  background: var(--accent);
}

.route-dot-blue {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 999px;
  background: #2172E5;
}

.route-arrow {
  color: var(--faint);
  font-size: 0.85rem;
}

.route-best {
  margin-left: auto;
  color: var(--success);
  font-size: 0.78rem;
  font-weight: 600;
}

.route-detail {
  color: var(--faint);
  font-size: 0.78rem;
  margin-top: 0.35rem;
}
```

- [ ] **Step 2: Full build**

Run: `npm run build`
Expected: "Compiled successfully"

- [ ] **Step 3: Commit**

```
git add components/swap/RoutePreview.tsx app/globals.css
git commit -m "feat: polish RoutePreview to Kromatika style"
```

---

### Task 7: StatusBadge Component — Tone Color Update

**Files:**
- Modify: `components/ui/StatusBadge.tsx` (tone CSS classes → new palette)

**Interfaces:** Consumes: existing props interface. Produces: badges with new color classes.

- [ ] **Step 1: Verify StatusBadge uses tone classes**

Check that `StatusBadge.tsx` applies tone-specific CSS classes (e.g., `.status-badge-success`, `.status-badge-warning`) that are already updated in globals.css. If it uses inline styles or hardcoded colors, update those.

- [ ] **Step 2: Commit**

```
git add components/ui/StatusBadge.tsx
git commit -m "chore: align StatusBadge colors with new palette"
```
