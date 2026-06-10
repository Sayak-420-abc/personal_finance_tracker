import { UserProfile } from '@clerk/clerk-react';

/**
 * Profile page — embeds Clerk UserProfile component.
 */
export default function Profile() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-dark-100">Profile</h1>
        <p className="text-dark-400 mt-1">Manage your account settings</p>
      </div>

      <div className="glass-card p-6 flex justify-center">
        <UserProfile
          appearance={{
            elements: {
              rootBox: 'w-full max-w-2xl',
              card: 'bg-transparent shadow-none',
              navbar: 'bg-transparent',
              pageScrollBox: 'bg-transparent',
              headerTitle: 'text-dark-100 font-display font-extrabold text-xl',
              headerSubtitle: 'text-dark-400 font-sans',
              profileSectionTitle: 'text-dark-100 border-b-2 border-dark-600 pb-2 font-display font-bold',
              profileSectionContent: 'text-dark-100',
              formFieldLabel: 'text-dark-100 font-bold',
              formFieldInput: 'bg-dark-800 border-2 border-dark-600 text-dark-100 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
              formButtonPrimary: 'bg-primary-600 hover:bg-primary-500 text-white border-2 border-dark-600 shadow-pop font-display font-bold uppercase transition-all',
            },
          }}
        />
      </div>
    </div>
  );
}
