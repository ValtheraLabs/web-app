import { backendRequest } from './client'

export type PortfolioAsset = {
  chain_id: number
  token_address: string
  symbol: string
  name: string
  balance: string
  value_usd: number
  allocation_percent: number
  risk_flags: string[]
}

export type PortfolioResponse = {
  wallet_address: string
  chain_id: number
  total_value_usd: number
  assets: PortfolioAsset[]
  allocation_percent: number
  risk_flags: string[]
  updated_at: string
  is_mock: boolean
}

export function getPortfolio(address: string): Promise<PortfolioResponse> {
  return backendRequest<PortfolioResponse>(
    `/v1/portfolio/${encodeURIComponent(address)}`
  )
}
