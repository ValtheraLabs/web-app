import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'

export const supportedChains = [mainnet, sepolia, arbitrum, optimism, polygon, base] as const

export const defaultChain = mainnet
