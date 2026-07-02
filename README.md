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
NEXT_PUBLIC_BACKEND_API_URL=http://127.0.0.1:8000
```

Run the local development server:

```bash
npm run dev
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

## Security Notes

The app does not contain private keys, backend secrets, contract write flows, or production transaction logic.

## Backend Connection

The portfolio, research, and AI app pages call `backend-api` through `NEXT_PUBLIC_BACKEND_API_URL`. Run the backend locally on `http://127.0.0.1:8000` and allow the web app origin through backend CORS.
