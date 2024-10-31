import React from 'react'
import type { RateLimitError } from '@your-org/api'

interface RateLimitErrorProps {
  error: RateLimitError
}

export const RateLimitError: React.FC<RateLimitErrorProps> = ({ error }) => {
  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Rate limit exceeded</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error.error}</p>
            <p className="mt-1">
              Please try again after {new Date(error.reset * 1000).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}