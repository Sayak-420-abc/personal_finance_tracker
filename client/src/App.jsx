import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth, SignIn, SignUp } from '@clerk/clerk-react';
import { setTokenGetter } from './services/api';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Components
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

/**
 * Root App component with routing.
 */
export default function App() {
  const { getToken } = useAuth();

  // Wire up the Clerk token getter for the Axios interceptor
  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route
          path="/sign-in/*"
          element={
            <SignIn
              routing="path"
              path="/sign-in"
              signUpUrl="/sign-up"
              afterSignInUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'glass-card !p-8 w-full',
                  headerTitle: 'text-dark-100 font-display font-extrabold text-2xl',
                  headerSubtitle: 'text-dark-400 font-sans',
                  socialButtonsBlockButton: 'bg-dark-800 border-2 border-dark-600 text-dark-100 hover:bg-primary-200 shadow-pop font-semibold transition-all',
                  formFieldLabel: 'text-dark-100 font-bold',
                  formFieldInput: 'bg-dark-800 border-2 border-dark-600 text-dark-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
                  formButtonPrimary: 'bg-primary-600 hover:bg-primary-500 text-white border-2 border-dark-600 shadow-pop font-display font-bold uppercase transition-all',
                  footerActionLink: 'text-primary-600 hover:text-primary-700 font-bold',
                  dividerLine: 'bg-dark-600 h-[2px]',
                  dividerText: 'text-dark-400 font-semibold',
                },
              }}
            />
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              afterSignUpUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: 'w-full',
                  card: 'glass-card !p-8 w-full',
                  headerTitle: 'text-dark-100 font-display font-extrabold text-2xl',
                  headerSubtitle: 'text-dark-400 font-sans',
                  socialButtonsBlockButton: 'bg-dark-800 border-2 border-dark-600 text-dark-100 hover:bg-primary-200 shadow-pop font-semibold transition-all',
                  formFieldLabel: 'text-dark-100 font-bold',
                  formFieldInput: 'bg-dark-800 border-2 border-dark-600 text-dark-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
                  formButtonPrimary: 'bg-primary-600 hover:bg-primary-500 text-white border-2 border-dark-600 shadow-pop font-display font-bold uppercase transition-all',
                  footerActionLink: 'text-primary-600 hover:text-primary-700 font-bold',
                  dividerLine: 'bg-dark-600 h-[2px]',
                  dividerText: 'text-dark-400 font-semibold',
                },
              }}
            />
          }
        />
      </Route>

      {/* Protected routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
