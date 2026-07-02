import { backendRequest } from './client'

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

export type PortfolioInsight = {
  category: string
  summary: string
  severity: string
}

export type AnalyzePortfolioRequest = {
  address: string
  chain_id?: number
  risk_profile?: string | null
}

export type PortfolioAnalysisResponse = {
  address: string
  chain_id: number
  overall_summary: string
  insights: PortfolioInsight[]
  analysis_id: string | null
  risk_score: number | null
  confidence: string | null
  risk_factors: RiskFactor[]
  recommended_actions: RecommendedAction[]
  disclaimer: string | null
  is_mock: boolean
  source: string
}

export type AnalyzeTokenRequest = {
  token_address: string
  chain_id?: number
  symbol?: string | null
}

export type TokenAnalysisResponse = {
  token_address: string
  chain_id: number
  symbol: string | null
  summary: string
  risk_level: string
  analysis_id: string | null
  risk_score: number | null
  confidence: string | null
  risk_factors: RiskFactor[]
  recommended_actions: RecommendedAction[]
  disclaimer: string | null
  is_mock: boolean
  source: string
}

export function analyzePortfolio(
  payload: AnalyzePortfolioRequest
): Promise<PortfolioAnalysisResponse> {
  return backendRequest<PortfolioAnalysisResponse>('/v1/ai/analyze-portfolio', {
    method: 'POST',
    body: JSON.stringify({
      chain_id: 1,
      ...payload
    })
  })
}

export function analyzeToken(
  payload: AnalyzeTokenRequest
): Promise<TokenAnalysisResponse> {
  return backendRequest<TokenAnalysisResponse>('/v1/ai/analyze-token', {
    method: 'POST',
    body: JSON.stringify({
      chain_id: 1,
      ...payload
    })
  })
}
