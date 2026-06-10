import Transaction from '../models/Transaction.js';
import { getDateRangeFilter } from '../utils/aggregationHelpers.js';

/**
 * Total income, total expense, balance, savings rate.
 */
export async function getSummaryData(userId) {
  const result = await Transaction.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' },
      },
    },
  ]);

  const income = result.find((r) => r._id === 'income')?.total || 0;
  const expense = result.find((r) => r._id === 'expense')?.total || 0;
  const balance = income - expense;
  const savingsRate = income > 0 ? Math.round(((income - expense) / income) * 100) : 0;

  return { income, expense, balance, savingsRate };
}

/**
 * Spending grouped by category (pie chart data).
 */
export async function getCategorySpendingData(userId) {
  const data = await Transaction.aggregate([
    { $match: { userId, type: 'expense' } },
    {
      $group: {
        _id: '$categoryId',
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: '_id',
        foreignField: '_id',
        as: 'category',
      },
    },
    { $unwind: '$category' },
    {
      $project: {
        _id: 0,
        categoryId: '$_id',
        name: '$category.name',
        color: '$category.color',
        icon: '$category.icon',
        total: 1,
        count: 1,
      },
    },
    { $sort: { total: -1 } },
  ]);

  return data;
}

/**
 * Income vs expense per month for last 6 months (bar chart data).
 */
export async function getMonthlySpendingData(userId) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const data = await Transaction.aggregate([
    {
      $match: {
        userId,
        date: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type',
        },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  // Transform into { month: 'Jan 2024', income: X, expense: Y }
  const monthMap = {};
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  data.forEach((item) => {
    const key = `${monthNames[item._id.month - 1]} ${item._id.year}`;
    if (!monthMap[key]) {
      monthMap[key] = { month: key, income: 0, expense: 0 };
    }
    monthMap[key][item._id.type] = item.total;
  });

  // Ensure we return all 6 months even if empty
  const result = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    result.push(monthMap[key] || { month: key, income: 0, expense: 0 });
  }

  return result;
}

/**
 * Daily expense data over the last 30 days (line chart data).
 */
export async function getSpendingTrendData(userId) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const data = await Transaction.aggregate([
    {
      $match: {
        userId,
        type: 'expense',
        date: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          day: { $dayOfMonth: '$date' },
        },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
  ]);

  // Fill in all 30 days with zeros where no data
  const result = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dayData = data.find(
      (item) =>
        item._id.year === d.getFullYear() &&
        item._id.month === d.getMonth() + 1 &&
        item._id.day === d.getDate()
    );
    result.push({
      date: d.toISOString().split('T')[0], // YYYY-MM-DD
      amount: dayData?.total || 0,
    });
  }

  return result;
}

/**
 * Last 5 transactions with category info.
 */
export async function getRecentTransactionsData(userId) {
  return Transaction.find({ userId })
    .populate('categoryId', 'name color icon')
    .sort({ date: -1 })
    .limit(5);
}
