import React, { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn, shouldReduceMotion } from '../../lib/utils';
import type { TextareaProps } from '../../types';

// ============================================================================
// TEXTAREA VARIANTS
// ============================================================================

const textareaVariants = cva(
  [
    'flex w-full rounded-lg border bg-background px-3 py-2',
    'text-sm placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200',
    'resize-none', // We'll handle resize programmatically
  ],
  {
    variants: {
      variant: {
        default: [
          'border-input',
          'focus-visible:border-ring',
          'hover:border-ring/50',
        ],
        error: [
          'border-destructive',
          'focus-visible:border-destructive',
          'focus-visible:ring-destructive/20',
          'text-destructive',
        ],
        success: [
          'border-success',
          'focus-visible:border-success',
          'focus-visible:ring-success/20',
          'text-success',
        ],
      },
      size: {
        sm: 'text-xs px-2 py-1.5 min-h-[60px]',
        default: 'text-sm px-3 py-2 min-h-[80px]',
        lg: 'text-base px-4 py-3 min-h-[100px]',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      resize: 'none',
    },
  }
);

const labelVariants = cva(
  [
    'text-sm font-medium leading-none',
    'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  ],
  {
    variants: {
      variant: {
        default: 'text-foreground',
        error: 'text-destructive',
        success: 'text-success',
      },
      size: {
        sm: 'text-xs',
        default: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const helperTextVariants = cva(
  [
    'text-xs leading-tight',
  ],
  {
    variants: {
      variant: {
        default: 'text-muted-foreground',
        error: 'text-destructive',
        success: 'text-success',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// ============================================================================
// AUTO-RESIZE HOOK
// ============================================================================

const useAutoResize = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  value: string | undefined,
  autoResize: boolean,
  minRows: number,
  maxRows: number
) => {
  useEffect(() => {
    if (!autoResize || !textareaRef.current) return;

    const textarea = textareaRef.current;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate the line height
    const computedStyle = window.getComputedStyle(textarea);
    const lineHeight = parseInt(computedStyle.lineHeight, 10);
    const paddingTop = parseInt(computedStyle.paddingTop, 10);
    const paddingBottom = parseInt(computedStyle.paddingBottom, 10);
    const borderTop = parseInt(computedStyle.borderTopWidth, 10);
    const borderBottom = parseInt(computedStyle.borderBottomWidth, 10);
    
    // Calculate min and max heights
    const minHeight = lineHeight * minRows + paddingTop + paddingBottom + borderTop + borderBottom;
    const maxHeight = lineHeight * maxRows + paddingTop + paddingBottom + borderTop + borderBottom;
    
    // Set the height based on content, respecting min/max
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    
    textarea.style.height = `${newHeight}px`;
    
    // Show scrollbar if content exceeds maxHeight
    textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [value, autoResize, minRows, maxRows]);
};

// ============================================================================
// TEXTAREA COMPONENT
// ============================================================================

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant = 'default',
    size = 'default',
    resize = 'none',
    label,
    error,
    helperText,
    autoResize = false,
    minRows = 3,
    maxRows = 10,
    id,
    value,
    onChange,
    ...props
  }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const reduceMotion = shouldReduceMotion();
    
    // Use imperative handle to expose the textarea ref
    useImperativeHandle(ref, () => internalRef.current!, []);
    
    // Auto-resize functionality
    useAutoResize(
      internalRef,
      typeof value === 'string' ? value : props.defaultValue as string,
      autoResize,
      minRows,
      maxRows
    );
    
    // Generate unique ID if not provided
    const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    
    // Determine the variant based on error state
    const currentVariant = error ? 'error' : variant;
    
    const textareaElement = (
      <textarea
        ref={internalRef}
        id={textareaId}
        className={cn(
          textareaVariants({ variant: currentVariant, size, resize }),
          className
        )}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={cn(
          errorId,
          helperId
        ).trim() || undefined}
        {...props}
      />
    );

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={textareaId}
            className={cn(
              labelVariants({ variant: currentVariant, size })
            )}
          >
            {label}
            {props.required && (
              <span className="ml-1 text-destructive" aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        
        <div className="relative">
          {!reduceMotion ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
            >
              {textareaElement}
            </motion.div>
          ) : (
            textareaElement
          )}
        </div>
        
        {(error || helperText) && (
          <div className="space-y-1">
            {error && (
              <motion.p
                id={errorId}
                className={cn(helperTextVariants({ variant: 'error' }))}
                initial={!reduceMotion ? { opacity: 0, y: -4 } : false}
                animate={!reduceMotion ? { opacity: 1, y: 0 } : false}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                role="alert"
                aria-live="polite"
              >
                {error}
              </motion.p>
            )}
            
            {helperText && !error && (
              <p
                id={helperId}
                className={cn(helperTextVariants({ variant: currentVariant }))}
              >
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// ============================================================================
// EXPORTS
// ============================================================================

export { Textarea, textareaVariants };
export type { TextareaProps } from '../../types'; 