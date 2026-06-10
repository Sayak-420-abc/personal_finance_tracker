import {
  getSummaryData,
  getCategorySpendingData,
  getMonthlySpendingData,
  getSpendingTrendData,
  getRecentTransactionsData,
} from '../services/analyticsService.js';

/**
 * GET /api/analytics/summary
 * Returns total income, total expense, balance, savings rate.
 */
export async function getSummary(req, res, next) {
  try {
    const data = await getSummaryData(req.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/analytics/category-spending
 * Returns spending grouped by category for pie chart.
 */
export async function getCategorySpending(req, res, next) {
  try {
    const data = await getCategorySpendingData(req.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/analytics/monthly-spending
 * Returns income vs expense per month for last 6 months (bar chart).
 */
export async function getMonthlySpending(req, res, next) {
  try {
    const data = await getMonthlySpendingData(req.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/analytics/spending-trend
 * Returns daily expense data over the last 30 days (line chart).
 */
export async function getSpendingTrend(req, res, next) {
  try {
    const data = await getSpendingTrendData(req.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/analytics/recent-transactions
 * Returns the last 5 transactions with category populated.
 */
export async function getRecentTransactions(req, res, next) {
  try {
    const data = await getRecentTransactionsData(req.userId);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
