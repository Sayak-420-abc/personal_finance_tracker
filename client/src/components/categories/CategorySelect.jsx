import { useCategories } from '../../hooks/useCategories';

/**
 * Category dropdown select with color indicators.
 */
export default function CategorySelect({ value, onChange, className = '' }) {
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className={`relative ${className}`}>
      <select
        id="category-select"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="select-field pr-10"
        disabled={isLoading}
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Color indicator */}
      {value && (
        <span
          className="absolute right-10 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            backgroundColor: categories.find((c) => c._id === value)?.color || '#6366f1',
          }}
        />
      )}
    </div>
  );
}
