import React, { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn, shouldReduceMotion } from '../../lib/utils';
import type { ButtonProps } from '../../types';

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

const buttonVariants = cva(
  // Base styles - following Zen Flow principles
  [
    'inline-flex items-center justify-center',
    'relative overflow-hidden',
    'font-medium transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none cursor-pointer',
    'border border-transparent',
    // Zen Flow specific animations and effects
    'before:absolute before:inset-0 before:rounded-[inherit]',
    'before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0',
    'before:translate-x-[-100%] before:transition-transform before:duration-500',
    'hover:before:translate-x-[100%]',
    // Better touch targets
    'touch-manipulation',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-zen-water text-white border-zen-water',
          'hover:bg-zen-water/90 hover:shadow-lg hover:shadow-zen-water/25',
          'focus-visible:ring-zen-water/50',
          'active:scale-[0.98] active:bg-zen-water/95',
          'dark:bg-zen-water dark:hover:bg-zen-water/90',
        ],
        secondary: [
          'bg-zen-cloud text-zen-ink border-zen-cloud',
          'hover:bg-zen-cloud/80 hover:shadow-md',
          'focus-visible:ring-zen-cloud/50',
          'active:scale-[0.98] active:bg-zen-cloud/90',
          'dark:bg-zen-shadow dark:text-zen-light dark:border-zen-shadow',
          'dark:hover:bg-zen-shadow/80',
        ],
        accent: [
          'bg-zen-accent text-white border-zen-accent',
          'hover:bg-zen-accent/90 hover:shadow-lg hover:shadow-zen-accent/25',
          'focus-visible:ring-zen-accent/50',
          'active:scale-[0.98] active:bg-zen-accent/95',
          'dark:bg-zen-accent dark:hover:bg-zen-accent/90',
        ],
        ghost: [
          'bg-transparent text-zen-ink border-transparent',
          'hover:bg-zen-cloud/50 hover:text-zen-void',
          'focus-visible:ring-zen-mist/50',
          'active:scale-[0.98] active:bg-zen-cloud/70',
          'dark:text-zen-light dark:hover:bg-zen-shadow/50',
          'dark:hover:text-zen-light',
        ],
        outline: [
          'bg-transparent text-zen-ink border-zen-mist',
          'hover:bg-zen-mist/10 hover:border-zen-ink hover:text-zen-void',
          'focus-visible:ring-zen-mist/50',
          'active:scale-[0.98] active:bg-zen-mist/20',
          'dark:text-zen-light dark:border-zen-stone',
          'dark:hover:bg-zen-stone/10 dark:hover:border-zen-light',
        ],
        destructive: [
          'bg-red-500 text-white border-red-500',
          'hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25',
          'focus-visible:ring-red-500/50',
          'active:scale-[0.98] active:bg-red-700',
          'dark:bg-red-600 dark:hover:bg-red-700',
        ],
        link: [
          'bg-transparent text-zen-water underline-offset-4 border-transparent',
          'hover:underline hover:text-zen-water/80',
          'focus-visible:ring-zen-water/50',
          'active:scale-[0.98] active:text-zen-water/90',
          'dark:text-zen-water dark:hover:text-zen-water/80',
        ],
      },
      size: {
        sm: 'h-8 px-3 text-sm min-w-[80px] rounded-md',
        default: 'h-10 px-6 py-2 min-w-[120px] rounded-lg',
        lg: 'h-12 px-8 text-lg min-w-[140px] rounded-lg',
        icon: 'h-10 w-10 p-0 rounded-lg',
      },
      fullWidth: {
        true: 'w-full min-w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
    },
  }
);

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const motionVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17,
    }
  },
  loading: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    }
  },
};

// ============================================================================
// LOADING SPINNER COMPONENT
// ============================================================================

const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => (
  <motion.svg
    className={cn("h-4 w-4", className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    initial={{ rotate: 0 }}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
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
  </motion.svg>
);

// ============================================================================
// RIPPLE EFFECT UTILITY
// ============================================================================

const createRippleEffect = (
  event: React.MouseEvent<HTMLButtonElement>,
  element: HTMLButtonElement
) => {
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  const ripple = document.createElement('span');
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: zen-ripple 0.6s linear;
    pointer-events: none;
    z-index: 0;
  `;
  
  // Add ripple animation keyframes if not already present
  if (!document.querySelector('#zen-ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'zen-ripple-styles';
    style.textContent = `
      @keyframes zen-ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  element.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
};

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    onClick,
    animate = true,
    asChild = false,
    ...props 
  }, ref) => {
    const isDisabled = disabled || loading;
    const reduceMotion = shouldReduceMotion();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      
      // Add ripple effect if animations are enabled
      if (animate && !reduceMotion) {
        createRippleEffect(e, e.currentTarget);
      }
      
      onClick?.(e);
    };

    const buttonContent = (
      <>
        {loading && (
          <LoadingSpinner className="mr-2" />
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">{leftIcon}</span>
        )}
        <span className="relative z-10">{children}</span>
        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">{rightIcon}</span>
        )}
      </>
    );

    const buttonClasses = cn(
      buttonVariants({ variant, size, fullWidth }),
      className
    );

    // If asChild is true, we would typically use a Slot component
    // For now, we'll just render the button normally
    if (asChild) {
      console.warn('asChild prop is not yet implemented for Button component');
    }

    if (animate && !reduceMotion) {
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={isDisabled}
          onClick={handleClick}
          variants={motionVariants}
          initial="initial"
          whileHover={!isDisabled ? "hover" : undefined}
          whileTap={!isDisabled ? "tap" : undefined}
          animate={loading ? "loading" : "initial"}
          {...(props as HTMLMotionProps<"button">)}
        >
          {buttonContent}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = 'Button';

// ============================================================================
// EXPORTS
// ============================================================================

export { Button, buttonVariants };
export type { ButtonProps } from '../../types';
