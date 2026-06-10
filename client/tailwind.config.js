/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0px',
      'DEFAULT': '0px',
      'md': '0px',
      'lg': '0px',
      'xl': '0px',
      '2xl': '0px',
      '3xl': '0px',
      'full': '9999px',
    },
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Custom light theme palette mapping to prevent rewriting all JSX pages
        dark: {
          50:  '#1E293B',   // Primary text / Headings (Slate 800)
          100: '#1E293B',   // Primary text (Slate 800)
          200: '#1E293B',   // Slate 800
          300: '#1E293B',   // Slate 800
          400: '#5C6F84',   // Slate 500
          500: '#94A3B8',   // Slate 400
          600: '#1E293B',   // Borders (Slate 800)
          700: '#1E293B',   // Borders (Slate 800)
          800: '#FFFDF9',   // Card bg (Eggshell)
          900: '#FFFDF9',   // Sidebar/Navbar bg (Eggshell)
          950: '#FAF3E0',   // Global bg (Cream)
        },
        primary: {
          50:  '#FAF3E0',
          100: '#FAF3E0',
          200: '#F3E9D2',
          300: '#8B5CF6',
          400: '#7C3AED',   // Darker violet for text contrast
          500: '#8B5CF6',   // Vivid Violet
          600: '#8B5CF6',   // Primary actions
          700: '#7C3AED',
          800: '#6D28D9',
          900: '#5B21B6',
        },
        accent: {
          400: '#D97706',   // Darker amber for contrast
          500: '#FBBF24',   // Amber Yellow
          600: '#D97706',
        },
        success: {
          400: '#059669',   // Darker green for contrast
          500: '#34D399',   // Mint Green
          600: '#059669',
        },
        danger: {
          400: '#DC2626',   // Darker red for contrast
          500: '#F87171',   // Red-Coral
          600: '#DC2626',
        },
      },
      boxShadow: {
        'glow': '6px 6px 0px 0px #F472B6',      // Interactive pink shadow on hover
        'glow-lg': '8px 8px 0px 0px #8B5CF6',   // Glowing violet shadow
        'card': '5px 5px 0px 0px #1E293B',      // Solid slate shadow
        'pop': '4px 4px 0px 0px #1E293B',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
