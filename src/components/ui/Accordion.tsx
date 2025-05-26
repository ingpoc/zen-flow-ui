import React, { forwardRef, useState, useRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const accordionVariants = cva([
  'w-full',
]);

const accordionItemVariants = cva([
  'border-b border-zen-cloud last:border-b-0',
]);

const accordionTriggerVariants = cva([
  'flex flex-1 items-center justify-between py-4 px-6',
  'font-medium transition-all duration-300',
  'hover:bg-zen-cloud/30',
  'focus:outline-none focus:ring-2 focus:ring-zen-water focus:ring-offset-2',
  'text-left cursor-pointer',
  'text-zen-ink',
  '[&[data-state=open]>svg]:rotate-180',
]);

const accordionContentVariants = cva([
  'overflow-hidden transition-all duration-300 ease-out',
  'data-[state=closed]:animate-accordion-up',
  'data-[state=open]:animate-accordion-down',
]);

export interface AccordionItemData {
  value: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  type?: 'single' | 'multiple';
  items: AccordionItemData[];
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ 
    className, 
    type = 'single',
    items,
    defaultValue,
    value: controlledValue,
    onValueChange,
    collapsible = false,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(() => {
      if (controlledValue !== undefined) return controlledValue;
      if (defaultValue !== undefined) return defaultValue;
      return type === 'multiple' ? [] : '';
    });

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (newValue: string | string[]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const toggleItem = (itemValue: string) => {
      if (type === 'single') {
        const newValue = value === itemValue && collapsible ? '' : itemValue;
        handleValueChange(newValue);
      } else {
        const currentArray = Array.isArray(value) ? value : [];
        const newValue = currentArray.includes(itemValue)
          ? currentArray.filter(v => v !== itemValue)
          : [...currentArray, itemValue];
        handleValueChange(newValue);
      }
    };

    const isItemOpen = (itemValue: string) => {
      if (type === 'single') {
        return value === itemValue;
      }
      return Array.isArray(value) && value.includes(itemValue);
    };

    return (
      <div
        ref={ref}
        className={cn(accordionVariants(), className)}
        {...props}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            title={item.title}
            content={item.content}
            disabled={item.disabled}
            isOpen={isItemOpen(item.value)}
            onToggle={() => toggleItem(item.value)}
          />
        ))}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';

interface AccordionItemProps {
  value: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  title,
  content,
  disabled = false,
  isOpen,
  onToggle,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className={cn(accordionItemVariants())} data-state={isOpen ? 'open' : 'closed'}>
      <h3>
        <button
          className={cn(
            accordionTriggerVariants(),
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          data-state={isOpen ? 'open' : 'closed'}
          disabled={disabled}
          onClick={!disabled ? onToggle : undefined}
          onKeyDown={!disabled ? handleKeyDown : undefined}
          aria-expanded={isOpen}
          aria-controls={`accordion-content-${value}`}
          id={`accordion-trigger-${value}`}
        >
          <span className="flex-1 text-left">{title}</span>
          <svg
            className="h-4 w-4 shrink-0 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      
      <div
        ref={contentRef}
        className={cn(
          accordionContentVariants(),
          'transition-all duration-300 ease-out overflow-hidden',
          isOpen ? 'h-auto' : 'h-0'
        )}
        data-state={isOpen ? 'open' : 'closed'}
        id={`accordion-content-${value}`}
        role="region"
        aria-labelledby={`accordion-trigger-${value}`}
        style={isOpen ? { height: contentRef.current?.scrollHeight || 'auto' } : { height: 0 }}
      >
        <div className="px-6 pb-4 text-zen-stone">
          {content}
        </div>
      </div>
    </div>
  );
};

// Separate components for more granular control
const AccordionRoot = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(accordionVariants(), className)} {...props} />
));
AccordionRoot.displayName = 'AccordionRoot';

const AccordionItemComponent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(accordionItemVariants(), className)} {...props} />
));
AccordionItemComponent.displayName = 'AccordionItem';

const AccordionTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => (
  <h3>
    <button
      ref={ref}
      className={cn(accordionTriggerVariants(), className)}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </h3>
));
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(accordionContentVariants(), className)}
    {...props}
  >
    <div className="px-6 pb-4">{children}</div>
  </div>
));
AccordionContent.displayName = 'AccordionContent';

export {
  Accordion,
  AccordionRoot,
  AccordionItemComponent as AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
};
