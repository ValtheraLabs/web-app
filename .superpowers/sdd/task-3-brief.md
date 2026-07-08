# Task 3: Cards & Panels — Remove Accent Bars, Clean Up

**Files:**
- Modify: `app/globals.css` (card, panel, button, badge sections)

## What to Do

Remove the 3px gold left accent bars from cards. Update eyebrow, button, and badge colors to purple palette.

## Changes

**1. Remove left accent bars** — Delete these entire blocks from globals.css:

```
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
```

**2. Update eyebrow color** — `.eyebrow` already uses `var(--accent)` which is now purple. It should work as-is. Just verify it's `color: var(--accent)` — if it is, no change needed.

**3. Update primary button** — Change `.button` from gold gradient to solid purple:

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.85rem 1.1rem;
  background: var(--accent);
  color: #fff;
  font-weight: 700;
}
```

**4. Update status badge colors** — Update all `.status-badge-*` variants:

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

## Verification

Run `npm run build` — must compile with no errors.

## Commit

`git add app/globals.css && git commit -m "feat: clean cards, remove accent bars, update badges/buttons to purple"`
