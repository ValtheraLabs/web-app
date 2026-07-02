# MVP-002 Wallet Connection

## Summary

Adds the first wallet connection UX layer for the Valthera web app.

## Included

- Wagmi dependency
- Viem dependency
- RainbowKit dependency
- TanStack Query dependency
- Supported chain configuration
- Wallet provider setup
- Connect button in the header
- Wallet status card
- Wallet status page

## Route

- `/app/wallet`

## Safety Scope

This milestone does not add transaction creation, asset transfers, contract writes, private key handling, or backend-connected portfolio reads.

## Required Environment

Create a WalletConnect project ID and set:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

For local development, the fallback development ID is only a placeholder.
