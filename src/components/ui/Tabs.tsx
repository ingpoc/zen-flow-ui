import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { createContext } from '../../lib/create-context';
import { getComponentThemeProps } from '../../lib/theme-constants';

// Context for tabs
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
}

const [TabsProvider, useTabsContext] = createContext<TabsContextValue>('Tabs');

// Variants
const tabsListVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md',
    'bg-zen-cloud/30 p-1',
    'text-zen-mist',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'h-10 space-x-1',
        vertical: 'flex-col h-auto space-y-1',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
    },
  }
);

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap',
    'rounded-sm px-3 py-1.5',
    'text-sm font-medium',
    'ring-offset-zen-light',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-zen-water focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'data-[state=active]:bg-zen-light',
    'data-[state=active]:text-zen-void',
    'data-[state=active]:shadow-sm',
    'hover:bg-zen-cloud/50',
    'hover:text-zen-ink',
  ],
  {
    variants: {
      variant: {
        default: '',
        underline: [
          'rounded-none bg-transparent px-0',
          'border-b-2 border-transparent',
          'data-[state=active]:border-zen-water',
          'data-[state=active]:bg-transparent',
          'hover:bg-transparent',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Main Tabs component
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  asChild?: boolean;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    className, 
    value: controlledValue,
    defaultValue,
    onValueChange,
    orientation = 'horizontal',
    children,
    ...props 
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;
    
    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };
    
    return (
      <TabsProvider
        value={{
          value,
          onValueChange: handleValueChange,
          orientation,
        }}
      >
        <div
          ref={ref}
          className={cn('w-full', className)}
          data-orientation={orientation}
          {...props}
        >
          {children}
        </div>
      </TabsProvider>
    );
  }
);

Tabs.displayName = 'Tabs';

// TabsList component
export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
  asChild?: boolean;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, orientation, children, ...props }, ref) => {
    const context = useTabsContext();
    const finalOrientation = orientation || context.orientation;
    
    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={finalOrientation}
        className={cn(
          tabsListVariants({ orientation: finalOrientation }),
          className
        )}
        style={getComponentThemeProps('tabs')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsList.displayName = 'TabsList';

// TabsTrigger component
export interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
  value: string;
  asChild?: boolean;
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, variant, children, ...props }, ref) => {
    const context = useTabsContext();
    const isActive = context.value === value;
    
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-controls={`content-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(tabsTriggerVariants({ variant }), className)}
        onClick={() => context.onValueChange(value)}
        style={getComponentThemeProps('tabs')}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

// TabsContent component
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
  asChild?: boolean;
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, forceMount, children, ...props }, ref) => {
    const context = useTabsContext();
    const isActive = context.value === value;
    
    if (!forceMount && !isActive) {
      return null;
    }
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-labelledby={`trigger-${value}`}
        id={`content-${value}`}
        data-state={isActive ? 'active' : 'inactive'}
        className={cn(
          'mt-4 ring-offset-zen-light',
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-zen-water focus-visible:ring-offset-2',
          'data-[state=inactive]:hidden',
          'animate-in fade-in-0 zoom-in-95',
          'data-[state=active]:animate-in',
          'data-[state=inactive]:animate-out',
          className
        )}
        style={getComponentThemeProps('tabs')}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
