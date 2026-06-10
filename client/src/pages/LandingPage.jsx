import { useAuth } from '@clerk/clerk-react';
import { Link, Navigate } from 'react-router-dom';
import {
  Wallet, BarChart3, Shield, Zap, ArrowRight, PieChart, TrendingUp,
} from 'lucide-react';

const features = [
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Visualize your spending with interactive charts and detailed breakdowns.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Bank-level security with encrypted data and secure authentication.',
    color: 'from-success-500 to-success-600',
  },
  {
    icon: Zap,
    title: 'Real-time Tracking',
    description: 'Track every rupee instantly with automatic categorization.',
    color: 'from-warning-500 to-warning-600',
  },
  {
    icon: PieChart,
    title: 'Budget Insights',
    description: 'Understand where your money goes with category-wise analysis.',
    color: 'from-accent-500 to-accent-600',
  },
];

/**
 * Landing page — hero + features overview.
 */
export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  // Redirect to dashboard if already signed in
  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <Wallet size={22} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gradient">FinTrack</span>
        </div>

        <Link
          to="/sign-in"
          className="btn-primary text-sm"
        >
          Sign In
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                        bg-primary-500/10 border border-primary-500/20 text-primary-400
                        text-sm font-medium mb-8 animate-fade-in">
          <TrendingUp size={14} />
          Smart money management starts here
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-dark-50 mb-6
                       leading-tight tracking-tight animate-slide-up">
          Take Control of{' '}
          <span className="text-gradient">Your Finances</span>
        </h1>

        <p className="text-lg md:text-xl text-dark-400 max-w-2xl mx-auto mb-10
                      animate-slide-up" style={{ animationDelay: '100ms' }}>
          Track expenses, monitor income, and gain insights into your spending habits
          with beautiful dashboards and real-time analytics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4
                        animate-slide-up" style={{ animationDelay: '200ms' }}>
          <Link
            to="/sign-up"
            className="btn-primary text-base px-8 py-3 flex items-center gap-2"
          >
            Get Started Free
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/sign-in"
            className="btn-secondary text-base px-8 py-3"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-100 mb-4">
            Everything you need to{' '}
            <span className="text-gradient">manage money</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            Powerful features designed to give you complete control over your financial life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card p-8 group animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color}
                              flex items-center justify-center mb-5
                              group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-dark-100 mb-3">{feature.title}</h3>
              <p className="text-dark-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-dark-800 py-8 text-center">
        <p className="text-dark-500 text-sm">
          © 2024 FinTrack. Built with ❤️ for smart money management.
        </p>
      </footer>
    </div>
  );
}
