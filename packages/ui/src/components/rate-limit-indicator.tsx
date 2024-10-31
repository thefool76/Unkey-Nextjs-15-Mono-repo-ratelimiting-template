
interface RateLimitIndicatorProps {
  remaining: number
  total: number
  reset: number
}

export const RateLimitIndicator: React.FC<RateLimitIndicatorProps> = ({
  remaining,
  total,
  reset,
}) => {
  const getResetTime = () => {
    const date = new Date(reset * 1000)
    return date.toLocaleTimeString()
  }

  return (
    <div className="flex flex-col space-y-2 text-sm text-gray-600">
      <div className="flex items-center space-x-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(remaining / total) * 100}%` }}
          />
        </div>
        <span>{remaining}/{total} requests remaining</span>
      </div>
      <p className="text-xs">Resets at: {getResetTime()}</p>
    </div>
  )
}
