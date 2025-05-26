import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// ============================================================================
// VARIANTS
// ============================================================================

const breadcrumbVariants = cva([
  'flex items-center space-x-1 text-sm text-zen-mist',
]);

const breadcrumbItemVariants = cva([
  'inline-flex items-center transition-colors duration-200',
  'hover:text-zen-ink focus:outline-none focus:ring-2 focus:ring-zen-water/20 rounded',
], {
  variants: {
    variant: {
      default: 'text-zen-mist hover:text-zen-ink',
      current: 'text-zen-ink font-medium',
      link: 'text-zen-water hover:text-zen-water/80 cursor-pointer',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const breadcrumbSeparatorVariants = cva([
  'flex items-center text-zen-cloud mx-1',
]);

// ============================================================================
// TYPES
// ============================================================================

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  current?: boolean;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  showRoot?: boolean;
  renderItem?: (item: BreadcrumbItem, index: number, isLast: boolean) => React.ReactNode;
}

// ============================================================================
// COMPONENTS
// ============================================================================

const BreadcrumbSeparator: React.FC<{ children?: React.ReactNode }> = ({ 
  children = '/' 
}) => (
  <span className={breadcrumbSeparatorVariants()} aria-hidden="true">
    {children}
  </span>
);

const BreadcrumbCollapsedIndicator: React.FC<{ 
  onClick: () => void;
  itemCount: number;
}> = ({ onClick, itemCount }) => (
  <button
    onClick={onClick}
    className={cn(
      breadcrumbItemVariants({ variant: 'link' }),
      'px-2 py-1 rounded hover:bg-zen-cloud/50'
    )}
    aria-label={`Show ${itemCount} hidden items`}
    type="button"
  >
    <span className="text-lg leading-none">⋯</span>
  </button>
);

const BreadcrumbItemComponent: React.FC<{
  item: BreadcrumbItem;
  variant?: 'default' | 'current' | 'link';
  onClick?: () => void;
}> = ({ item, variant = 'default', onClick }) => {
  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    } else if (onClick) {
      onClick();
    }
  };

  const content = (
    <>
      {item.icon && <span className="mr-1">{item.icon}</span>}
      {item.label}
    </>
  );

  if (item.current || variant === 'current') {
    return (
      <span 
        className={breadcrumbItemVariants({ variant: 'current' })}
        aria-current="page"
      >
        {content}
      </span>
    );
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        className={breadcrumbItemVariants({ variant: 'link' })}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  if (item.onClick || onClick) {
    return (
      <button
        onClick={handleClick}
        className={breadcrumbItemVariants({ variant: 'link' })}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <span className={breadcrumbItemVariants({ variant })}>
      {content}
    </span>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ 
    className,
    items,
    separator = '/',
    maxItems,
    itemsBeforeCollapse = 1,
    itemsAfterCollapse = 1,
    renderItem,
    ...props 
  }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Determine which items to show
    const shouldCollapse = maxItems && items.length > maxItems;
    const visibleItems = React.useMemo(() => {
      if (!shouldCollapse || isExpanded) {
        return items;
      }

      const beforeItems = items.slice(0, itemsBeforeCollapse);
      const afterItems = items.slice(-itemsAfterCollapse);
      const hiddenCount = items.length - itemsBeforeCollapse - itemsAfterCollapse;

      return [
        ...beforeItems,
        { 
          label: '...', 
          isCollapsed: true, 
          hiddenCount 
        } as BreadcrumbItem & { isCollapsed: boolean; hiddenCount: number },
        ...afterItems,
      ];
    }, [items, shouldCollapse, isExpanded, itemsBeforeCollapse, itemsAfterCollapse]);

    const handleExpandClick = () => {
      setIsExpanded(true);
    };

    return (
      <nav 
        ref={ref}
        className={cn(breadcrumbVariants(), className)}
        aria-label="Breadcrumb"
        {...props}
      >
        <ol className="flex items-center space-x-1" role="list">
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1;
            const isCollapsedIndicator = 'isCollapsed' in item && item.isCollapsed;
            
            return (
              <React.Fragment key={index}>
                <li className="flex items-center">
                  {isCollapsedIndicator ? (
                    <BreadcrumbCollapsedIndicator
                      onClick={handleExpandClick}
                      itemCount={(item as any).hiddenCount}
                    />
                  ) : renderItem ? (
                    renderItem(item, index, isLast)
                  ) : (
                    <BreadcrumbItemComponent
                      item={item}
                      variant={isLast ? 'current' : 'link'}
                    />
                  )}
                </li>
                
                {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

// ============================================================================
// CONVENIENCE HOOKS
// ============================================================================

/**
 * Hook to generate breadcrumb items from pathname
 */
export function useBreadcrumbFromPath(
  pathname: string,
  labelMap?: Record<string, string>
): BreadcrumbItem[] {
  return React.useMemo(() => {
    const segments = pathname.split('/').filter(Boolean);
    
    const items: BreadcrumbItem[] = [
      { label: labelMap?.[''] || 'Home', href: '/' },
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      items.push({
        label: labelMap?.[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
        href: isLast ? undefined : currentPath,
        current: isLast,
      });
    });

    return items;
  }, [pathname, labelMap]);
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Breadcrumb,
  BreadcrumbSeparator,
  BreadcrumbItemComponent as BreadcrumbItem,
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
}; 