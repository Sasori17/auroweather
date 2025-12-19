/**
 * Rate Limiter for OpenWeatherMap API Calls
 *
 * Tracks API calls in localStorage to enforce a daily limit of 1000 calls.
 * Automatically resets at midnight local time.
 */

const STORAGE_KEY = 'weatherApiRateLimit';
const DAILY_LIMIT = 1000;

// Check if we're in a browser environment
const isClient = typeof window !== 'undefined';

interface RateLimitData {
  count: number;
  date: string; // YYYY-MM-DD format
  resetTime: number; // timestamp for next midnight
}

/**
 * Get current date in YYYY-MM-DD format (local time)
 */
function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Get timestamp for next midnight (local time)
 */
function getNextMidnight(): number {
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  return tomorrow.getTime();
}

/**
 * Initialize fresh rate limit data
 */
function initializeRateLimitData(): RateLimitData {
  const data: RateLimitData = {
    count: 0,
    date: getCurrentDate(),
    resetTime: getNextMidnight()
  };
  saveRateLimitData(data);
  return data;
}

/**
 * Load data from localStorage
 */
function loadRateLimitData(): RateLimitData {
  if (!isClient) {
    return { count: 0, date: getCurrentDate(), resetTime: getNextMidnight() };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initializeRateLimitData();
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading rate limit data:', error);
    return initializeRateLimitData();
  }
}

/**
 * Save data to localStorage
 */
function saveRateLimitData(data: RateLimitData): void {
  if (!isClient) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving rate limit data:', error);
  }
}

/**
 * Check if new day and reset if needed
 */
function resetIfNewDay(): RateLimitData {
  const data = loadRateLimitData();
  const currentDate = getCurrentDate();

  if (data.date !== currentDate) {
    // New day detected, reset counter
    return initializeRateLimitData();
  }

  return data;
}

/**
 * Check if we can make N API calls without exceeding the daily limit
 * @param callCount - Number of API calls to check (default: 1)
 * @returns true if under limit, false if would exceed limit
 */
export function checkRateLimit(callCount: number = 1): boolean {
  const data = resetIfNewDay();
  return (data.count + callCount) <= DAILY_LIMIT;
}

/**
 * Increment the API call count
 * @param count - Number of calls to add (default: 1)
 */
export function incrementCallCount(count: number = 1): void {
  const data = resetIfNewDay();
  data.count += count;
  saveRateLimitData(data);
}

/**
 * Get remaining API calls for today
 * @returns Number of calls remaining
 */
export function getRemainingCalls(): number {
  const data = resetIfNewDay();
  return Math.max(0, DAILY_LIMIT - data.count);
}

/**
 * Check if the daily limit is already reached
 * @returns true if limit reached, false otherwise
 */
export function isLimitReached(): boolean {
  const data = resetIfNewDay();
  return data.count >= DAILY_LIMIT;
}

/**
 * Get current call count for today
 * @returns Current number of API calls made today
 */
export function getCurrentCount(): number {
  const data = resetIfNewDay();
  return data.count;
}

// Debug utility - expose functions in browser console for testing
if (typeof window !== 'undefined') {
  (window as any).__weatherRateLimit__ = {
    getCount: getCurrentCount,
    getRemaining: getRemainingCalls,
    isReached: isLimitReached,
    reset: initializeRateLimitData
  };
}
