import React, { forwardRef, useState, useEffect, useRef, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { createContext } from '../../lib/create-context';
import { getComponentThemeProps } from '../../lib/theme-constants';

// Context for command state
interface CommandContextValue {
  open: boolean;
  value: string;
  search: string;
  setSearch: (search: string) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

const [CommandProvider, useCommandContext] = createContext<CommandContextValue>('Command');

// Variants
const commandVariants = cva(
  [
    'flex h-full w-full flex-col overflow-hidden rounded-md',
    'bg-zen-light text-zen-ink',
  ],
  {
    variants: {
      variant: {
        default: 'border border-zen-cloud',
        ghost: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Types
export interface CommandProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof commandVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  onValueChange?: (value: string) => void;
  filter?: (value: string, search: string) => boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  loadingMessage?: string;
  loading?: boolean;
  fuzzySearch?: boolean;
  searchDebounce?: number;
}

// Fuzzy search function
const fuzzyMatch = (search: string, value: string): boolean => {
  const searchLower = search.toLowerCase();
  const valueLower = value.toLowerCase();
  
  let searchIndex = 0;
  for (let i = 0; i < valueLower.length; i++) {
    if (valueLower[i] === searchLower[searchIndex]) {
      searchIndex++;
      if (searchIndex === searchLower.length) {
        return true;
      }
    }
  }
  return false;
};

// Main Command component
const Command = forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      className,
      variant,
      open = true,
      onOpenChange,
      value = '',
      onValueChange,
      filter,
      searchPlaceholder = 'Search...',
      emptyMessage = 'No results found.',
      loadingMessage = 'Loading...',
      loading = false,
      fuzzySearch = false,
      searchDebounce = 0,
      children,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = useState('');
    const [selectedValue, setSelectedValue] = useState(value);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Debounce search
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(search);
      }, searchDebounce);

      return () => clearTimeout(timer);
    }, [search, searchDebounce]);

    // Handle value changes
    useEffect(() => {
      if (selectedValue !== value) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleValueChange = (newValue: string) => {
      setSelectedValue(newValue);
      onValueChange?.(newValue);
    };

    const contextValue = useMemo(() => ({
      open,
      value: selectedValue,
      search: debouncedSearch,
      setSearch,
      selectedValue,
      setSelectedValue: handleValueChange,
    }), [open, selectedValue, debouncedSearch]);

    return (
      <CommandProvider value={contextValue}>
        <div
          ref={ref}
          className={cn(commandVariants({ variant }), className)}
          {...props}
        >
          {children}
        </div>
      </CommandProvider>
    );
  }
);

Command.displayName = 'Command';

// Command Input
export interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, icon, ...props }, ref) => {
    const { search, setSearch } = useCommandContext();

    return (
      <div className="flex items-center border-b border-zen-cloud px-3">
        {icon || (
          <svg
            className="mr-2 h-4 w-4 shrink-0 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
        <input
          ref={ref}
          type="text"
          className={cn(
            'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none',
            'placeholder:text-zen-mist',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          {...props}
        />
      </div>
    );
  }
);

CommandInput.displayName = 'CommandInput';

// Command List
export interface CommandListProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, label, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
        role="listbox"
        aria-label={label}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandList.displayName = 'CommandList';

// Command Empty
export interface CommandEmptyProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('py-6 text-center text-sm', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandEmpty.displayName = 'CommandEmpty';

// Command Loading
export interface CommandLoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandLoading = forwardRef<HTMLDivElement, CommandLoadingProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('py-6 text-center text-sm', className)}
        {...props}
      >
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-4 w-4 text-zen-mist"
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
          <span>{children}</span>
        </div>
      </div>
    );
  }
);

CommandLoading.displayName = 'CommandLoading';

// Command Group
export interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  heading?: string;
}

const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('overflow-hidden p-1 text-zen-ink', className)}
        {...props}
      >
        {heading && (
          <div className="px-2 py-1.5 text-xs font-medium text-zen-mist">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

CommandGroup.displayName = 'CommandGroup';

// Command Item
export interface CommandItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  value?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
}

const CommandItem = forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, value = '', onSelect, disabled, children, ...props }, ref) => {
    const { selectedValue, setSelectedValue, search } = useCommandContext();
    const isSelected = selectedValue === value;

    const handleSelect = () => {
      if (!disabled) {
        setSelectedValue(value);
        onSelect?.(value);
      }
    };

    // Check if item should be visible based on search
    const isVisible = useMemo(() => {
      if (!search) return true;
      
      const itemText = typeof children === 'string' ? children : value;
      const searchLower = search.toLowerCase();
      const itemLower = itemText.toLowerCase();
      
      // Use fuzzy search if enabled
      if (fuzzyMatch) {
        return fuzzyMatch(search, itemText);
      }
      
      // Otherwise use simple includes
      return itemLower.includes(searchLower);
    }, [search, children, value]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
          'aria-selected:bg-zen-cloud aria-selected:text-zen-void',
          'hover:bg-zen-cloud/50 hover:text-zen-ink',
          disabled && 'pointer-events-none opacity-50',
          isSelected && 'bg-zen-water text-zen-light',
          className
        )}
        role="option"
        aria-selected={isSelected}
        data-disabled={disabled}
        onClick={handleSelect}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CommandItem.displayName = 'CommandItem';

// Command Separator
export interface CommandSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

const CommandSeparator = forwardRef<HTMLDivElement, CommandSeparatorProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('-mx-1 h-px bg-zen-cloud', className)}
        {...props}
      />
    );
  }
);

CommandSeparator.displayName = 'CommandSeparator';

// Command Dialog (for modal command palettes)
export interface CommandDialogProps extends CommandProps {
  container?: HTMLElement;
}

const CommandDialog = ({ children, open, onOpenChange, ...props }: CommandDialogProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange?.(!open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-zen-void/50 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          onOpenChange?.(false);
        }
      }}
    >
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 p-6">
        <Command
          className="rounded-lg border shadow-lg"
          {...props}
        >
          {children}
        </Command>
      </div>
    </div>
  );
};

CommandDialog.displayName = 'CommandDialog';

// Apply theme styles to all components
[Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandDialog].forEach((Component) => {
  const OriginalComponent = Component;
  Object.assign(Component, forwardRef<any, any>(({ style, ...props }, ref) => (
    <OriginalComponent ref={ref} style={{ ...getComponentThemeProps('command'), ...style }} {...props} />
  )));
});

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
  commandVariants,
};
