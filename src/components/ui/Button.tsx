import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  // Base styles - following Zen Flow principles
  [
    'inline-flex items-center justify-center',
    'relative overflow-hidden',
    'font-medium transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'min-w-[120px]',
    // Zen Flow specific animations
    'before:absolute before:inset-0 before:rounded-[inherit]',
    'before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0',
    'before:translate-x-[-100%] before:transition-transform before:duration-500',
    'hover:before:translate-x-[100%]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-zen-void text-zen-light',
          'hover:translate-y-[-2px] hover:shadow-lg',
          'active:translate-y-0 active:shadow-sm',
        ],
        secondary: [
          'bg-transparent text-zen-void border border-zen-mist',
          'hover:bg-zen-void hover:text-zen-light hover:border-zen-void',
          'hover:translate-y-[-2px] hover:shadow-lg',
        ],
        accent: [
          'bg-zen-accent text-zen-light',
          'hover:translate-y-[-2px] hover:shadow-lg',
          'active:translate-y-0 active:shadow-sm',
        ],
        ghost: [
          'text-zen-stone hover:text-zen-void hover:bg-zen-cloud/50',
          'transition-colors duration-200',
        ],
        destructive: [
          'bg-zen-accent text-zen-light',
          'hover:bg-zen-accent/90',
          'hover:translate-y-[-2px] hover:shadow-lg',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-12 px-8 py-4',
        lg: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        default: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    rounded,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    onClick,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      
      // Add ripple effect
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: zen-ripple 0.6s linear;
        pointer-events: none;
      `;
      
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      
      onClick?.(e);
    };

    return (
      <button
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        style={{
          '--zen-void': '#0a0a0a',
          '--zen-light': '#ffffff',
          '--zen-accent': '#ff4757',
          '--zen-stone': '#4a4a4a',
          '--zen-mist': '#8a8a8a',
          '--zen-cloud': '#dadada',
        } as React.CSSProperties}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
