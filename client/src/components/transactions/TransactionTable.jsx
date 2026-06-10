import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';
import { Trash2, Edit2 } from 'lucide-react';

/**
 * Transaction table with sorting, pagination, and actions.
 */
export default function TransactionTable({
  transactions = [],
  pagination = {},
  onPageChange,
  onDelete,
  onEdit,
  isLoading,
}) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-dark-400 text-lg mb-2">No transactions found</p>
        <p className="text-dark-500 text-sm">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left px-6 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-dark-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-700/50">
              {transactions.map((txn) => (
                <tr
                  key={txn._id}
                  className="hover:bg-dark-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-dark-100">{txn.title}</p>
                      {txn.notes && (
                        <p className="text-xs text-dark-500 mt-0.5 truncate max-w-[200px]">
                          {txn.notes}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: txn.categoryId?.color || '#6366f1' }}
                      />
                      <span className="text-sm text-dark-300">
                        {txn.categoryId?.name || 'Uncategorized'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-semibold ${
                      txn.type === 'income' ? 'text-success-400' : 'text-danger-400'
                    }`}>
                      {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-dark-400">{formatDate(txn.date)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge ${
                      txn.type === 'income' ? 'badge-income' : 'badge-expense'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onEdit?.(txn)}
                        className="btn-ghost p-2 text-dark-400 hover:text-primary-400"
                        aria-label="Edit transaction"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete?.(txn._id)}
                        className="btn-ghost p-2 text-dark-400 hover:text-danger-400"
                        aria-label="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex items-center justify-between px-2">
          <p className="text-sm text-dark-500">
            Showing {((pagination.page - 1) * pagination.limit) + 1}-
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= pagination.pages}
              className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
