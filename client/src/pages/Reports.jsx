import SpendingPieChart from '../components/charts/SpendingPieChart';
import MonthlyBarChart from '../components/charts/MonthlyBarChart';
import ExpenseTrendChart from '../components/charts/ExpenseTrendChart';
import {
  useCategorySpending,
  useMonthlySpending,
  useSpendingTrend,
  useSummary,
} from '../hooks/useAnalytics';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * Reports page — extended analytics views.
 */
export default function Reports() {
  const { data: summary, isLoading: summaryLoading } = useSummary();
  const { data: categorySpending, isLoading: catLoading } = useCategorySpending();
  const { data: monthlySpending, isLoading: monthLoading } = useMonthlySpending();
  const { data: trendData, isLoading: trendLoading } = useSpendingTrend();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-50">Reports</h1>
        <p className="text-dark-400 mt-1">Detailed financial analytics</p>
      </div>

      {/* Summary stats row */}
      {!summaryLoading && summary && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Financial Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-dark-400">Total Income</p>
              <p className="text-xl font-bold text-success-400">{formatCurrency(summary.income)}</p>
            </div>
            <div>
              <p className="text-sm text-dark-400">Total Expenses</p>
              <p className="text-xl font-bold text-danger-400">{formatCurrency(summary.expense)}</p>
            </div>
            <div>
              <p className="text-sm text-dark-400">Net Balance</p>
              <p className={`text-xl font-bold ${summary.balance >= 0 ? 'text-primary-400' : 'text-danger-400'}`}>
                {formatCurrency(summary.balance)}
              </p>
            </div>
            <div>
              <p className="text-sm text-dark-400">Savings Rate</p>
              <p className="text-xl font-bold text-accent-400">{summary.savingsRate}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Category breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Spending by Category</h2>
          {catLoading ? (
            <div className="skeleton h-64 rounded-xl" />
          ) : (
            <SpendingPieChart data={categorySpending || []} />
          )}
        </div>

        {/* Category table */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-dark-100 mb-4">Category Breakdown</h2>
          {catLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton h-10 rounded-lg" />
              ))}
            </div>
          ) : !categorySpending?.length ? (
            <p className="text-dark-500 text-sm text-center py-8">No expense data</p>
          ) : (
            <div className="space-y-3">
              {categorySpending.map((cat) => {
                const total = categorySpending.reduce((s, c) => s + c.total, 0);
                const pct = total > 0 ? ((cat.total / total) * 100).toFixed(1) : 0;
                return (
                  <div key={cat.categoryId} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm text-dark-200 flex-1">{cat.name}</span>
                    <span className="text-sm font-medium text-dark-300">
                      {formatCurrency(cat.total)}
                    </span>
                    <span className="text-xs text-dark-500 w-12 text-right">{pct}%</span>
                    <div className="w-24 h-2 bg-dark-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: cat.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Monthly comparison */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">Monthly Income vs Expenses</h2>
        {monthLoading ? (
          <div className="skeleton h-64 rounded-xl" />
        ) : (
          <MonthlyBarChart data={monthlySpending || []} />
        )}
      </div>

      {/* Trend */}
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-dark-100 mb-4">30-Day Expense Trend</h2>
        {trendLoading ? (
          <div className="skeleton h-64 rounded-xl" />
        ) : (
          <ExpenseTrendChart data={trendData || []} />
        )}
      </div>
    </div>
  );
}
