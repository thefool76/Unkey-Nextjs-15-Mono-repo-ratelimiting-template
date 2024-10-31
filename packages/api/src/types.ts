export interface RateLimitHeaders {
  "X-RateLimit-Limit": string;
  "X-RateLimit-Remaining": string;
  "X-RateLimit-Reset": string;
}

export interface RateLimitError {
  error: string;
  remaining: number;
  reset: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: RateLimitError;
  remaining: number;
  reset: number;
}
