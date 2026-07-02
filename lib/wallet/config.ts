import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { http } from 'wagmi'
import { supportedChains } from './chains'

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'valthera-dev-project-id'

export const wagmiConfig = getDefaultConfig({
  appName: 'Valthera',
  projectId,
  chains: supportedChains,
  ssr: true,
  transports: Object.fromEntries(supportedChains.map((chain) => [chain.id, http()]))
})
