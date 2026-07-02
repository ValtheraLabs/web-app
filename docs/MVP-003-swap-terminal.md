# MVP Swap Terminal UI

## Summary

Adds the first reusable swap terminal interface for `/app/swap`.

## Included

- Token input panel
- Token output panel
- Amount input
- Token selector placeholder
- Slippage settings placeholder
- Route preview placeholder
- Price impact placeholder
- Network status
- Wallet connection state
- AI context side panel
- Risk warning panel
- Portfolio impact placeholder

## Safety Scope

This milestone is UI-only. It does not add real swaps, contract writes, private key handling, paid provider keys, production token addresses, transaction preparation, signing, simulation, or submission.

## Components

- `components/swap/SwapTerminal.tsx`
- `components/swap/TokenInput.tsx`
- `components/swap/RoutePreview.tsx`
- `components/swap/RiskPanel.tsx`
- `components/swap/AiTradeContext.tsx`
