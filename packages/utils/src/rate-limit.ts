// packages/utils/src/rate-limit.ts

import { Ratelimit } from '@unkey/ratelimit'

export interface RateLimitConfig {
  namespace: string
  limit: number
  duration: string
}

export class RateLimiter {
  private limiter: Ratelimit

  constructor(config: RateLimitConfig) {
    if (!process.env.UNKEY_API_KEY) {
      throw new Error('UNKEY_API_KEY is not set')
    }

    this.limiter = new Ratelimit({
      rootKey: process.env.UNKEY_API_KEY,
      namespace: config.namespace,
      limit: config.limit,
      duration: config.duration,
      async: true,
    })
  }

  async limit(identifier: string) {
    return this.limiter.limit(identifier)
  }
}

export const createRateLimiter = (config: RateLimitConfig) => {
  return new RateLimiter(config)
}

// Rate limit middleware helper
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const withRateLimit = (
  handler: (req: NextRequest) => Promise<NextResponse>,
  config: RateLimitConfig
) => {
  const limiter = createRateLimiter(config)

  return async (req: NextRequest) => {
    const ip = req.headers.get('x-forwarded-for') ?? 'anonymous'
    const identifier = ip.startsWith('::ffff:') ? ip.slice(7) : ip

    const rateLimitResponse = await limiter.limit(identifier)

    if (!rateLimitResponse.success) {
      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          remaining: 0,
          reset: rateLimitResponse.reset,
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': config.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResponse.reset.toString(),
          },
        }
      )
    }

    const response = await handler(req)

    // Add rate limit headers to the response
    response.headers.set('X-RateLimit-Limit', config.limit.toString())
    response.headers.set('X-RateLimit-Remaining', rateLimitResponse.remaining.toString())
    response.headers.set('X-RateLimit-Reset', rateLimitResponse.reset.toString())

    return response
  }
}