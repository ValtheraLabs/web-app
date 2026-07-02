import Link from 'next/link'
import { WalletConnectButton } from './wallet/WalletConnectButton'

type LayoutProps = {
  children: JSX.Element | JSX.Element[]
}

const navigation = [
  { href: '/app', label: 'Dashboard' },
  { href: '/app/swap', label: 'Swap' },
  { href: '/app/portfolio', label: 'Portfolio' },
  { href: '/app/research', label: 'Research' },
  { href: '/app/ai', label: 'AI' },
  { href: '/app/settings', label: 'Settings' }
]

export function Layout({ children }: LayoutProps) {
  return (
    <div className="shell">
      <header className="header">
        <Link href="/" className="brand">
          <span className="brand-mark" />
          <span>Valthera</span>
        </Link>
        <nav className="nav">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <WalletConnectButton />
      </header>
      <main className="main">{children}</main>
    </div>
  )
}
