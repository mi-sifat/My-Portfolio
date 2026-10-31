interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const tracker = new Map<string, RateLimitRecord>();

/**
 * In-memory token bucket rate limiter
 * @param key unique identifier (e.g. IP address or client id)
 * @param limit maximum allowed requests within window
 * @param windowMs time window in milliseconds
 */
export function isRateLimited(key: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = tracker.get(key);

  if (!record || now > record.resetTime) {
    tracker.set(key, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count += 1;
  return false;
}

