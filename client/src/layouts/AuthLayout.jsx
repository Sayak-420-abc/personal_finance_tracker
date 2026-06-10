import { Outlet } from 'react-router-dom';
import { Wallet } from 'lucide-react';

/**
 * Auth layout — centered container for Clerk sign-in/sign-up.
 */
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-dark-950 dot-grid flex items-center justify-center p-4 text-dark-100">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary-500 border-2 border-dark-600 shadow-pop flex items-center justify-center">
            <Wallet size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">FinTrack</span>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
