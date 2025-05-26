import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn, shouldReduceMotion } from '../../lib/utils';
import { createContext } from '../../lib/create-context';
import { getComponentThemeProps } from '../../lib/theme-constants';

// Context
interface TooltipContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const [TooltipContextProvider, useTooltipContext] = createContext<TooltipContextValue>('Tooltip');

// Global tooltip provider context for delays
interface TooltipProviderContextValue {
  delayDuration: number;
  skipDelayDuration: number;
  disableHoverableContent: boolean;
}

const [GlobalTooltipProvider, useGlobalTooltipContext] = createContext<TooltipProviderContextValue>('TooltipProvider');

// Variants
const tooltipContentVariants = cva(
  [
    'z-50 overflow-hidden rounded-md px-3 py-1.5',
    'bg-zen-void text-zen-light text-sm',
    'shadow-md animate-in fade-in-0 zoom-in-95',
    'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
    'data-[state=closed]:zoom-out-95',
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ],
  {
    variants: {
      variant: {
        default: 'bg-zen-void text-zen-light',
        inverted: 'bg-zen-light text-zen-void border border-zen-cloud',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Motion variants
const tooltipMotionVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
};

// Types
export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
}

export interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

export interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

export interface TooltipContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDrag' | 'onDragEnd'>,
    VariantProps<typeof tooltipContentVariants> {
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null;
  collisionPadding?: number | { top?: number; right?: number; bottom?: number; left?: number };
  sticky?: 'partial' | 'always';
  hideWhenDetached?: boolean;
}

// Utility function to calculate position
const calculatePosition = (
  triggerRect: DOMRect,
  contentRect: DOMRect,
  side: 'top' | 'right' | 'bottom' | 'left',
  sideOffset: number,
  align: 'start' | 'center' | 'end',
  alignOffset: number,
  avoidCollisions: boolean,
  collisionPadding: number | { top?: number; right?: number; bottom?: number; left?: number }
) => {
  let x = 0;
  let y = 0;
  let finalSide = side;
  
  const padding = typeof collisionPadding === 'number' 
    ? { top: collisionPadding, right: collisionPadding, bottom: collisionPadding, left: collisionPadding }
    : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPadding };
  
  // Calculate initial position based on side
  switch (side) {
    case 'top':
      y = triggerRect.top - contentRect.height - sideOffset;
      break;
    case 'bottom':
      y = triggerRect.bottom + sideOffset;
      break;
    case 'left':
      x = triggerRect.left - contentRect.width - sideOffset;
      break;
    case 'right':
      x = triggerRect.right + sideOffset;
      break;
  }
  
  // Calculate alignment
  switch (side) {
    case 'top':
    case 'bottom':
      switch (align) {
        case 'start':
          x = triggerRect.left + alignOffset;
          break;
        case 'center':
          x = triggerRect.left + (triggerRect.width - contentRect.width) / 2 + alignOffset;
          break;
        case 'end':
          x = triggerRect.right - contentRect.width - alignOffset;
          break;
      }
      break;
    case 'left':
    case 'right':
      switch (align) {
        case 'start':
          y = triggerRect.top + alignOffset;
          break;
        case 'center':
          y = triggerRect.top + (triggerRect.height - contentRect.height) / 2 + alignOffset;
          break;
        case 'end':
          y = triggerRect.bottom - contentRect.height - alignOffset;
          break;
      }
      break;
  }
  
  // Handle collisions
  if (avoidCollisions) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Check collisions and flip if needed
    if (y < padding.top && side === 'top') {
      y = triggerRect.bottom + sideOffset;
      finalSide = 'bottom';
    } else if (y + contentRect.height > viewportHeight - padding.bottom && side === 'bottom') {
      y = triggerRect.top - contentRect.height - sideOffset;
      finalSide = 'top';
    }
    
    if (x < padding.left && side === 'left') {
      x = triggerRect.right + sideOffset;
      finalSide = 'right';
    } else if (x + contentRect.width > viewportWidth - padding.right && side === 'right') {
      x = triggerRect.left - contentRect.width - sideOffset;
      finalSide = 'left';
    }
    
    // Ensure content stays within viewport
    x = Math.max(padding.left, Math.min(x, viewportWidth - contentRect.width - padding.right));
    y = Math.max(padding.top, Math.min(y, viewportHeight - contentRect.height - padding.bottom));
  }
  
  return { x, y, side: finalSide };
};

// TooltipProvider component
export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = 700,
  skipDelayDuration = 300,
  disableHoverableContent = false,
}) => {
  return (
    <GlobalTooltipProvider
      value={{
        delayDuration,
        skipDelayDuration,
        disableHoverableContent,
      }}
    >
      {children}
    </GlobalTooltipProvider>
  );
};

