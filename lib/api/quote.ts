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

function isAddress(v: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(v)
}

function isPositiveNumber(v: string): boolean {
  const n = parseFloat(v)
  return !isNaN(n) && n > 0 && isFinite(n)
}

export function getQuote(params: {
  chain_id: number
  token_in: string
  token_out: string
  amount_in: string
  slippage_bps: number
}): Promise<QuoteResponse> {
  if (!isAddress(params.token_in)) {
    return Promise.reject(new Error('Invalid token_in address'))
  }
  if (!isAddress(params.token_out)) {
    return Promise.reject(new Error('Invalid token_out address'))
  }
  if (!isPositiveNumber(params.amount_in)) {
    return Promise.reject(new Error('amount_in must be a positive number'))
  }
  const searchParams = new URLSearchParams({
    chain_id: String(params.chain_id),
    token_in: params.token_in,
    token_out: params.token_out,
    amount_in: params.amount_in,
    slippage_bps: String(params.slippage_bps),
  })
  return backendRequest<QuoteResponse>(`/v1/quote?${searchParams.toString()}`)
}
