import React, { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const progressVariants = cva(
  [
    'relative w-full overflow-hidden rounded-full',
    'bg-zen-cloud',
  ],
  {
    variants: {
      size: {
        sm: 'h-2',
        default: 'h-3',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const progressBarVariants = cva(
  [
    'h-full w-full flex-1 transition-all duration-500 ease-out',
    'relative overflow-hidden rounded-full',
    // Shimmer effect
    'after:absolute after:inset-0',
    'after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent',
    'after:animate-shimmer',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-zen-water to-zen-accent',
        success: 'bg-gradient-to-r from-zen-leaf to-zen-water',
        warning: 'bg-gradient-to-r from-zen-sun to-zen-accent',
        accent: 'bg-gradient-to-r from-zen-accent to-zen-water',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ProgressProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'accent';
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100,
    size,
    variant = 'default',
    showLabel = false,
    label,
    animated = true,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    return (
      <div className="w-full space-y-2">
        {(showLabel || label) && (
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-zen-ink">
              {label || 'Progress'}
            </span>
            <span className="text-sm text-zen-mist">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        <div
          ref={ref}
          className={cn(progressVariants({ size }), className)}
          style={{
            '--zen-cloud': '#dadada',
            '--zen-water': '#3742fa',
            '--zen-accent': '#ff4757',
            '--zen-leaf': '#26de81',
            '--zen-sun': '#fed330',
            '--zen-ink': '#1a1a1a',
            '--zen-mist': '#8a8a8a',
          } as React.CSSProperties}
          {...props}
        >
          <div
            className={cn(
              progressBarVariants({ variant }),
              !animated && 'after:hidden'
            )}
            style={{
              transform: `translateX(-${100 - percentage}%)`,
            }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// Circular Progress Component
const circularProgressVariants = cva([
  'relative inline-flex items-center justify-center',
]);

export interface CircularProgressProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof circularProgressVariants> {
  value?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  variant?: 'default' | 'success' | 'warning' | 'accent';
  showLabel?: boolean;
  label?: string;
}

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100,
    size = 120,
    strokeWidth = 8,
    variant = 'default',
    showLabel = false,
    label,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    const getColor = () => {
      switch (variant) {
        case 'success': return '#26de81';
        case 'warning': return '#fed330';
        case 'accent': return '#ff4757';
        default: return '#3742fa';
      }
    };

    return (
      <div className="inline-flex flex-col items-center space-y-2">
        <div
          ref={ref}
          className={cn(circularProgressVariants(), className)}
          style={{ width: size, height: size }}
          {...props}
        >
          <svg
            width={size}
            height={size}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#dadada"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={getColor()}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-zen-ink">
              {Math.round(percentage)}%
            </span>
          </div>
        </div>
        
        {(showLabel || label) && (
          <span className="text-sm font-medium text-zen-ink">
            {label || 'Progress'}
          </span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

// Skeleton loader for progress bars
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'title' | 'box' | 'progress';
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'text', ...props }, ref) => {
    const variantClasses = {
      text: 'h-4 w-full',
      title: 'h-6 w-3/4',
      box: 'h-32 w-full',
      progress: 'h-3 w-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-zen-cloud rounded animate-pulse',
          'relative overflow-hidden',
          'after:absolute after:inset-0',
          'after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent',
          'after:animate-shimmer',
          variantClasses[variant],
          className
        )}
        style={{
          '--zen-cloud': '#dadada',
        } as React.CSSProperties}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Progress, CircularProgress, Skeleton, progressVariants };
