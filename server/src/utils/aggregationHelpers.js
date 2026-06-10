/**
 * Helper to create a date range filter for MongoDB queries.
 * @param {number} daysBack - Number of days back from today
 * @returns {{ $gte: Date }} - MongoDB date filter
 */
export function getDateRangeFilter(daysBack) {
  const date = new Date();
  date.setDate(date.getDate() - daysBack);
  date.setHours(0, 0, 0, 0);
  return { $gte: date };
}

/**
 * Build a user-scoped match stage.
 * @param {string} userId - Clerk user ID
 * @param {object} extra - Additional match conditions
 * @returns {object} - MongoDB $match stage
 */
export function userMatch(userId, extra = {}) {
  return { $match: { userId, ...extra } };
}
