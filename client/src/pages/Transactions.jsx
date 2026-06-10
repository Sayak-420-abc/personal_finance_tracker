import { useState } from 'react';
import { Plus, Filter, ArrowDownUp } from 'lucide-react';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionCard from '../components/transactions/TransactionCard';
import ExpenseForm from '../components/transactions/ExpenseForm';
import IncomeForm from '../components/transactions/IncomeForm';
import { useTransactions, useDeleteTransaction } from '../hooks/useTransactions';
import { useCategories } from '../hooks/useCategories';
import { getCurrentMonth } from '../utils/formatDate';

/**
 * Transactions page — full list with filters and CRUD.
 */
export default function Transactions() {
  const [filters, setFilters] = useState({ page: 1 });
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useTransactions(filters);
  const { data: categories = [] } = useCategories();
  const deleteMutation = useDeleteTransaction();

  const transactions = data?.transactions || [];
  const pagination = data?.pagination || {};

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleEdit = (txn) => {
    setEditData(txn);
    if (txn.type === 'income') {
      setShowIncomeForm(true);
    } else {
      setShowExpenseForm(true);
    }
  };

  const handleCloseForm = () => {
    setShowExpenseForm(false);
    setShowIncomeForm(false);
    setEditData(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark-50">Transactions</h1>
          <p className="text-dark-400 mt-1">Manage your income and expenses</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="toggle-filters-btn"
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Filter size={16} />
            Filters
          </button>
          <button
            id="add-income-btn"
            onClick={() => { setEditData(null); setShowIncomeForm(true); }}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Income
          </button>
          <button
            id="add-expense-btn"
            onClick={() => { setEditData(null); setShowExpenseForm(true); }}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Expense
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="glass-card p-4 flex flex-wrap gap-4 animate-slide-up">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs text-dark-400 mb-1">Type</label>
            <select
              id="filter-type"
              className="select-field text-sm"
              value={filters.type || ''}
              onChange={(e) => setFilters({ ...filters, type: e.target.value || undefined, page: 1 })}
            >
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs text-dark-400 mb-1">Month</label>
            <input
              id="filter-month"
              type="month"
              className="input-field text-sm"
              value={filters.month || ''}
              onChange={(e) => setFilters({ ...filters, month: e.target.value || undefined, page: 1 })}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <label className="block text-xs text-dark-400 mb-1">Category</label>
            <select
              id="filter-category"
              className="select-field text-sm"
              value={filters.category || ''}
              onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined, page: 1 })}
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setFilters({ page: 1 })}
              className="btn-ghost text-sm text-dark-400"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Transaction table */}
      <TransactionTable
        transactions={transactions}
        pagination={pagination}
        onPageChange={(page) => setFilters({ ...filters, page })}
        onDelete={handleDelete}
        onEdit={handleEdit}
        isLoading={isLoading}
      />

      {/* Forms */}
      {showExpenseForm && (
        <ExpenseForm onClose={handleCloseForm} editData={editData} />
      )}
      {showIncomeForm && (
        <IncomeForm onClose={handleCloseForm} editData={editData} />
      )}
    </div>
  );
}
