import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import SummaryCard from '../components/dashboard/SummaryCard';
import SpendingPieChart from '../components/charts/SpendingPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import ExpenseTrendChart from '../components/charts/ExpenseTrendChart';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';
import {
  useSummary,
  useCategorySpending,
  useMonthlySpending,
  useSpendingTrend,
  useRecentTransactions,
} from '../hooks/useAnalytics';

/**
 * Dashboard page — summary cards + charts + recent transactions.
 */
export default function Dashboard() {
  const { data: summary, isLoading: summaryLoading } = useSummary();
  const { data: categorySpending, isLoading: categoryLoading } = useCategorySpending();
  const { data: monthlySpending, isLoading: monthlyLoading } = useMonthlySpending();
  const { data: trendData, isLoading: trendLoading } = useSpendingTrend();
  const { data: recentTxns, isLoading: recentLoading } = useRecentTransactions();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-50">Dashboard</h1>
        <p className="text-dark-400 mt-1">Overview of your financial activity</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="skeleton h-32 rounded-2xl" />
          ))
        ) : (
          <>
            <SummaryCard
              label="Total Income"
              value={summary?.income || 0}
              icon={TrendingUp}
              variant="income"
            />
            <SummaryCard
              label="Total Expenses"
              value={summary?.expense || 0}
              icon={TrendingDown}
              variant="expense"
            />
            <SummaryCard
              label="Balance"
              value={summary?.balance || 0}
              icon={Wallet}
              variant="balance"
            />
            <SummaryCard
              label="Savings Rate"
              value={summary?.savingsRate || 0}
              icon={PiggyBank}
              variant="savings"
              isCurrency={false}
            />
          </>
        )}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Spending by Category</h2>
          {categoryLoading ? (
            <div className="skeleton h-64 rounded-xl" />
          ) : (
            <SpendingPieChart data={categorySpending || []} />
          )}
        </div>

        {/* Bar chart */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Monthly Overview</h2>
          {monthlyLoading ? (
            <div className="skeleton h-64 rounded-xl" />
          ) : (
            <MonthlyBarChart data={monthlySpending || []} />
          )}
        </div>
      </div>

      {/* Trend chart */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Expense Trend (Last 30 Days)</h2>
        {trendLoading ? (
          <div className="skeleton h-64 rounded-xl" />
        ) : (
          <ExpenseTrendChart data={trendData || []} />
        )}
      </div>

      {/* Recent transactions */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Recent Transactions</h2>
        {recentLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton h-14 rounded-xl" />
            ))}
          </div>
        ) : !recentTxns?.length ? (
          <p className="text-dark-500 text-sm py-8 text-center">No transactions yet</p>
        ) : (
          <div className="divide-y divide-dark-700/50">
            {recentTxns.map((txn) => (
              <div key={txn._id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${txn.categoryId?.color || '#6366f1'}20` }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: txn.categoryId?.color || '#6366f1' }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-dark-100 truncate">{txn.title}</p>
                  <p className="text-xs text-dark-500">
                    {txn.categoryId?.name || 'Uncategorized'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-semibold ${
                    txn.type === 'income' ? 'text-success-400' : 'text-danger-400'
                  }`}>
                    {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </p>
                  <p className="text-xs text-dark-500">{formatDate(txn.date)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
