# Web App Architecture

## Role

The web app is the primary interface between users, wallets, backend services, AI analysis, and smart contracts.

## Core UX Modules

```text
App Shell
├── Wallet Connection
├── Dashboard
├── Swap
├── Portfolio
├── Token Research
├── AI Copilot
└── Settings
```

## Key Principles

- Non-custodial wallet interactions only.
- User signs every transaction.
- AI suggestions must be explainable and non-authoritative.
- Transaction previews must be clear before wallet signing.
- Network, token, and contract addresses must be visible where relevant.

## Initial Page Structure

```text
/
/app
/app/swap
/app/portfolio
/app/research
/app/ai
/app/settings
```

## Data Flow

1. User connects wallet.
2. Web app reads wallet/network state.
3. Web app calls backend API for enriched portfolio and market data.
4. Web app calls AI endpoints through backend-api, not directly from client.
5. User reviews suggested action.
6. User signs transaction through wallet.

## Security Notes

- Never expose server secrets in frontend env variables.
- Validate token lists and contract addresses.
- Clearly mark risky or unknown assets.
- Display slippage, price impact, and route details before swaps.
