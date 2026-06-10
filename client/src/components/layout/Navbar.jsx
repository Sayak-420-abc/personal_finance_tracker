import { UserButton } from '@clerk/clerk-react';
import { Bell, Search, Menu } from 'lucide-react';

/**
 * Top navigation bar with search, notifications, and user menu.
 */
export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-6
                        bg-dark-900/80 backdrop-blur-xl border-b border-dark-700/50">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-4">
        <button
          id="sidebar-toggle"
          onClick={onToggleSidebar}
          className="btn-ghost lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl
                        bg-dark-800 border border-dark-700 w-72
                        focus-within:border-primary-500 transition-colors">
          <Search size={16} className="text-dark-500" />
          <input
            id="global-search"
            type="text"
            placeholder="Search transactions..."
            className="bg-transparent border-none outline-none text-sm text-dark-200
                       placeholder-dark-500 w-full"
          />
        </div>
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-3">
        <button
          id="notifications-btn"
          className="btn-ghost relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />
        </button>

        <div className="w-px h-8 bg-dark-700" />

        <UserButton
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9',
            },
          }}
        />
      </div>
    </header>
  );
}
