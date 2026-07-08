export type AppRoute = {
  href: string
  label: string
  eyebrow: string
  description: string
}

export const primaryAppRoutes: AppRoute[] = [
  {
    href: '/app',
    label: 'Overview',
    eyebrow: 'Command',
    description: 'Portfolio, AI, quote, and risk command center.'
  },
  {
    href: '/app/portfolio',
    label: 'Portfolio',
    eyebrow: 'Wallet',
    description: 'Wallet intelligence, allocations, and risk flags.'
  },
  {
    href: '/app/swap',
    label: 'Swap',
    eyebrow: 'Trade',
    description: 'Real-time quotes with wallet execution.'
  },
  {
    href: '/app/research',
    label: 'Research',
    eyebrow: 'Market',
    description: 'Token research and data-source readiness.'
  },
  {
    href: '/app/ai',
    label: 'AI Copilot',
    eyebrow: 'Intelligence',
    description: 'AI portfolio analysis and recommendations.'
  },
  {
    href: '/app/risk',
    label: 'Risk',
    eyebrow: 'Safety',
    description: 'Exposure, warnings, and execution safeguards.'
  },
  {
    href: '/app/activity',
    label: 'Activity',
    eyebrow: 'Timeline',
    description: 'Preview activity and wallet event shell.'
  },
  {
    href: '/app/settings',
    label: 'Settings',
    eyebrow: 'Controls',
    description: 'Network, privacy, and interface controls.'
  }
]

export const appRoutes = primaryAppRoutes

export function getRouteByHref(href: string): AppRoute | undefined {
  return appRoutes.find((route) => route.href === href)
}
