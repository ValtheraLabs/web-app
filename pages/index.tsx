import { FeatureCard } from '@/components/FeatureCard'
import { Layout } from '@/components/Layout'
import Link from 'next/link'

export default function HomePage() {
  return (
    <Layout>
      <section className="hero">
        <div className="card">
          <div className="eyebrow">Genesis MVP</div>
          <h1>AI-native DeFi operating system.</h1>
          <p>
            Valthera combines swaps, portfolio intelligence, token research, wallet analysis,
            and risk-aware execution into one professional DeFi terminal.
          </p>
          <div className="button-row">
            <Link className="button" href="/app">Launch App</Link>
            <Link className="button secondary" href="/app/ai">Explore AI</Link>
          </div>
        </div>
        <div className="card">
          <div className="eyebrow">Valthera AI</div>
          <h2>Decision support before execution.</h2>
          <p>
            The first MVP focuses on explainable analysis. AI can help users understand route,
            risk, portfolio impact, and token context before signing any transaction.
          </p>
        </div>
      </section>
      <section className="grid">
        <FeatureCard title="Swap Terminal" description="A modern trading interface inspired by proven DEX flows and rebuilt for Valthera." />
        <FeatureCard title="Portfolio Intelligence" description="Wallet-level visibility into allocation, exposure, and risk signals." />
        <FeatureCard title="Token Research" description="Structured context for liquidity, contract signals, volatility, and uncertainty." />
      </section>
    </Layout>
  )
}
