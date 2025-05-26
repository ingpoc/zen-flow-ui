import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { createContext } from '../../lib/create-context';
import { getComponentThemeProps } from '../../lib/theme-constants';

// Variants for styling
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

// Types
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Context for composite components
interface SelectContextValue {
  value?: string;
  onChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled?: boolean;
  focusedValue?: string;
  setFocusedValue: (value: string) => void;
}

const [SelectProvider, useSelectContext] = createContext<SelectContextValue>('Select');

// Main Select component with compatibility layer
export interface SelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof selectVariants> {
  // Zen Flow API
  options?: SelectOption[];
  onChange?: (value: string) => void;
  value?: string;
  
  // shadcn/ui compatibility
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
  defaultValue?: string;
  
  // Common props
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ 
    className, 
    variant, 
    size,
    options,
    onChange,
    onValueChange,
    value,
    defaultValue,
    children,
    placeholder = 'Select an option...',
    label,
    error,
    helperText,
    disabled,
    open: controlledOpen,
    onOpenChange,
    ...props 
  }, ref) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const [focusedValue, setFocusedValue] = useState('');
    
    // Support both controlled and uncontrolled modes
    const isControlled = value !== undefined;
    const selectedValue = isControlled ? value : uncontrolledValue;
    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
    
    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
      onValueChange?.(newValue);
    };
    
    const handleOpenChange = (open: boolean) => {
      if (controlledOpen === undefined) {
        setUncontrolledOpen(open);
      }
      onOpenChange?.(open);
    };

    // If children provided, use composite pattern
    if (children) {
      return (
        <SelectProvider
          value={{
            value: selectedValue,
            onChange: handleChange,
            open: isOpen,
            setOpen: handleOpenChange,
            disabled,
            focusedValue,
            setFocusedValue,
          }}
        >
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
            {children}
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
        </SelectProvider>
      );
    }

    // Otherwise use simple API (Zen Flow style)
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    const selectedOption = options?.find(opt => opt.value === selectedValue);
    const finalVariant = error ? 'error' : variant;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current && 
          !selectRef.current.contains(event.target as Node) &&
          contentRef.current &&
          !contentRef.current.contains(event.target as Node)
        ) {
          handleOpenChange(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [isOpen]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled || !options) return;

      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!isOpen) {
            handleOpenChange(true);
          } else if (focusedIndex >= 0) {
            const enabledOptions = options.filter(opt => !opt.disabled);
            const option = enabledOptions[focusedIndex];
            if (option) {
              handleChange(option.value);
              handleOpenChange(false);
            }
          }
          break;
        case 'Escape':
          handleOpenChange(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            handleOpenChange(true);
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
        handleChange(option.value);
        handleOpenChange(false);
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
          onClick={() => !disabled && handleOpenChange(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          style={getComponentThemeProps('select')}
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

        {isOpen && options && (
          <div
            ref={contentRef}
            className={cn(
              selectContentVariants(),
              'absolute top-full left-0 right-0 mt-1 z-50'
            )}
            style={getComponentThemeProps('select')}
            data-state="open"
            data-side="bottom"
          >
            <div className="max-h-96 overflow-auto p-1">
              {options.map((option, index) => {
                const enabledOptions = options.filter(opt => !opt.disabled);
                const enabledIndex = enabledOptions.indexOf(option);
                const isFocused = focusedIndex === enabledIndex && !option.disabled;
                
                return (
                  <div
                    key={option.value}
                    className={cn(
                      selectItemVariants(),
                      isFocused && 'bg-zen-cloud text-zen-void',
                      selectedValue === option.value && 'bg-zen-water text-zen-light'
                    )}
                    data-disabled={option.disabled}
                    onClick={() => handleOptionClick(option)}
                  >
                    <span className="flex-1">{option.label}</span>
                    {selectedValue === option.value && (
                      <svg
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                );
              })}
              
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

// Composite components for shadcn/ui compatibility
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const context = useSelectContext();
    
    return (
      <button
        ref={ref}
        type="button"
        className={cn(selectVariants({ variant: 'default', size: 'default' }), className)}
        onClick={() => !context.disabled && context.setOpen(!context.open)}
        disabled={context.disabled}
        aria-expanded={context.open}
        aria-haspopup="listbox"
        style={getComponentThemeProps('select')}
        {...props}
      >
        {children}
        <svg
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            context.open && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }
);

SelectTrigger.displayName = 'SelectTrigger';

export interface SelectValueProps extends React.HTMLAttributes<HTMLSpanElement> {
  placeholder?: string;
  asChild?: boolean;
}

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, placeholder = 'Select an option...', ...props }, ref) => {
    const context = useSelectContext();
    
    return (
      <span
        ref={ref}
        className={cn(
          'flex-1 text-left',
          !context.value && 'text-zen-mist',
          className
        )}
        {...props}
      >
        {context.value || placeholder}
      </span>
    );
  }
);

SelectValue.displayName = 'SelectValue';

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'popper' | 'item-aligned';
  side?: 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, position = 'popper', side = 'bottom', align = 'center', sideOffset = 4, ...props }, ref) => {
    const context = useSelectContext();
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
          context.setOpen(false);
        }
      };

      if (context.open) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }
    }, [context.open, context.setOpen]);
    
    if (!context.open) return null;
    
    return (
      <div
        ref={ref || contentRef}
        className={cn(
          selectContentVariants(),
          'absolute top-full left-0 right-0 z-50',
          className
        )}
        style={{
          marginTop: `${sideOffset}px`,
          ...getComponentThemeProps('select'),
        }}
        data-state="open"
        data-side={side}
        {...props}
      >
        <div className="max-h-96 overflow-auto p-1">
          {children}
        </div>
      </div>
    );
  }
);

SelectContent.displayName = 'SelectContent';

export interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  asChild?: boolean;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, disabled, asChild, ...props }, ref) => {
    const context = useSelectContext();
    const isSelected = context.value === value;
    const isFocused = context.focusedValue === value;
    
    const handleClick = () => {
      if (!disabled) {
        context.onChange(value);
        context.setOpen(false);
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          selectItemVariants(),
          isFocused && 'bg-zen-cloud text-zen-void',
          isSelected && 'bg-zen-water text-zen-light',
          className
        )}
        data-disabled={disabled}
        onClick={handleClick}
        onMouseEnter={() => context.setFocusedValue(value)}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {isSelected && (
          <svg
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    );
  }
);

SelectItem.displayName = 'SelectItem';

export { Select, selectVariants };
