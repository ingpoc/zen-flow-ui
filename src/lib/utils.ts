import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge classes with Tailwind CSS class merging
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sleep utility for animations and delays
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format classes for better readability in development
 */
export function formatClasses(classes: string): string {
  return classes
    .split(' ')
    .filter(Boolean)
    .sort()
    .join(' ');
}

/**
 * Create CSS custom properties from an object
 */
export function createCSSProps(props: Record<string, string | number>): React.CSSProperties {
  const cssProps: React.CSSProperties = {};
  
  Object.entries(props).forEach(([key, value]) => {
    (cssProps as any)[`--${key}`] = value;
  });
  
  return cssProps;
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if we should reduce motion based on user preferences
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
