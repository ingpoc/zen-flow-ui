import { ZenTokens, ZenTheme, ZenThemeInput, DeepPartial } from '../types';

// ============================================================================
// DEFAULT DESIGN TOKENS
// ============================================================================

export const defaultZenTokens: ZenTokens = {
  colors: {
    // Core Zen Palette (Japanese-inspired)
    void: '#0a0a0a',      // Deep black
    ink: '#1a1a1a',       // Dark gray
    shadow: '#2a2a2a',    // Medium dark gray
    stone: '#4a4a4a',     // Medium gray
    mist: '#8a8a8a',      // Light gray
    cloud: '#dadada',     // Very light gray
    paper: '#fafafa',     // Off-white
    light: '#ffffff',     // Pure white
    
    // Accent Colors
    accent: '#ff4757',    // Primary accent (red)
    water: '#3742fa',     // Blue
    leaf: '#26de81',      // Green
    sun: '#fed330',       // Yellow/orange
    
    // Semantic Colors
    primary: '#3742fa',
    secondary: '#8a8a8a',
    destructive: '#ff4757',
    warning: '#fed330',
    success: '#26de81',
    info: '#3742fa',
    
    // Interactive States
    hover: 'rgba(55, 66, 250, 0.1)',
    active: 'rgba(55, 66, 250, 0.2)',
    focus: 'rgba(55, 66, 250, 0.3)',
    disabled: 'rgba(138, 138, 138, 0.5)',
    
    // Surface Colors
    background: '#ffffff',
    foreground: '#1a1a1a',
    card: '#ffffff',
    cardForeground: '#1a1a1a',
    popover: '#ffffff',
    popoverForeground: '#1a1a1a',
    
    // Border & Input
    border: '#e5e5e5',
    input: '#f5f5f5',
    ring: 'rgba(55, 66, 250, 0.3)',
    
    // Muted variants
    muted: '#f5f5f5',
    mutedForeground: '#8a8a8a',
  },
  
  spacing: {
    px: '1px',
    0: '0px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    11: '2.75rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
    
    // Semantic spacing
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
  },
  
  typography: {
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
      serif: [
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
      ],
      mono: [
        'JetBrains Mono',
        'Fira Code',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
      zen: [
        'Noto Sans JP',
        'Hiragino Sans',
        'Yu Gothic',
        'Meiryo',
        'sans-serif',
      ],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
  },
  
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: '0 0 #0000',
    zen: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
  },
  
  motion: {
    duration: {
      instant: '0ms',
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '800ms',
    },
    ease: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      zen: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    spring: {
      stiffness: 400,
      damping: 17,
      mass: 1,
    },
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// ============================================================================
// DARK MODE TOKENS
// ============================================================================

export const darkZenTokens: ZenTokens = {
  ...defaultZenTokens,
  colors: {
    ...defaultZenTokens.colors,
    
    // Core Zen Palette (Dark Mode)
    void: '#ffffff',      // Inverted for dark mode
    ink: '#f5f5f5',       // Light gray
    shadow: '#e5e5e5',    // Medium light gray
    stone: '#b5b5b5',     // Medium gray
    mist: '#757575',      // Dark gray
    cloud: '#252525',     // Very dark gray
    paper: '#050505',     // Off-black
    light: '#0a0a0a',     // Deep black
    
    // Surface Colors (Dark Mode)
    background: '#0a0a0a',
    foreground: '#f5f5f5',
    card: '#1a1a1a',
    cardForeground: '#f5f5f5',
    popover: '#1a1a1a',
    popoverForeground: '#f5f5f5',
    
    // Border & Input (Dark Mode)
    border: '#2a2a2a',
    input: '#1a1a1a',
    ring: 'rgba(55, 66, 250, 0.4)',
    
    // Muted variants (Dark Mode)
    muted: '#1a1a1a',
    mutedForeground: '#757575',
  },
};

// ============================================================================
// THEME CREATION UTILITIES
// ============================================================================

/**
 * Create a custom Zen theme with optional overrides
 */
export function createZenTheme(input: ZenThemeInput = {}): ZenTheme {
  const baseTheme: ZenTheme = {
    name: input.name || 'custom',
    tokens: defaultZenTokens,
    motion: {
      duration: 'normal',
      style: 'zen',
      reduce: false,
      stiffness: 400,
      damping: 17,
    },
    spacing: 'comfortable',
    mode: 'light',
  };

  return deepMerge(baseTheme, input);
}

/**
 * Get theme tokens based on mode
 */
export function getThemeTokens(mode: 'light' | 'dark' = 'light'): ZenTokens {
  return mode === 'dark' ? darkZenTokens : defaultZenTokens;
}

/**
 * Generate CSS custom properties from theme tokens
 */
export function generateCSSCustomProperties(tokens: ZenTokens): Record<string, string> {
  const cssVars: Record<string, string> = {};
  
  // Colors
  Object.entries(tokens.colors).forEach(([key, value]) => {
    cssVars[`--zen-color-${key}`] = value;
  });
  
  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    cssVars[`--zen-space-${key}`] = value;
  });
  
  // Typography
  Object.entries(tokens.typography.fontSize).forEach(([key, [size, { lineHeight }]]) => {
    cssVars[`--zen-text-${key}`] = size;
    cssVars[`--zen-leading-${key}`] = lineHeight;
  });
  
  Object.entries(tokens.typography.fontWeight).forEach(([key, value]) => {
    cssVars[`--zen-font-${key}`] = value;
  });
  
  // Border Radius
  Object.entries(tokens.borderRadius).forEach(([key, value]) => {
    cssVars[`--zen-radius-${key}`] = value;
  });
  
  // Shadows
  Object.entries(tokens.shadows).forEach(([key, value]) => {
    cssVars[`--zen-shadow-${key}`] = value;
  });
  
  // Motion
  Object.entries(tokens.motion.duration).forEach(([key, value]) => {
    cssVars[`--zen-duration-${key}`] = value;
  });
  
  Object.entries(tokens.motion.ease).forEach(([key, value]) => {
    cssVars[`--zen-ease-${key}`] = value;
  });
  
  return cssVars;
}

