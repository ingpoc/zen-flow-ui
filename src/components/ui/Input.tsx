import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const inputVariants = cva(
  [
    'flex w-full rounded border',
    'bg-zen-light px-4 py-3',
    'text-base transition-all duration-300',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-zen-mist',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-zen-cloud',
          'focus:border-zen-water focus:ring-zen-water/10',
        ],
        error: [
          'border-zen-accent',
          'focus:border-zen-accent focus:ring-zen-accent/10',
        ],
        success: [
          'border-zen-leaf',
          'focus:border-zen-leaf focus:ring-zen-leaf/10',
        ],
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        default: 'h-12 px-4',
        lg: 'h-14 px-5 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const labelVariants = cva(
  [
    'absolute left-4 transition-all duration-300 pointer-events-none',
    'bg-zen-light px-1',
  ],
  {
    variants: {
      floating: {
        true: 'top-0 text-sm text-zen-water',
        false: 'top-1/2 transform -translate-y-1/2 text-zen-mist',
      },
      variant: {
        default: '',
        error: 'text-zen-accent',
        success: 'text-zen-leaf',
      },
    },
    defaultVariants: {
      floating: false,
      variant: 'default',
    },
  }
);

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    type = 'text',
    label,
    helperText,
    error,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = value !== undefined ? String(value).length > 0 : false;
    const shouldFloat = focused || hasValue || props.placeholder;
    
    const finalVariant = error ? 'error' : variant;

    return (
      <div className="relative w-full">
        <div className="relative">
          <input
            type={type}
            className={cn(inputVariants({ variant: finalVariant, size }), className)}
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            style={{
              '--zen-light': '#ffffff',
              '--zen-cloud': '#dadada',
              '--zen-water': '#3742fa',
              '--zen-accent': '#ff4757',
              '--zen-leaf': '#26de81',
              '--zen-mist': '#8a8a8a',
            } as React.CSSProperties}
            {...props}
          />
          {label && (
            <label
              className={cn(
                labelVariants({ 
                  floating: shouldFloat, 
                  variant: finalVariant 
                })
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || error) && (
          <p
            className={cn(
              'mt-2 text-sm',
              error ? 'text-zen-accent' : 'text-zen-mist'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea component with similar styling
const textareaVariants = cva(
  [
    'flex min-h-[120px] w-full rounded border',
    'bg-zen-light px-4 py-3',
    'text-base transition-all duration-300',
    'placeholder:text-zen-mist',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'resize-vertical',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-zen-cloud',
          'focus:border-zen-water focus:ring-zen-water/10',
        ],
        error: [
          'border-zen-accent',
          'focus:border-zen-accent focus:ring-zen-accent/10',
        ],
        success: [
          'border-zen-leaf',
          'focus:border-zen-leaf focus:ring-zen-leaf/10',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant,
    label,
    helperText,
    error,
    value,
    onChange,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const hasValue = value !== undefined ? String(value).length > 0 : false;
    const shouldFloat = focused || hasValue || props.placeholder;
    
    const finalVariant = error ? 'error' : variant;

    return (
      <div className="relative w-full">
        <div className="relative">
          <textarea
            className={cn(textareaVariants({ variant: finalVariant }), className)}
            ref={ref}
            value={value}
            onChange={onChange}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            style={{
              '--zen-light': '#ffffff',
              '--zen-cloud': '#dadada',
              '--zen-water': '#3742fa',
              '--zen-accent': '#ff4757',
              '--zen-leaf': '#26de81',
              '--zen-mist': '#8a8a8a',
            } as React.CSSProperties}
            {...props}
          />
          {label && (
            <label
              className={cn(
                labelVariants({ 
                  floating: shouldFloat, 
                  variant: finalVariant 
                })
              )}
            >
              {label}
            </label>
          )}
        </div>
        
        {(helperText || error) && (
          <p
            className={cn(
              'mt-2 text-sm',
              error ? 'text-zen-accent' : 'text-zen-mist'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Input, Textarea, inputVariants, textareaVariants };
