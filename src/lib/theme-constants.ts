// ============================================================================
// ZEN FLOW UI - THEME CONSTANTS
// ============================================================================
// Centralized theme constants to replace inline style anti-patterns

import { createCSSProps } from './utils';

/**
 * Core Zen Flow color palette
 */
export const ZEN_COLORS = {
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
} as const;

/**
 * CSS custom properties for core colors
 */
export const ZEN_COLOR_PROPS = createCSSProps({
  'zen-void': ZEN_COLORS.void,
  'zen-ink': ZEN_COLORS.ink,
  'zen-shadow': ZEN_COLORS.shadow,
  'zen-stone': ZEN_COLORS.stone,
  'zen-mist': ZEN_COLORS.mist,
  'zen-cloud': ZEN_COLORS.cloud,
  'zen-paper': ZEN_COLORS.paper,
  'zen-light': ZEN_COLORS.light,
  'zen-accent': ZEN_COLORS.accent,
  'zen-water': ZEN_COLORS.water,
  'zen-leaf': ZEN_COLORS.leaf,
  'zen-sun': ZEN_COLORS.sun,
});

/**
 * Commonly used color combinations for specific components
 */
export const ZEN_COMPONENT_PROPS = {
  // Basic component colors
  basic: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-ink': ZEN_COLORS.ink,
    'zen-stone': ZEN_COLORS.stone,
    'zen-cloud': ZEN_COLORS.cloud,
  }),

  // Interactive component colors
  interactive: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-water': ZEN_COLORS.water,
    'zen-accent': ZEN_COLORS.accent,
    'zen-mist': ZEN_COLORS.mist,
    'zen-ink': ZEN_COLORS.ink,
    'zen-void': ZEN_COLORS.void,
  }),

  // Card component colors
  card: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-accent': ZEN_COLORS.accent,
    'zen-water': ZEN_COLORS.water,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-void': ZEN_COLORS.void,
    'zen-stone': ZEN_COLORS.stone,
  }),

  // Alert component colors
  alert: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-ink': ZEN_COLORS.ink,
    'zen-accent': ZEN_COLORS.accent,
    'zen-leaf': ZEN_COLORS.leaf,
    'zen-sun': ZEN_COLORS.sun,
    'zen-water': ZEN_COLORS.water,
    'zen-void': ZEN_COLORS.void,
    'zen-stone': ZEN_COLORS.stone,
  }),

  // Notification component colors
  notification: createCSSProps({
    'zen-void': ZEN_COLORS.void,
    'zen-light': ZEN_COLORS.light,
    'zen-shadow': ZEN_COLORS.shadow,
    'zen-leaf': ZEN_COLORS.leaf,
    'zen-sun': ZEN_COLORS.sun,
    'zen-accent': ZEN_COLORS.accent,
    'zen-water': ZEN_COLORS.water,
  }),

  // Modal component colors
  modal: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-void': ZEN_COLORS.void,
    'zen-stone': ZEN_COLORS.stone,
    'zen-water': ZEN_COLORS.water,
  }),

  // Tabs component colors
  tabs: createCSSProps({
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-mist': ZEN_COLORS.mist,
    'zen-light': ZEN_COLORS.light,
    'zen-water': ZEN_COLORS.water,
    'zen-void': ZEN_COLORS.void,
    'zen-ink': ZEN_COLORS.ink,
  }),

  // RadioGroup component colors
  radioGroup: createCSSProps({
    'zen-mist': ZEN_COLORS.mist,
  }),

  // Select component colors
  select: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-water': ZEN_COLORS.water,
    'zen-accent': ZEN_COLORS.accent,
    'zen-mist': ZEN_COLORS.mist,
    'zen-ink': ZEN_COLORS.ink,
    'zen-void': ZEN_COLORS.void,
  }),

  // Progress component colors
  progress: createCSSProps({
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-water': ZEN_COLORS.water,
    'zen-accent': ZEN_COLORS.accent,
    'zen-leaf': ZEN_COLORS.leaf,
    'zen-sun': ZEN_COLORS.sun,
    'zen-ink': ZEN_COLORS.ink,
    'zen-mist': ZEN_COLORS.mist,
  }),

  // Input component colors
  input: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-water': ZEN_COLORS.water,
    'zen-accent': ZEN_COLORS.accent,
    'zen-leaf': ZEN_COLORS.leaf,
    'zen-mist': ZEN_COLORS.mist,
  }),

  // Dialog component colors
  dialog: createCSSProps({
    'zen-void': ZEN_COLORS.void,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-light': ZEN_COLORS.light,
    'zen-ink': ZEN_COLORS.ink,
    'zen-stone': ZEN_COLORS.stone,
  }),

  // Toggle component colors
  toggle: createCSSProps({
    'zen-water': ZEN_COLORS.water,
    'zen-accent': ZEN_COLORS.accent,
    'zen-leaf': ZEN_COLORS.leaf,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-light': ZEN_COLORS.light,
  }),

  // Tooltip component colors
  tooltip: createCSSProps({
    'zen-void': ZEN_COLORS.void,
    'zen-light': ZEN_COLORS.light,
    'zen-cloud': ZEN_COLORS.cloud,
  }),

  // Command component colors
  command: createCSSProps({
    'zen-light': ZEN_COLORS.light,
    'zen-cloud': ZEN_COLORS.cloud,
    'zen-ink': ZEN_COLORS.ink,
    'zen-void': ZEN_COLORS.void,
    'zen-mist': ZEN_COLORS.mist,
    'zen-water': ZEN_COLORS.water,
  }),
} as const;

/**
 * Utility function to get theme props for a specific component
 */
export function getComponentThemeProps(component: keyof typeof ZEN_COMPONENT_PROPS) {
  return ZEN_COMPONENT_PROPS[component];
}

/**
 * Utility function to create custom theme props
 */
export function createThemeProps(colors: Partial<typeof ZEN_COLORS>) {
  return createCSSProps(
    Object.fromEntries(
      Object.entries(colors).map(([key, value]) => [`zen-${key}`, value])
    )
  );
} 