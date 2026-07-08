# Kromatika-Inspired Visual Redesign

## Summary

Redesign Valthera web-app visual layer to adopt Kromatika Finance's dark DeFi aesthetic while keeping Valthera's premium identity. Swap gold/teal institutional palette for purple/cyan fusion. Restyle all components: colors, cards, panels, nav, and swap terminal.

## Scope

Full visual redesign. No new features, no wire-up changes, no backend work. Everything is CSS + component props.

## Color Palette

| Token | Old | New | Source |
|-------|-----|-----|--------|
| `--bg` | `#05070a` | `#131316` | Kromatika near-black |
| `--panel` | `#0b1018` | `#1A1A1E` | Kromatika bg1 |
| `--panel-soft` | `#111a25` | `#242429` | Kromatika bg2 |
| `--panel-strong` | `#172230` | `#2E2E35` | Kromatika bg3 lighter |
| `--border` | `#223044` | `#373742` | Subtle border |
| `--border-strong` | `#38506e` | `#4A4A57` | Strong border |
| `--accent` | `#d6a84f` gold | `#945DC8` **purple** | Kromatika primary |
| `--accent-soft` | `rgba(214,168,79,0.14)` | `rgba(148,93,200,0.15)` | Purple glow |
| `--cyan` | `#60d6e7` | keep `#60d6e7` | Valthera identity |
| `--success` | `#66d19e` | `#27AE60` | Kromatika green |
| `--danger` | `#ef6b73` | `#FF4343` | Kromatika red |
| `--text` | `#eef4f8` | `#FFFFFF` | Kromatika white |
| `--muted` | `#94a3b8` | `#C3C5CB` | Kromatika text2 |
| `--faint` | `#637083` | `#8F96AC` | Kromatika text3 |
| `--radius` | `1.25rem` | `1rem` | Tighter radius |

## Navigation

- Keep left sidebar layout (17.5rem + 1fr grid)
- Sidebar bg: gradient → solid `--panel`
- Active nav item: gold left border → purple left border
- Hover: cyan tint → subtle purple tint
- Mobile nav: same logic, purple active
- Header: keep sticky + blur bg, replace gold status badge styling with purple

## Cards & Panels

- Remove 3px left accent bar (`::before` pseudo-element on `.panel`, `.metric-card`, `.data-state`)
- Clean bordered containers (Kromatika-style)
- Eyebrow text: gold → purple
- Buttons: gold gradient → solid purple bg
- Status badges: update to match new palette

## Swap Terminal

- Change from 2-column (swap + side panel) to centered single-column card
- Kromatika-style token input panels with selectors
- Arrow button between token inputs
- Slippage selector pills
- Route preview section
- CTA button (solid purple)
- Side panels (AI context, risk) can remain below in secondary layout

## Files to Modify

- `app/globals.css` — all CSS variables, card/panel/nav styles, swap styles
- `components/ui/*.tsx` — update className usage if needed
- `components/swap/SwapTerminal.tsx` — restructure layout
- `components/swap/TokenInput.tsx` — Kromatika-style token panel
- `components/swap/RoutePreview.tsx` — visual update
- `components/Layout.tsx` — nav active styling (if class-based)
- `components/ui/StatusBadge.tsx` — tone colors
- `pages/app/swap.tsx` — if layout changes needed

## Non-Goals

- No feature additions
- No backend changes
- No new pages
- No business logic changes
- No removal of existing pages

## Security

No token keys, wallet operations, or execution paths touched. Visual only.
