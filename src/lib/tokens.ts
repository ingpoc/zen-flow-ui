// Zen Flow Design Tokens
// Based on Japanese minimalism and mathematical precision

export const tokens = {
  // Color Palette - Inspired by Japanese aesthetics
  colors: {
    // Base Neutrals
    void: '#0a0a0a',      // Primary text, highest contrast
    ink: '#1a1a1a',       // Headers, important text
    shadow: '#2a2a2a',    // Secondary headers
    stone: '#4a4a4a',     // Body text
    mist: '#8a8a8a',      // Muted text, placeholders
    cloud: '#dadada',     // Borders, dividers
    paper: '#fafafa',     // Background
    light: '#ffffff',     // Pure white, cards

    // Accent Colors
    accent: '#ff4757',    // Primary action, error states
    water: '#3742fa',     // Links, focus states
    leaf: '#26de81',      // Success states
    sun: '#fed330',       // Warning states
  },

  // Typography Scale - Based on 1.25 ratio (Major Third)
  typography: {
    fontSize: {
      xs: '0.75rem',      // 12px - Captions, labels
      sm: '0.875rem',     // 14px - Secondary text
      base: '1rem',       // 16px - Body text
      lg: '1.25rem',      // 20px - Section headers
      xl: '1.5rem',       // 24px - Page sections
      '2xl': '2rem',      // 32px - Page headers
      '3xl': '3rem',      // 48px - Hero text
      '4xl': '4rem',      // 64px - Display text
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  // Spacing Scale - Based on 8px grid
  spacing: {
    xs: '4px',          // Tight spacing
    sm: '8px',          // Default padding
    md: '16px',         // Component spacing
    lg: '32px',         // Section spacing
    xl: '64px',         // Page sections
    xxl: '128px',       // Major breaks
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '2px',
    base: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  // Shadows - Subtle elevation
  boxShadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
    base: '0 4px 8px rgba(0, 0, 0, 0.08)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.12)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.16)',
  },

  // Animation Tokens
  animation: {
    // Timing Functions - Natural movement
    easing: {
      out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      inOut: 'cubic-bezier(0.37, 0, 0.63, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    
    // Durations
    duration: {
      instant: '100ms',   // Immediate feedback
      fast: '200ms',      // Micro-interactions
      normal: '300ms',    // Standard transitions
      slow: '500ms',      // Complex animations
      glacial: '1000ms',  // Page transitions
    },
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// CSS Custom Properties Generator
export const generateCSSCustomProperties = () => {
  const cssVars: Record<string, string> = {};
  
  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    cssVars[`--zen-${key}`] = value;
  });
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--zen-space-${key}`] = value;
  });
  
  // Typography
  Object.entries(tokens.typography.fontSize).forEach(([key, value]) => {
    cssVars[`--zen-text-${key}`] = value;
  });
  
  // Shadows
  Object.entries(tokens.boxShadow).forEach(([key, value]) => {
    cssVars[`--zen-shadow-${key}`] = value;
  });
  
  // Animation durations
  Object.entries(tokens.animation.duration).forEach(([key, value]) => {
    cssVars[`--zen-duration-${key}`] = value;
  });
  
  return cssVars;
};
