import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const toggleVariants = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center',
    'rounded-full border-2 border-transparent',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-zen-water',
    'data-[state=unchecked]:bg-zen-cloud',
  ],
  {
    variants: {
      size: {
        sm: 'h-5 w-9',
        default: 'h-6 w-11',
        lg: 'h-7 w-13',
      },
      variant: {
        default: 'focus-visible:ring-zen-water',
        accent: [
          'data-[state=checked]:bg-zen-accent', 
          'focus-visible:ring-zen-accent'
        ],
        success: [
          'data-[state=checked]:bg-zen-leaf', 
          'focus-visible:ring-zen-leaf'
        ],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

const thumbVariants = cva(
  [
    'pointer-events-none block rounded-full bg-zen-light shadow-sm',
    'transition-transform duration-300 ease-out',
    'data-[state=unchecked]:translate-x-0',
  ],
  {
    variants: {
      size: {
        sm: 'h-4 w-4 data-[state=checked]:translate-x-4',
        default: 'h-5 w-5 data-[state=checked]:translate-x-5',
        lg: 'h-6 w-6 data-[state=checked]:translate-x-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface ToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  name?: string;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ 
    className, 
    size, 
    variant,
    checked = false, 
    onChange,
    label,
    description,
    disabled,
    name,
    ...props 
  }, ref) => {
    const handleToggle = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    const toggleElement = (
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        disabled={disabled}
        className={cn(toggleVariants({ size, variant }), className)}
        onClick={handleToggle}
        ref={ref}
        style={{
          '--zen-water': '#3742fa',
          '--zen-accent': '#ff4757',
          '--zen-leaf': '#26de81',
          '--zen-cloud': '#dadada',
          '--zen-light': '#ffffff',
        } as React.CSSProperties}
        {...props}
      >
        <span
          data-state={checked ? 'checked' : 'unchecked'}
          className={cn(thumbVariants({ size }))}
        />
      </button>
    );

    if (label || description) {
      return (
        <div className="flex items-start space-x-3">
          {toggleElement}
          <div className="flex flex-col">
            {label && (
              <label
                className={cn(
                  'text-sm font-medium leading-none',
                  'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  'text-zen-ink'
                )}
                onClick={handleToggle}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-zen-mist mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      );
    }

    return toggleElement;
  }
);

Toggle.displayName = 'Toggle';

// Checkbox component with similar styling
const checkboxVariants = cva(
  [
    'peer h-4 w-4 shrink-0 rounded-sm border',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-zen-water data-[state=checked]:border-zen-water',
    'data-[state=checked]:text-zen-light',
    'border-zen-cloud',
  ]
);

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ 
    className, 
    checked = false, 
    onChange,
    label,
    description,
    disabled,
    indeterminate = false,
    ...props 
  }, ref) => {
    const handleToggle = () => {
      if (!disabled) {
        onChange?.(!checked);
      }
    };

    const checkboxElement = (
      <button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        data-state={
          indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'
        }
        disabled={disabled}
        className={cn(checkboxVariants(), className)}
        onClick={handleToggle}
        ref={ref}
        style={{
          '--zen-water': '#3742fa',
          '--zen-cloud': '#dadada',
          '--zen-light': '#ffffff',
        } as React.CSSProperties}
        {...props}
      >
        {(checked || indeterminate) && (
          <svg
            className="h-3 w-3"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            {indeterminate ? (
              <rect x="2" y="5" width="8" height="2" rx="1" />
            ) : (
              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
        )}
      </button>
    );

    if (label || description) {
      return (
        <div className="flex items-start space-x-3">
          {checkboxElement}
          <div className="flex flex-col">
            {label && (
              <label
                className={cn(
                  'text-sm font-medium leading-none',
                  'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                  'text-zen-ink'
                )}
                onClick={handleToggle}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-zen-mist mt-1">
                {description}
              </p>
            )}
          </div>
        </div>
      );
    }

    return checkboxElement;
  }
);

Checkbox.displayName = 'Checkbox';

export { Toggle, Checkbox, toggleVariants, checkboxVariants };