/**
 * Apply theme to document root
 */
export function applyThemeToRoot(theme: ZenTheme): void {
  if (typeof document === 'undefined') return;
  
  const cssVars = generateCSSCustomProperties(theme.tokens);
  const root = document.documentElement;
  
  Object.entries(cssVars).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  
  // Set theme mode class
  root.classList.remove('zen-light', 'zen-dark');
  root.classList.add(`zen-${theme.mode}`);
  
  // Set spacing class
  root.classList.remove('zen-compact', 'zen-comfortable', 'zen-spacious');
  root.classList.add(`zen-${theme.spacing}`);
}

// ============================================================================
// MOTION UTILITIES
// ============================================================================

/**
 * Get motion duration based on user preferences
 */
export function getMotionDuration(
  duration: string | number = 'normal',
  tokens: ZenTokens = defaultZenTokens
): string {
  if (typeof duration === 'number') {
    return `${duration}ms`;
  }
  
  // Check for reduced motion preference
  if (typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return '0ms';
  }
  
  return tokens.motion.duration[duration as keyof typeof tokens.motion.duration] || duration;
}

/**
 * Get motion easing function
 */
export function getMotionEase(
  ease: string = 'zen',
  tokens: ZenTokens = defaultZenTokens
): string {
  return tokens.motion.ease[ease as keyof typeof tokens.motion.ease] || ease;
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

export const colorUtils = {
  /**
   * Convert hex to RGB
   */
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  /**
   * Convert RGB to hex
   */
  rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  /**
   * Add alpha to color
   */
  withAlpha(color: string, alpha: number): string {
    const rgb = this.hexToRgb(color);
    if (!rgb) return color;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
  },

  /**
   * Lighten color
   */
  lighten(color: string, amount: number): string {
    const rgb = this.hexToRgb(color);
    if (!rgb) return color;
    
    const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * amount));
    const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * amount));
    const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * amount));
    
    return this.rgbToHex(r, g, b);
  },

  /**
   * Darken color
   */
  darken(color: string, amount: number): string {
    const rgb = this.hexToRgb(color);
    if (!rgb) return color;
    
    const r = Math.max(0, Math.floor(rgb.r * (1 - amount)));
    const g = Math.max(0, Math.floor(rgb.g * (1 - amount)));
    const b = Math.max(0, Math.floor(rgb.b * (1 - amount)));
    
    return this.rgbToHex(r, g, b);
  },
};

// ============================================================================
// PREDEFINED THEMES
// ============================================================================

export const zenThemes = {
  light: createZenTheme({
    name: 'light',
    mode: 'light',
    tokens: defaultZenTokens,
  }),
  
  dark: createZenTheme({
    name: 'dark',
    mode: 'dark',
    tokens: darkZenTokens,
  }),
  
  minimal: createZenTheme({
    name: 'minimal',
    mode: 'light',
    tokens: {
      ...defaultZenTokens,
      colors: {
        ...defaultZenTokens.colors,
        accent: '#000000',
        water: '#000000',
        primary: '#000000',
      },
    },
    spacing: 'compact',
  }),
  
  vibrant: createZenTheme({
    name: 'vibrant',
    mode: 'light',
    tokens: {
      ...defaultZenTokens,
      colors: {
        ...defaultZenTokens.colors,
        accent: '#ff6b6b',
        water: '#4ecdc4',
        leaf: '#45b7d1',
        sun: '#f9ca24',
      },
    },
    spacing: 'spacious',
  }),
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Deep merge utility for theme creation
 */
function deepMerge<T>(target: T, source: DeepPartial<T>): T {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      (result as any)[key] = deepMerge((target as any)[key] || {}, source[key] as any);
    } else if (source[key] !== undefined) {
      (result as any)[key] = source[key];
    }
  }
  
  return result;
}

/**
 * Check if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get appropriate animation duration based on user preferences
 */
export function getAnimationDuration(defaultDuration: number): number {
  return shouldReduceMotion() ? 0 : defaultDuration;
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  ZenTokens,
  ZenTheme,
  ZenThemeInput,
} from '../types'; 