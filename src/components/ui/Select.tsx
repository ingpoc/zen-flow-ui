import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const selectVariants = cva(
  [
    'flex h-12 w-full items-center justify-between rounded border',
    'bg-zen-light px-4 py-3 text-sm',
    'transition-all duration-300',
    'placeholder:text-zen-mist',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'cursor-pointer',
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

const selectContentVariants = cva([
  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border',
  'bg-zen-light text-zen-ink shadow-md',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  'data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
]);

const selectItemVariants = cva([
  'relative flex w-full cursor-pointer select-none items-center',
  'rounded-sm py-1.5 px-2 text-sm outline-none',
  'transition-colors duration-200',
  'focus:bg-zen-cloud focus:text-zen-void',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
  'hover:bg-zen-cloud/50',
]);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ 
    className, 
    variant, 
    size,
    options,
    value,
    onChange,
    placeholder = 'Select an option...',
    label,
    error,
    helperText,
    disabled,
    ...props 
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const selectedOption = options.find(opt => opt.value === value);
    const finalVariant = error ? 'error' : variant;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current && 
          !selectRef.current.contains(event.target as Node) &&
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (focusedIndex >= 0) {
            const option = options.filter(opt => !opt.disabled)[focusedIndex];
            if (option) {
              onChange?.(option.value);
              setIsOpen(false);
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            const enabledOptions = options.filter(opt => !opt.disabled);
            setFocusedIndex(prev => 
              prev < enabledOptions.length - 1 ? prev + 1 : 0
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen) {
            const enabledOptions = options.filter(opt => !opt.disabled);
            setFocusedIndex(prev => 
              prev > 0 ? prev - 1 : enabledOptions.length - 1
            );
          }
          break;
      }
    };

    const handleOptionClick = (option: SelectOption) => {
      if (!option.disabled) {
        onChange?.(option.value);
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    return (
      <div className="relative w-full">
        {label && (
          <label
            className={cn(
              'block text-sm font-medium mb-2',
              error ? 'text-zen-accent' : 'text-zen-ink'
            )}
          >
            {label}
          </label>
        )}
        
        <button
          ref={ref || selectRef}
          type="button"
          className={cn(selectVariants({ variant: finalVariant, size }), className)}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          style={{
            '--zen-light': '#ffffff',
            '--zen-cloud': '#dadada',
            '--zen-water': '#3742fa',
            '--zen-accent': '#ff4757',
            '--zen-mist': '#8a8a8a',
            '--zen-ink': '#1a1a1a',
            '--zen-void': '#0a0a0a',
          } as React.CSSProperties}
          {...props}
        >
          <span className={cn(
            'flex-1 text-left',
            !selectedOption && 'text-zen-mist'
          )}>
            {selectedOption?.label || placeholder}
          </span>
          
          <svg
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            ref={contentRef}
            className={cn(selectContentVariants())}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              zIndex: 50,
              '--zen-light': '#ffffff',
              '--zen-ink': '#1a1a1a',
              '--zen-cloud': '#dadada',
              '--zen-void': '#0a0a0a',
            } as React.CSSProperties}
            data-state="open"
            data-side="bottom"
          >
            <div className="max-h-96 overflow-auto p-1">
              {options.map((option, index) => (
                <div
                  key={option.value}
                  className={cn(
                    selectItemVariants(),
                    focusedIndex === options.filter(opt => !opt.disabled).indexOf(option) && 
                    'bg-zen-cloud text-zen-void',
                    value === option.value && 'bg-zen-water text-zen-light'
                  )}
                  data-disabled={option.disabled}
                  onClick={() => handleOptionClick(option)}
                >
                  <span className="flex-1">{option.label}</span>
                  {value === option.value && (
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              ))}
              
              {options.length === 0 && (
                <div className="py-6 text-center text-sm text-zen-mist">
                  No options available
                </div>
              )}
            </div>
          </div>
        )}
        
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

Select.displayName = 'Select';

export { Select, selectVariants };
