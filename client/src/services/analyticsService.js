import api from './api';

export async function getSummary() {
  const { data } = await api.get('/api/analytics/summary');
  return data;
}

export async function getCategorySpending() {
  const { data } = await api.get('/api/analytics/category-spending');
  return data;
}

export async function getMonthlySpending() {
  const { data } = await api.get('/api/analytics/monthly-spending');
  return data;
}

export async function getSpendingTrend() {
  const { data } = await api.get('/api/analytics/spending-trend');
  return data;
}

export async function getRecentTransactions() {
  const { data } = await api.get('/api/analytics/recent-transactions');
  return data;
}
