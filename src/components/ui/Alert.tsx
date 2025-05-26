import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { getComponentThemeProps } from '../../lib/theme-constants';

const alertVariants = cva(
  [
    'relative w-full rounded-lg border p-4',
    'transition-all duration-300',
    '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    '[&>svg+div]:pl-7',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-zen-light border-zen-cloud',
          'text-zen-ink',
        ],
        destructive: [
          'bg-zen-accent/10 border-zen-accent/20',
          'text-zen-accent [&>svg]:text-zen-accent',
        ],
        success: [
          'bg-zen-leaf/10 border-zen-leaf/20',
          'text-zen-leaf [&>svg]:text-zen-leaf',
        ],
        warning: [
          'bg-zen-sun/10 border-zen-sun/20',
          'text-zen-sun [&>svg]:text-zen-sun',
        ],
        info: [
          'bg-zen-water/10 border-zen-water/20',
          'text-zen-water [&>svg]:text-zen-water',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        style={getComponentThemeProps('alert')}
        {...props}
      >
        {icon && (
          <div className="absolute left-4 top-4">
            {icon}
          </div>
        )}
        <div className={cn(icon && 'pl-7')}>
          {children}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn(
          'mb-1 font-medium leading-none tracking-tight',
          'text-zen-void',
          className
        )}
        style={getComponentThemeProps('alert')}
        {...props}
      >
        {children}
      </h5>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          'text-sm [&_p]:leading-relaxed',
          'text-zen-stone',
          className
        )}
        style={getComponentThemeProps('alert')}
        {...props}
      >
        {children}
      </p>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
