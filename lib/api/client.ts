const DEFAULT_BACKEND_API_URL = 'http://localhost:8000'

export const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || DEFAULT_BACKEND_API_URL

export type ApiErrorBody = {
  error?: string
  message?: string
}

export class ApiRequestError extends Error {
  status: number
  body: ApiErrorBody | null

  constructor(status: number, body: ApiErrorBody | null) {
    super(body?.message || `Backend request failed with status ${status}`)
    this.name = 'ApiRequestError'
    this.status = status
    this.body = body
  }
}

function buildUrl(path: string): string {
  return `${BACKEND_API_URL.replace(/\/$/, '')}${path}`
}

async function readErrorBody(response: Response): Promise<ApiErrorBody | null> {
  try {
    return (await response.json()) as ApiErrorBody
  } catch {
    return null
  }
}

export async function backendRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(buildUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    }
  })

  if (!response.ok) {
    throw new ApiRequestError(response.status, await readErrorBody(response))
  }

  return response.json() as Promise<T>
}
