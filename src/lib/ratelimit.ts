// Simple in-memory rate limiter
// For production with multiple servers, consider using Redis or Upstash

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

class RateLimiter {
  private requests: Map<string, RateLimitEntry>;
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number = 3, windowMs: number = 60000) {
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;

    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  check(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      const resetTime = now + this.windowMs;
      this.requests.set(identifier, { count: 1, resetTime });
      return {
        allowed: true,
        remaining: this.maxRequests - 1,
        resetTime,
      };
    }

    if (entry.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      allowed: true,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime,
    };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.requests.entries()) {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    }
  }

  reset(identifier: string) {
    this.requests.delete(identifier);
  }
}

// Singleton instance
// Allows 3 requests per minute per IP
export const contactFormLimiter = new RateLimiter(3, 60 * 1000);

// Helper to get client IP from request
export function getClientIp(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback (won't work in production, but ok for development)
  return 'unknown';
}