TooltipProvider.displayName = 'TooltipProvider';

// Tooltip component
export const Tooltip: React.FC<TooltipProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration: tooltipDelayDuration,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const globalContext = useGlobalTooltipContext();
  
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  const delayDuration = tooltipDelayDuration ?? globalContext?.delayDuration ?? 700;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };
  
  return (
    <TooltipContextProvider value={{ open, onOpenChange: handleOpenChange, triggerRef }}>
      {children}
    </TooltipContextProvider>
  );
};

Tooltip.displayName = 'Tooltip';

// TooltipTrigger component
export const TooltipTrigger = forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const context = useTooltipContext();
    const globalContext = useGlobalTooltipContext();
    const timeoutRef = useRef<NodeJS.Timeout>();
    
    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      onMouseEnter?.(e);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Use delay duration
      const delay = globalContext?.delayDuration ?? 700;
      timeoutRef.current = setTimeout(() => {
        context.onOpenChange(true);
      }, delay);
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      onMouseLeave?.(e);
      
      // Clear timeout and close
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      context.onOpenChange(false);
    };
    
    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
      onFocus?.(e);
      context.onOpenChange(true);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      onBlur?.(e);
      context.onOpenChange(false);
    };
    
    // Clean up timeout on unmount
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
    
    // TODO: Implement asChild with Slot component
    if (asChild) {
      console.warn('asChild prop not yet implemented for TooltipTrigger');
    }
    
    return (
      <span
        ref={(node) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(node);
            } else {
              ref.current = node;
            }
          }
          if (node) {
            (context.triggerRef as React.MutableRefObject<HTMLElement>).current = node;
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);

TooltipTrigger.displayName = 'TooltipTrigger';

// TooltipContent component
export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      className,
      variant,
      side = 'top',
      sideOffset = 4,
      align = 'center',
      alignOffset = 0,
      avoidCollisions = true,
      collisionBoundary = null,
      collisionPadding = 8,
      sticky = 'partial',
      hideWhenDetached = false,
      style,
      ...props
    },
    ref
  ) => {
    const context = useTooltipContext();
    const globalContext = useGlobalTooltipContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [actualSide, setActualSide] = useState(side);
    const reduceMotion = shouldReduceMotion();
    
    // Calculate position when open
    useEffect(() => {
      if (!context.open || !context.triggerRef.current || !contentRef.current) return;
      
      const updatePosition = () => {
        if (!context.triggerRef.current || !contentRef.current) return;
        
        const triggerRect = context.triggerRef.current.getBoundingClientRect();
        const contentRect = contentRef.current.getBoundingClientRect();
        
        const { x, y, side: finalSide } = calculatePosition(
          triggerRect,
          contentRect,
          side,
          sideOffset,
          align,
          alignOffset,
          avoidCollisions,
          collisionPadding
        );
        
        setPosition({ x, y });
        setActualSide(finalSide);
      };
      
      updatePosition();
      
      // Update position on scroll/resize
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [context.open, context.triggerRef, side, sideOffset, align, alignOffset, avoidCollisions, collisionPadding]);
    
    if (!context.open) return null;
    
    const content = (
      <AnimatePresence>
        {context.open && (
          <motion.div
            ref={(node) => {
              if (ref) {
                if (typeof ref === 'function') {
                  ref(node);
                } else {
                  ref.current = node;
                }
              }
              if (node) {
                (contentRef as React.MutableRefObject<HTMLDivElement>).current = node;
              }
            }}
            className={cn(tooltipContentVariants({ variant }), 'fixed z-50', className)}
            style={{
              left: position.x,
              top: position.y,
              ...getComponentThemeProps('tooltip'),
              ...style,
            } as React.CSSProperties}
            data-state={context.open ? 'open' : 'closed'}
            data-side={actualSide}
            variants={!reduceMotion ? tooltipMotionVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            {...props}
          />
        )}
      </AnimatePresence>
    );
    
    return createPortal(content, document.body);
  }
);

TooltipContent.displayName = 'TooltipContent';

// TooltipArrow component
export interface TooltipArrowProps extends React.HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
}

export const TooltipArrow = forwardRef<SVGSVGElement, TooltipArrowProps>(
  ({ className, width = 10, height = 5, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={width}
        height={height}
        viewBox="0 0 10 5"
        className={cn('fill-zen-void absolute pointer-events-none', className)}
        {...props}
      >
        <polygon points="0,0 5,5 10,0" />
      </svg>
    );
  }
);

TooltipArrow.displayName = 'TooltipArrow';

export {
  tooltipContentVariants,
};
