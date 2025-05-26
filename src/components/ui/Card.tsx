import React, { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { getComponentThemeProps } from '../../lib/theme-constants';

const cardVariants = cva(
  [
    'relative overflow-hidden',
    'bg-zen-light rounded-lg',
    'transition-all duration-300 ease-out',
    'shadow-md',
    // Zen Flow accent bar effect
    'before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px]',
    'before:bg-gradient-to-r before:from-zen-accent before:to-zen-water',
    'before:transform before:translate-x-[-100%]',
    'before:transition-transform before:duration-500 before:ease-out',
    'hover:before:translate-x-0',
    'hover:translate-y-[-4px] hover:shadow-xl',
  ],
  {
    variants: {
      variant: {
        default: '',
        outlined: 'border border-zen-cloud bg-zen-light',
        elevated: 'shadow-lg',
        flat: 'shadow-none',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        default: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'default',
    },
  }
);

const cardHeaderVariants = cva([
  'flex flex-col space-y-1.5',
  'pb-4',
]);

const cardTitleVariants = cva([
  'text-xl font-semibold leading-none tracking-tight',
  'text-zen-void',
]);

const cardDescriptionVariants = cva([
  'text-sm text-zen-stone',
  'leading-relaxed',
]);

const cardContentVariants = cva([
  'text-zen-stone',
  'leading-relaxed',
]);

const cardFooterVariants = cva([
  'flex items-center',
  'pt-4',
]);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      style={getComponentThemeProps('card')}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardHeaderVariants(), className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn(cardTitleVariants(), className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn(cardDescriptionVariants(), className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardContentVariants(), className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardFooterVariants(), className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
