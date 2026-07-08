import Link from 'next/link'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'

import { primaryAppRoutes } from '@/lib/routes'
import { WalletConnectButton } from './wallet/WalletConnectButton'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter()

  const navigation = primaryAppRoutes.map((item) => ({
    ...item,
    isActive: router.pathname === item.href || router.asPath === item.href
  }))

  return (
    <div className="shell">
      <header className="header">
        <div className="header-main">
          <Link href="/" className="brand" aria-label="Valthera home">
            <span className="brand-mark" />
            <span className="brand-copy">
              <span>Valthera</span>
              <small>Institutional command center</small>
            </span>
          </Link>
          <div className="header-status" aria-label="Application status">
            <span className="status-dot" aria-hidden="true" />
            <span>Preview safe</span>
          </div>
        </div>
        <div className="wallet-slot">
          <WalletConnectButton />
        </div>
      </header>
      <div className="shell-grid">
        <aside className="command-rail" aria-label="Primary command navigation">
          <div className="rail-label">Desk modules</div>
          <nav className="nav nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-item"
                aria-current={item.isActive ? 'page' : undefined}
              >
                <span>{item.eyebrow}</span>
                <strong>{item.label}</strong>
              </Link>
            ))}
          </nav>
        </aside>
        <nav className="nav nav-mobile" aria-label="Primary command navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-item"
              aria-current={item.isActive ? 'page' : undefined}
            >
              <span>{item.eyebrow}</span>
              <strong>{item.label}</strong>
            </Link>
          ))}
        </nav>
        <main className="main">{children}</main>
      </div>
    </div>
  )
}
