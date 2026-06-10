import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, Tag, BarChart3, User, X, Wallet,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { to: '/categories',   label: 'Categories',   icon: Tag },
  { to: '/reports',      label: 'Reports',      icon: BarChart3 },
  { to: '/profile',      label: 'Profile',      icon: User },
];

/**
 * Collapsible sidebar with navigation links.
 */
export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-dark-950/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        id="main-sidebar"
        className={`
          fixed top-0 left-0 z-50 h-full w-72
          bg-dark-900 border-r border-dark-700/50
          flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-dark-700/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gradient">FinTrack</span>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-dark-700/50">
          <p className="text-xs text-dark-500">
            © 2024 FinTrack
          </p>
        </div>
      </aside>
    </>
  );
}
