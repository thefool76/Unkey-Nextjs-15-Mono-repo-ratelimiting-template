import { withRateLimit } from '@your-org/utils'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// eslint-disable-next-line no-unused-vars
const handler = async (req: NextRequest) => {
  return NextResponse.json({
    message: 'Hello World',
    timestamp: new Date().toISOString(),
  })
}

export const GET = withRateLimit(handler, {
  namespace: 'api.hello',
  limit: 5,
  duration: '1m',
})