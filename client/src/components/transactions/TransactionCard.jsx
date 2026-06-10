import { formatCurrency } from '../../utils/formatCurrency';
import { formatRelativeDate } from '../../utils/formatDate';
import { Trash2, Edit2 } from 'lucide-react';

/**
 * Mobile-friendly transaction card.
 */
export default function TransactionCard({ transaction, onEdit, onDelete }) {
  const { title, amount, type, date, notes, categoryId } = transaction;

  return (
    <div className="glass-card p-4 flex items-center gap-4 animate-fade-in">
      {/* Category color dot */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${categoryId?.color || '#6366f1'}20` }}
      >
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: categoryId?.color || '#6366f1' }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-dark-100 truncate">{title}</p>
        <p className="text-xs text-dark-500">
          {categoryId?.name || 'Uncategorized'} · {formatRelativeDate(date)}
        </p>
      </div>

      {/* Amount */}
      <div className="text-right shrink-0">
        <p className={`text-sm font-bold ${
          type === 'income' ? 'text-success-400' : 'text-danger-400'
        }`}>
          {type === 'income' ? '+' : '-'}{formatCurrency(amount)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => onEdit?.(transaction)}
          className="btn-ghost p-1.5"
          aria-label="Edit"
        >
          <Edit2 size={14} className="text-dark-500 hover:text-primary-400" />
        </button>
        <button
          onClick={() => onDelete?.(transaction._id)}
          className="btn-ghost p-1.5"
          aria-label="Delete"
        >
          <Trash2 size={14} className="text-dark-500 hover:text-danger-400" />
        </button>
      </div>
    </div>
  );
}
