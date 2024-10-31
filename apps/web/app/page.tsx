

'use client'

import { useState } from 'react'
import { RateLimitIndicator, RateLimitError } from '@your-org/ui'
import { createApiFetcher } from '@your-org/api'

const api = createApiFetcher(process.env.NEXT_PUBLIC_API_URL || '')

interface HelloResponse {
  message: string
  timestamp: string
}

export default function HomePage() {
  const [response, setResponse] = useState<HelloResponse | null>(null)
  const [error, setError] = useState<any>(null)
  const [rateLimit, setRateLimit] = useState({
    remaining: 5,
    total: 5,
    reset: Date.now() / 1000 + 60,
  })

  const fetchData = async () => {
    const result = await api<HelloResponse>('/api/hello')

    if (result.error) {
      setError(result.error)
      setResponse(null)
    } else {
      setResponse(result.data || null)
      setError(null)
    }

    setRateLimit({
      remaining: result.remaining,
      total: 5,
      reset: result.reset,
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Rate Limited API Example</h1>
      
      <div className="space-y-6">
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Make API Request
        </button>

        <RateLimitIndicator {...rateLimit} />

        {error && <RateLimitError error={error} />}

        {response && (
          <div className="bg-white p-4 rounded shadow">
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}