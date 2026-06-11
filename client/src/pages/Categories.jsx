import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../hooks/useCategories';
import * as LucideIcons from 'lucide-react';

// Map icon name strings to Lucide components
function getIcon(iconName) {
  const pascalCase = iconName
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');
  return LucideIcons[pascalCase] || LucideIcons.Tag;
}

/**
 * Categories management page.
 */
export default function Categories() {
  const { data: categories = [], isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', color: '#6366f1', icon: 'tag' });
  const [error, setError] = useState('');

  const openCreate = () => {
    setEditId(null);
    setFormData({ name: '', color: '#6366f1', icon: 'tag' });
    setShowForm(true);
    setError('');
  };

  const openEdit = (cat) => {
    setEditId(cat._id);
    setFormData({ name: cat.name, color: cat.color, icon: cat.icon });
    setShowForm(true);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Category name is required');
      return;
    }

    try {
      if (editId) {
        await updateMutation.mutateAsync({ id: editId, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setShowForm(false);
      setEditId(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (err) {
        alert(err.response?.data?.error || 'Failed to delete');
      }
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-dark-50">Categories</h1>
          <p className="text-dark-400 mt-1">Organize your transactions</p>
        </div>
        <button
          id="add-category-btn"
          onClick={openCreate}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      {/* Category grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-2xl" />
          ))}
        </div>
      ) : !categories.length ? (
        <div className="glass-card p-12 text-center">
          <p className="text-dark-400 text-lg mb-2">No categories found</p>
          <p className="text-dark-500 text-sm">Add your first category to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const IconComponent = getIcon(cat.icon);
            return (
              <div
                key={cat._id}
                className="glass-card p-5 flex items-start justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <IconComponent size={22} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-100">{cat.name}</p>
                    <p className="text-xs text-dark-500 mt-0.5">
                      {cat.isDefault ? 'Default' : 'Custom'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(cat)}
                    className="btn-ghost p-1.5"
                    aria-label="Edit category"
                  >
                    <Edit2 size={14} className="text-dark-400" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="btn-ghost p-1.5"
                    aria-label="Delete category"
                  >
                    <Trash2 size={14} className="text-dark-400 hover:text-danger-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Form modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold text-dark-100 mb-6">
              {editId ? 'Edit Category' : 'New Category'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="category-name" className="block text-sm font-medium text-dark-300 mb-1.5">
                  Name *
                </label>
                <input
                  id="category-name"
                  type="text"
                  className="input-field"
                  placeholder="e.g., Subscriptions"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="category-color" className="block text-sm font-medium text-dark-300 mb-1.5">
                  Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="category-color"
                    type="color"
                    className="w-10 h-10 rounded-lg border border-dark-600 cursor-pointer bg-transparent"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                  <input
                    type="text"
                    className="input-field flex-1"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    pattern="^#[0-9a-fA-F]{6}$"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
                <button type="submit" disabled={isPending} className="btn-primary flex-1">
                  {isPending ? 'Saving...' : editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
