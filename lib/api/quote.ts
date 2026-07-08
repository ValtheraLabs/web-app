import { backendRequest } from './client'

export type QuoteResponse = {
  provider: string
  chain_id: number
  token_in: string
  token_out: string
  amount_in: string
  amount_out: string
  estimated_gas: number
  price_impact: string
  slippage_bps: number
  route: string[]
  timestamp: string
  warnings: string[]
  is_mock: boolean
  to: string
  data: string
  value: string
}

export type QuoteError = {
  error: string
  detail?: string
}

export function getQuote(params: {
  chain_id: number
  token_in: string
  token_out: string
  amount_in: string
  slippage_bps: number
}): Promise<QuoteResponse> {
  const searchParams = new URLSearchParams({
    chain_id: String(params.chain_id),
    token_in: params.token_in,
    token_out: params.token_out,
    amount_in: params.amount_in,
    slippage_bps: String(params.slippage_bps),
  })
  return backendRequest<QuoteResponse>(`/v1/quote?${searchParams.toString()}`)
}
