import React, { forwardRef, useId } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn, shouldReduceMotion } from '../../lib/utils';
import { createContext } from '../../lib/create-context';
import { getComponentThemeProps } from '../../lib/theme-constants';

// Context for RadioGroup
interface RadioGroupContextValue {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name: string;
}

const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContextValue>('RadioGroup');

// Variants
const radioGroupVariants = cva(
  'grid gap-2',
  {
    variants: {
      orientation: {
        vertical: 'grid-cols-1',
        horizontal: 'grid-flow-col auto-cols-max gap-4',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

const radioGroupItemVariants = cva(
  [
    'aspect-square h-4 w-4 rounded-full border',
    'ring-offset-zen-light',
    'focus:outline-none focus-visible:ring-2',
    'focus-visible:ring-zen-water focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'border-zen-mist',
          'data-[state=checked]:border-zen-water',
          'data-[state=checked]:bg-zen-water',
        ],
        accent: [
          'border-zen-accent/50',
          'data-[state=checked]:border-zen-accent',
          'data-[state=checked]:bg-zen-accent',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Types
export interface RadioGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof radioGroupVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  required?: boolean;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export interface RadioGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'>,
    VariantProps<typeof radioGroupItemVariants> {
  value: string;
  id?: string;
}

// Motion variants
const indicatorMotionVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// RadioGroup component
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      className,
      orientation,
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled,
      name,
      required,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const generatedName = useId();
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    
    const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
    
    const handleValueChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupProvider
        value={{
          value,
          onValueChange: handleValueChange,
          disabled,
          name: name || generatedName,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-required={required}
          aria-disabled={disabled}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          className={cn(radioGroupVariants({ orientation }), className)}
          {...props}
        />
      </RadioGroupProvider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

// RadioGroupItem component
const RadioGroupItem = forwardRef<HTMLButtonElement, RadioGroupItemProps>(
  ({ className, variant, value, id, disabled, ...props }, ref) => {
    const context = useRadioGroupContext();
    const generatedId = useId();
    const elementId = id || generatedId;
    const isDisabled = disabled || context.disabled;
    const isChecked = context.value === value;
    const reduceMotion = shouldReduceMotion();

    return (
      <div className="flex items-center space-x-2">
        <button
          ref={ref}
          id={elementId}
          role="radio"
          type="button"
          aria-checked={isChecked}
          data-state={isChecked ? 'checked' : 'unchecked'}
          data-disabled={isDisabled ? '' : undefined}
          disabled={isDisabled}
          className={cn(
            radioGroupItemVariants({ variant }),
            'relative',
            className
          )}
          onClick={() => {
            if (!isDisabled) {
              context.onValueChange?.(value);
            }
          }}
          style={getComponentThemeProps('radioGroup')}
          {...props}
        >
          <motion.span
            className={cn(
              'flex items-center justify-center',
              'absolute inset-0'
            )}
            initial={false}
            animate={isChecked ? 'visible' : 'hidden'}
            variants={!reduceMotion ? indicatorMotionVariants : undefined}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-zen-light" />
          </motion.span>
        </button>
      </div>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroupItem';

// RadioGroupLabel - Helper component for labeling radio items
export interface RadioGroupLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const RadioGroupLabel = forwardRef<HTMLLabelElement, RadioGroupLabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        'text-zen-ink',
        className
      )}
      style={getComponentThemeProps('radioGroup')}
      {...props}
    />
  )
);

RadioGroupLabel.displayName = 'RadioGroupLabel';

// RadioGroupDescription - Helper component for describing radio items
export interface RadioGroupDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const RadioGroupDescription = forwardRef<HTMLParagraphElement, RadioGroupDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-zen-mist', className)}
      style={getComponentThemeProps('radioGroup')}
      {...props}
    />
  )
);

RadioGroupDescription.displayName = 'RadioGroupDescription';

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupDescription,
  radioGroupVariants,
  radioGroupItemVariants,
};
