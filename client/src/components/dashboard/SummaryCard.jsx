import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const variantStyles = {
  income: {
    bg: 'from-success-500/10 to-success-500/5',
    border: 'border-success-500/20',
    icon: 'text-success-400 bg-success-500/15',
    text: 'text-success-400',
  },
  expense: {
    bg: 'from-danger-500/10 to-danger-500/5',
    border: 'border-danger-500/20',
    icon: 'text-danger-400 bg-danger-500/15',
    text: 'text-danger-400',
  },
  balance: {
    bg: 'from-primary-500/10 to-accent-500/5',
    border: 'border-primary-500/20',
    icon: 'text-primary-400 bg-primary-500/15',
    text: 'text-primary-400',
  },
  savings: {
    bg: 'from-accent-500/10 to-primary-500/5',
    border: 'border-accent-500/20',
    icon: 'text-accent-400 bg-accent-500/15',
    text: 'text-accent-400',
  },
};

/**
 * Dashboard summary card with glassmorphism and trend indicator.
 */
export default function SummaryCard({ label, value, icon: Icon, variant = 'balance', isCurrency = true }) {
  const styles = variantStyles[variant] || variantStyles.balance;

  return (
    <div
      className={`
        glass-card p-6 bg-gradient-to-br ${styles.bg}
        border ${styles.border}
        animate-slide-up
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${styles.icon}`}>
          <Icon size={22} />
        </div>
      </div>

      <p className="text-sm text-dark-400 font-medium mb-1">{label}</p>
      <p className={`text-2xl font-bold ${styles.text}`}>
        {isCurrency ? formatCurrency(value) : `${value}%`}
      </p>
    </div>
  );
}
