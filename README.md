# Valthera Web App

The Valthera web app is the primary user-facing dApp for the ValtheraLabs ecosystem.

## Purpose

Provide a secure, AI-native DeFi interface for wallet connection, asset exchange, portfolio intelligence, token research, and risk-aware user workflows.

## MVP Responsibilities

- Wallet connection
- Network selection
- Asset terminal interface
- Portfolio dashboard
- AI copilot UI
- Token research panels
- Risk score display
- Clear user confirmation flows for future transactions

## Stack

- Next.js
- TypeScript
- CSS / Tailwind-ready configuration
- Wagmi
- Viem
- RainbowKit
- TanStack Query

## Local Development

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Set a real WalletConnect project ID in `.env.local`:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000
```

Run the local development server:

```bash
npm run dev
```

For the full local stack, start each service in order in separate terminals:

1. Run `ai-engine` on `8001`.

```bash
cd ../ai-engine
uvicorn app.main:app --reload --port 8001
```

2. Run `backend-api` on `8000`.

```powershell
cd ../backend-api
$env:AI_ENGINE_BASE_URL='http://localhost:8001'
uvicorn app.main:app --reload --port 8000
```

3. Run `web-app` on `3000`.

```powershell
cd ../web-app
$env:NEXT_PUBLIC_BACKEND_API_URL='http://localhost:8000'
npm run dev -- --port 3000
```

Type-check the project:

```bash
npm run typecheck
```

Build for production:

```bash
npm run build
```

## Current Scope

MVP-001 added the first runnable application shell.

MVP-002 adds wallet connection UX, provider setup, a wallet status page, and basic chain/address display.

MVP Swap Terminal adds a UI-only `/app/swap` terminal with token input and output panels, route preview placeholders, slippage and price impact placeholders, network and wallet display state, AI context, risk warnings, and portfolio impact copy.

## Security Notes

The app does not contain private keys, backend secrets, contract write flows, swap execution, or production transaction logic. The swap terminal is UI-only and does not prepare, sign, submit, or simulate transactions.

## Backend Connection

The portfolio and AI app pages call `backend-api` through `NEXT_PUBLIC_BACKEND_API_URL`. Run the backend locally on `http://localhost:8000` and allow the web app origin through backend CORS. Frontend API calls are isolated under `lib/api`.
