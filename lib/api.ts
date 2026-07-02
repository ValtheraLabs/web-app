const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://127.0.0.1:8000'

export type PortfolioAsset = {
  symbol: string
  name: string
  value_usd: number
  allocation_percent: number
  risk_flags: string[]
}

export type PortfolioResponse = {
  wallet_address: string
  chain_id: number
  total_value_usd: number
  assets: PortfolioAsset[]
  risk_flags: string[]
  is_mock: boolean
}

export type RiskFactor = {
  name: string
  severity: string
  explanation: string
}

export type RecommendedAction = {
  label: string
  rationale: string
  priority: string
}

export type PortfolioAnalysisResponse = {
  address: string
  chain_id: number
  overall_summary: string
  risk_score: number | null
  confidence: string | null
  risk_factors: RiskFactor[]
  recommended_actions: RecommendedAction[]
  disclaimer: string | null
  is_mock: boolean
  source: string
}

export type TokenAnalysisResponse = {
  token_address: string
  chain_id: number
  symbol: string | null
  summary: string
  risk_level: string
  risk_score: number | null
  confidence: string | null
  risk_factors: RiskFactor[]
  recommended_actions: RecommendedAction[]
  disclaimer: string | null
  is_mock: boolean
  source: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BACKEND_API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    }
  })

  if (!response.ok) {
    throw new Error(`Backend request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function getPortfolio(address: string): Promise<PortfolioResponse> {
  return request<PortfolioResponse>(`/v1/portfolio/${address}`)
}

export function analyzePortfolio(address: string): Promise<PortfolioAnalysisResponse> {
  return request<PortfolioAnalysisResponse>('/v1/ai/analyze-portfolio', {
    method: 'POST',
    body: JSON.stringify({ address, chain_id: 1 })
  })
}

export function analyzeToken(symbol: string, tokenAddress: string): Promise<TokenAnalysisResponse> {
  return request<TokenAnalysisResponse>('/v1/ai/analyze-token', {
    method: 'POST',
    body: JSON.stringify({ token_address: tokenAddress, chain_id: 1, symbol })
  })
}
