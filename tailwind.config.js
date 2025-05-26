/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@gurusharan3107/zen-flow-ui/dist/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Zen Flow color palette
        'zen-void': '#000000',
        'zen-ink': '#1a1a1a',
        'zen-shadow': '#2a2a2a',
        'zen-stone': '#4a4a4a',
        'zen-mist': '#8a8a8a',
        'zen-cloud': '#dadada',
        'zen-paper': '#f5f5f5',
        'zen-light': '#ffffff',
        
        // Accent colors
        'zen-water': '#3742fa',
        'zen-leaf': '#2ed573',
        'zen-sun': '#ffa502',
        'zen-accent': '#ff4757',
        
        // Semantic colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
        '4xl': '4rem',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '32px',
        xl: '64px',
        xxl: '128px',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 4px 8px rgba(0, 0, 0, 0.08)',
        md: '0 4px 8px rgba(0, 0, 0, 0.08)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.12)',
        xl: '0 16px 32px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'bounce-in': 'bounce-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'zen-ripple': 'zen-ripple 0.6s linear',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'slide-in': {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'bounce-in': {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'zen-ripple': {
          to: { transform: 'scale(4)', opacity: '0' },
        },
      },
      transitionTimingFunction: {
        'zen-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'zen-in-out': 'cubic-bezier(0.37, 0, 0.63, 1)',
        'zen-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      transitionDuration: {
        instant: '100ms',
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        glacial: '1000ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      addUtilities({
        '.zen-transition': {
          transition: 'all 300ms cubic-bezier(0.22, 1, 0.36, 1)',
        },
        '.zen-transition-fast': {
          transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        },
        '.zen-transition-slow': {
          transition: 'all 500ms cubic-bezier(0.22, 1, 0.36, 1)',
        },
        '.zen-shadow-glow': {
          boxShadow: '0 0 20px rgba(55, 66, 250, 0.3)',
        },
        '.zen-shadow-accent': {
          boxShadow: '0 0 20px rgba(255, 71, 87, 0.3)',
        },
      });
    },
  ],
};
