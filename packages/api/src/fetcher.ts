
  
import type { RateLimitHeaders, ApiResponse } from './types'
  
export const createApiFetcher = (baseUrl: string) => {
  return async <T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      })

      const data = await response.json()

      if (response.status === 429) {
        return {
          error: data,
          remaining: 0,
          reset: data.reset,
        }
      }

      const remaining = response.headers.get('X-RateLimit-Remaining')
      const reset = response.headers.get('X-RateLimit-Reset')

      return {
        data,
        remaining: remaining ? parseInt(remaining) : 0,
        reset: reset ? parseInt(reset) : 0,
      }
    } catch (error) {
      return {
        error: {
          error: 'An error occurred',
          remaining: 0,
          reset: 0,
        },
        remaining: 0,
        reset: 0,
      }
    }
  }
}