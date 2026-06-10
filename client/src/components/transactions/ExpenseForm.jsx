import { useState } from 'react';
import { X } from 'lucide-react';
import CategorySelect from '../categories/CategorySelect';
import { useCreateTransaction, useUpdateTransaction } from '../../hooks/useTransactions';

/**
 * Expense form modal — for creating or editing expense transactions.
 */
export default function ExpenseForm({ onClose, editData = null }) {
  const [formData, setFormData] = useState({
    title: editData?.title || '',
    amount: editData?.amount || '',
    categoryId: editData?.categoryId?._id || editData?.categoryId || '',
    date: editData?.date
      ? new Date(editData.date).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    notes: editData?.notes || '',
  });
  const [error, setError] = useState('');

  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();
  const isEditing = !!editData;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.amount || !formData.categoryId) {
      setError('Please fill all required fields');
      return;
    }

    const payload = {
      type: 'expense',
      title: formData.title.trim(),
      amount: Number(formData.amount),
      categoryId: formData.categoryId,
      date: formData.date,
      notes: formData.notes.trim(),
    };

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({ id: editData._id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-dark-100">
            {isEditing ? 'Edit Expense' : 'Add Expense'}
          </h2>
          <button onClick={onClose} className="btn-ghost" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="expense-title" className="block text-sm font-medium text-dark-300 mb-1.5">
              Title *
            </label>
            <input
              id="expense-title"
              type="text"
              className="input-field"
              placeholder="e.g., Grocery shopping"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="expense-amount" className="block text-sm font-medium text-dark-300 mb-1.5">
              Amount (₹) *
            </label>
            <input
              id="expense-amount"
              type="number"
              className="input-field"
              placeholder="0"
              min="1"
              step="any"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-300 mb-1.5">
              Category *
            </label>
            <CategorySelect
              value={formData.categoryId}
              onChange={(val) => setFormData({ ...formData, categoryId: val })}
            />
          </div>

          <div>
            <label htmlFor="expense-date" className="block text-sm font-medium text-dark-300 mb-1.5">
              Date
            </label>
            <input
              id="expense-date"
              type="date"
              className="input-field"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="expense-notes" className="block text-sm font-medium text-dark-300 mb-1.5">
              Notes
            </label>
            <textarea
              id="expense-notes"
              className="input-field resize-none h-20"
              placeholder="Optional notes..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="btn-primary flex-1">
              {isPending ? 'Saving...' : isEditing ? 'Update' : 'Add Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
