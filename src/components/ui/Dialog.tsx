import React, { forwardRef, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion';
import { cn, shouldReduceMotion } from '../../lib/utils';
import { createContext } from '../../lib/create-context';
import { createPortal } from 'react-dom';
import { getComponentThemeProps } from '../../lib/theme-constants';

// Dialog Context
interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modal: boolean;
}

const [DialogProvider, useDialogContext] = createContext<DialogContextValue>('Dialog');

// Variants
const dialogOverlayVariants = cva(
  [
    'fixed inset-0 z-50',
    'bg-zen-void/50 backdrop-blur-sm',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  ]
);

const dialogContentVariants = cva(
  [
    'fixed left-[50%] top-[50%] z-50',
    'w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
    'gap-4 border border-zen-cloud bg-zen-light p-6',
    'shadow-lg duration-200',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'rounded-lg',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[90vw] max-h-[90vh]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

// Motion variants
const overlayMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const contentMotionVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    y: -20,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

// Types
export interface DialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
  children?: React.ReactNode;
}

export interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DialogOverlayProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDrag' | 'onDragEnd'> {
  forceMount?: boolean;
}

export interface DialogContentProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onAnimationEnd' | 'onDragStart' | 'onDrag' | 'onDragEnd'>,
    VariantProps<typeof dialogContentVariants> {
  forceMount?: boolean;
  onOpenAutoFocus?: (event: Event) => void;
  onCloseAutoFocus?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
  onInteractOutside?: (event: Event) => void;
}

// Main Dialog component
const Dialog: React.FC<DialogProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  modal = true,
  children,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  
  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;
  
  const handleOpenChange = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <DialogProvider value={{ open, onOpenChange: handleOpenChange, modal }}>
      {children}
    </DialogProvider>
  );
};

Dialog.displayName = 'Dialog';

// Dialog Trigger
const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ onClick, asChild, ...props }, ref) => {
    const context = useDialogContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      context.onOpenChange(true);
    };
    
    // TODO: Implement asChild with Slot component
    if (asChild) {
      console.warn('asChild prop not yet implemented for DialogTrigger');
    }
    
    return (
      <button
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

DialogTrigger.displayName = 'DialogTrigger';

// Dialog Overlay
const DialogOverlay = forwardRef<HTMLDivElement, DialogOverlayProps>(
  ({ className, forceMount, onClick, ...props }, ref) => {
    const context = useDialogContext();
    const reduceMotion = shouldReduceMotion();
    
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      onClick?.(e);
      if (e.target === e.currentTarget && context.modal) {
        context.onOpenChange(false);
      }
    };
    
    if (!forceMount && !context.open) return null;
    
    const overlay = (
      <AnimatePresence>
        {context.open && (
          <motion.div
            ref={ref}
            className={cn(dialogOverlayVariants(), className)}
            onClick={handleClick}
            variants={!reduceMotion ? overlayMotionVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-state={context.open ? 'open' : 'closed'}
            style={getComponentThemeProps('dialog')}
            {...props}
          />
        )}
      </AnimatePresence>
    );
    
    return createPortal(overlay, document.body);
  }
);

DialogOverlay.displayName = 'DialogOverlay';

// Dialog Content
const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ 
    className, 
    size,
    forceMount,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onInteractOutside,
    children,
    ...props 
  }, ref) => {
    const context = useDialogContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const reduceMotion = shouldReduceMotion();
    
    // Handle escape key
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onEscapeKeyDown?.(e);
          if (!e.defaultPrevented) {
            context.onOpenChange(false);
          }
        }
      };
      
      if (context.open) {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }
    }, [context.open, context.onOpenChange, onEscapeKeyDown]);
    
    // Handle focus trap and auto focus
    useEffect(() => {
      if (!context.open) return;
      
      const contentEl = contentRef.current;
      if (!contentEl) return;
      
      // Auto focus on open
      const handleOpenAutoFocus = (e: Event) => {
        onOpenAutoFocus?.(e);
        if (!e.defaultPrevented) {
          const focusableElements = contentEl.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          firstElement?.focus();
        }
      };
      
      // Use RAF to ensure DOM is ready
      requestAnimationFrame(() => {
        handleOpenAutoFocus(new Event('openautoFocus'));
      });
      
      return () => {
        // Handle close auto focus
        const handleCloseAutoFocus = (e: Event) => {
          onCloseAutoFocus?.(e);
        };
        handleCloseAutoFocus(new Event('closeautofocus'));
      };
    }, [context.open, onOpenAutoFocus, onCloseAutoFocus]);
    
    // Handle click outside
    useEffect(() => {
      const handlePointerDown = (e: PointerEvent) => {
        const contentEl = contentRef.current;
        if (contentEl && !contentEl.contains(e.target as Node)) {
          onPointerDownOutside?.(e);
          onInteractOutside?.(e);
          if (!e.defaultPrevented && context.modal) {
            context.onOpenChange(false);
          }
        }
      };
      
      if (context.open) {
        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
      }
    }, [context.open, context.modal, context.onOpenChange, onPointerDownOutside, onInteractOutside]);
    
    if (!forceMount && !context.open) return null;
    
    const content = (
      <AnimatePresence>
        {context.open && (
          <>
            <DialogOverlay />
            <motion.div
              ref={ref || contentRef}
              className={cn(dialogContentVariants({ size }), className)}
              variants={!reduceMotion ? contentMotionVariants : undefined}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-state={context.open ? 'open' : 'closed'}
              role="dialog"
              aria-modal={context.modal}
              style={getComponentThemeProps('dialog')}
              {...props}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
    
    return createPortal(content, document.body);
  }
);

DialogContent.displayName = 'DialogContent';

// Dialog Header
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  )
);

DialogHeader.displayName = 'DialogHeader';

// Dialog Footer
export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      {...props}
    />
  )
);

DialogFooter.displayName = 'DialogFooter';

// Dialog Title
export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(
        'text-lg font-semibold leading-none tracking-tight text-zen-ink',
        className
      )}
      style={getComponentThemeProps('dialog')}
      {...props}
    />
  )
);

DialogTitle.displayName = 'DialogTitle';

// Dialog Description
export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-zen-stone', className)}
      style={getComponentThemeProps('dialog')}
      {...props}
    />
  )
);

DialogDescription.displayName = 'DialogDescription';

// Dialog Close
export interface DialogCloseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ onClick, asChild, ...props }, ref) => {
    const context = useDialogContext();
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      context.onOpenChange(false);
    };
    
    // TODO: Implement asChild with Slot component
    if (asChild) {
      console.warn('asChild prop not yet implemented for DialogClose');
    }
    
    return (
      <button
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

DialogClose.displayName = 'DialogClose';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  dialogContentVariants,
};
