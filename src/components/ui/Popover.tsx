import React, { 
  useState, 
  useRef, 
  useEffect, 
  forwardRef,
  useCallback,
} from 'react';
import { cva } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, shouldReduceMotion } from '../../lib/utils';
import { createContext as createZenContext } from '../../lib/create-context';
import type { 
  PopoverProps, 
  PopoverContentProps, 
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverCloseProps,
} from '../../types';

// ============================================================================
// POPOVER CONTEXT
// ============================================================================

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  modal: boolean;
}

const [PopoverProvider, usePopoverContext] = createZenContext<PopoverContextValue>('Popover');

// ============================================================================
// POPOVER VARIANTS
// ============================================================================

const popoverContentVariants = cva(
  [
    'z-50 w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-zen',
    'outline-none',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  ],
  {
    variants: {
      side: {
        top: 'data-[side=top]:slide-in-from-bottom-2',
        bottom: 'data-[side=bottom]:slide-in-from-top-2',
        left: 'data-[side=left]:slide-in-from-right-2',
        right: 'data-[side=right]:slide-in-from-left-2',
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  }
);

// ============================================================================
// POSITIONING UTILITIES
// ============================================================================

interface Position {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

const calculatePosition = (
  triggerRect: DOMRect,
  contentDimensions: Dimensions,
  side: 'top' | 'bottom' | 'left' | 'right',
  align: 'start' | 'center' | 'end',
  sideOffset: number,
  alignOffset: number,
  avoidCollisions: boolean
): Position => {
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  let x = 0;
  let y = 0;

  // Calculate base position based on side
  switch (side) {
    case 'top':
      x = triggerRect.left;
      y = triggerRect.top - contentDimensions.height - sideOffset;
      break;
    case 'bottom':
      x = triggerRect.left;
      y = triggerRect.bottom + sideOffset;
      break;
    case 'left':
      x = triggerRect.left - contentDimensions.width - sideOffset;
      y = triggerRect.top;
      break;
    case 'right':
      x = triggerRect.right + sideOffset;
      y = triggerRect.top;
      break;
  }

  // Adjust position based on alignment
  if (side === 'top' || side === 'bottom') {
    switch (align) {
      case 'start':
        x += alignOffset;
        break;
      case 'center':
        x += (triggerRect.width - contentDimensions.width) / 2 + alignOffset;
        break;
      case 'end':
        x += triggerRect.width - contentDimensions.width - alignOffset;
        break;
    }
  } else {
    switch (align) {
      case 'start':
        y += alignOffset;
        break;
      case 'center':
        y += (triggerRect.height - contentDimensions.height) / 2 + alignOffset;
        break;
      case 'end':
        y += triggerRect.height - contentDimensions.height - alignOffset;
        break;
    }
  }

  // Collision detection and avoidance
  if (avoidCollisions) {
    // Horizontal collision detection
    if (x < 0) {
      x = 8; // 8px margin from edge
    } else if (x + contentDimensions.width > viewport.width) {
      x = viewport.width - contentDimensions.width - 8;
    }

    // Vertical collision detection
    if (y < 0) {
      y = 8;
    } else if (y + contentDimensions.height > viewport.height) {
      y = viewport.height - contentDimensions.height - 8;
    }
  }

  return { x, y };
};

// ============================================================================
// MOTION VARIANTS
// ============================================================================

const motionVariants = {
  initial: (side: string) => {
    const variants = {
      top: { opacity: 0, y: 4, scale: 0.95 },
      bottom: { opacity: 0, y: -4, scale: 0.95 },
      left: { opacity: 0, x: 4, scale: 0.95 },
      right: { opacity: 0, x: -4, scale: 0.95 },
    };
    return variants[side as keyof typeof variants] || variants.bottom;
  },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    },
  },
  exit: (side: string) => {
    const variants = {
      top: { opacity: 0, y: 4, scale: 0.95 },
      bottom: { opacity: 0, y: -4, scale: 0.95 },
      left: { opacity: 0, x: 4, scale: 0.95 },
      right: { opacity: 0, x: -4, scale: 0.95 },
    };
    return {
      ...variants[side as keyof typeof variants] || variants.bottom,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    };
  },
};

// ============================================================================
// POPOVER ROOT COMPONENT
// ============================================================================

const Popover: React.FC<PopoverProps> = ({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  modal = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [controlledOpen, onOpenChange]);

  const contextValue: PopoverContextValue = {
    open,
    onOpenChange: handleOpenChange,
    triggerRef,
    contentRef,
    modal,
  };

  return (
    <PopoverProvider value={contextValue}>
      {children}
    </PopoverProvider>
  );
};

// ============================================================================
// POPOVER TRIGGER COMPONENT
// ============================================================================

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild = false, onClick, ...props }, ref) => {
    const context = usePopoverContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpenChange(!context.open);
      onClick?.(event);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        context.onOpenChange(!context.open);
      }
      if (event.key === 'Escape' && context.open) {
        context.onOpenChange(false);
      }
    };

    // If asChild is true, we would typically use a Slot component
    // For now, we'll just render the button normally
    if (asChild) {
      console.warn('asChild prop is not yet implemented for PopoverTrigger');
    }

    return (
      <button
        ref={(node) => {
          (context.triggerRef as any).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        }}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={context.open}
        aria-controls={context.open ? 'popover-content' : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverTrigger.displayName = 'PopoverTrigger';

// ============================================================================
// POPOVER CONTENT COMPONENT
// ============================================================================

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({
    children,
    className,
    side = 'bottom',
    align = 'center',
    sideOffset = 4,
    alignOffset = 0,
    avoidCollisions = true,
    collisionBoundary: _collisionBoundary,
    sticky: _sticky = 'partial',
    hideWhenDetached: _hideWhenDetached = false,
    forceMount = false,
    onPointerDownOutside,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    ...props
  }, ref) => {
    const context = usePopoverContext();
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
    const [actualSide, setActualSide] = useState(side);
    const reduceMotion = shouldReduceMotion();

    // Update position when open state changes or on resize
    const updatePosition = useCallback(() => {
      if (!context.open || !context.triggerRef.current || !context.contentRef.current) {
        return;
      }

      const triggerRect = context.triggerRef.current.getBoundingClientRect();
      const contentRect = context.contentRef.current.getBoundingClientRect();
      
      const newPosition = calculatePosition(
        triggerRect,
        { width: contentRect.width, height: contentRect.height },
        side,
        align,
        sideOffset,
        alignOffset,
        avoidCollisions
      );

      setPosition(newPosition);
      setActualSide(side); // In a full implementation, this would be calculated based on collision detection
    }, [context.open, side, align, sideOffset, alignOffset, avoidCollisions]);

    useEffect(() => {
      if (context.open) {
        updatePosition();
        
        const handleResize = () => updatePosition();
        const handleScroll = () => updatePosition();
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll, true);
        
        return () => {
          window.removeEventListener('resize', handleResize);
          window.removeEventListener('scroll', handleScroll, true);
        };
      }
    }, [context.open, updatePosition]);

    // Handle click outside
    useEffect(() => {
      if (!context.open) return;

      const handlePointerDown = (event: PointerEvent) => {
        const target = event.target as Element;
        
        if (
          context.contentRef.current &&
          !context.contentRef.current.contains(target) &&
          context.triggerRef.current &&
          !context.triggerRef.current.contains(target)
        ) {
          onPointerDownOutside?.(event as any);
          onInteractOutside?.(event as any);
          context.onOpenChange(false);
        }
      };

      document.addEventListener('pointerdown', handlePointerDown);
      return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, [context.open, onPointerDownOutside, onInteractOutside]);

    // Handle escape key
    useEffect(() => {
      if (!context.open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onEscapeKeyDown?.(event);
          context.onOpenChange(false);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [context.open, onEscapeKeyDown]);

    // Handle focus outside
    useEffect(() => {
      if (!context.open) return;

      const handleFocusIn = (event: FocusEvent) => {
        const target = event.target as Element;
        
        if (
          context.contentRef.current &&
          !context.contentRef.current.contains(target) &&
          context.triggerRef.current &&
          !context.triggerRef.current.contains(target)
        ) {
          onFocusOutside?.(event as any);
        }
      };

      document.addEventListener('focusin', handleFocusIn);
      return () => document.removeEventListener('focusin', handleFocusIn);
    }, [context.open, onFocusOutside]);

    if (!context.open && !forceMount) {
      return null;
    }

    const content = (
      <div
        ref={(node) => {
          (context.contentRef as any).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        }}
        id="popover-content"
        role="dialog"
        aria-modal={context.modal}
        className={cn(
          popoverContentVariants({ side: actualSide }),
          'fixed z-50',
          className
        )}
        style={{
          left: position.x,
          top: position.y,
        }}
        data-state={context.open ? 'open' : 'closed'}
        data-side={actualSide}
        tabIndex={-1}
        {...props}
      >
        {children}
      </div>
    );

    // Render in portal
    if (typeof document !== 'undefined') {
      const portalRoot = document.body;
      
      return (
        <>
          {portalRoot && (
            <div className="fixed inset-0 pointer-events-none">
              <AnimatePresence mode="wait">
                {context.open && (
                  <motion.div
                    key="popover-content"
                    custom={actualSide}
                    variants={!reduceMotion ? motionVariants : undefined}
                    initial={!reduceMotion ? "initial" : undefined}
                    animate={!reduceMotion ? "animate" : undefined}
                    exit={!reduceMotion ? "exit" : undefined}
                    className="pointer-events-auto"
                  >
                    {content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      );
    }

    return null;
  }
);

PopoverContent.displayName = 'PopoverContent';

// ============================================================================
// POPOVER ANCHOR COMPONENT
// ============================================================================

const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(
  ({ children, asChild = false, ...props }, ref) => {
    const context = usePopoverContext();

    // If asChild is true, we would typically use a Slot component
    if (asChild) {
      console.warn('asChild prop is not yet implemented for PopoverAnchor');
    }

    return (
      <div
        ref={(node) => {
          (context.triggerRef as any).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PopoverAnchor.displayName = 'PopoverAnchor';

// ============================================================================
// POPOVER CLOSE COMPONENT
// ============================================================================

const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  ({ children, asChild = false, onClick, ...props }, ref) => {
    const context = usePopoverContext();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpenChange(false);
      onClick?.(event);
    };

    // If asChild is true, we would typically use a Slot component
    if (asChild) {
      console.warn('asChild prop is not yet implemented for PopoverClose');
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

PopoverClose.displayName = 'PopoverClose';

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export const usePopover = () => {
  const context = usePopoverContext();
  return {
    open: context.open,
    onOpenChange: context.onOpenChange,
  };
};

// ============================================================================
// EXPORTS
// ============================================================================

export { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverAnchor,
  PopoverClose,
  popoverContentVariants 
};

export type { 
  PopoverProps, 
  PopoverContentProps, 
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverCloseProps,
} from '../../types'; 