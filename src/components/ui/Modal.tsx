import React, { forwardRef, useEffect, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { getComponentThemeProps } from '../../lib/theme-constants';

const modalOverlayVariants = cva([
  'fixed inset-0 z-50',
  'bg-black/50 backdrop-blur-sm',
  'data-[state=open]:animate-in data-[state=closed]:animate-out',
  'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
  'transition-all duration-300',
]);

const modalContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50',
    'grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
    'gap-4 border bg-zen-light p-6 shadow-xl',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'transition-all duration-300',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw] max-h-[95vh]',
      },
      rounded: {
        none: 'rounded-none',
        default: 'rounded-lg',
        lg: 'rounded-xl',
      },
    },
    defaultVariants: {
      size: 'default',
      rounded: 'default',
    },
  }
);

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface ModalContentProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalContentVariants> {
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerEvent) => void;
}

const Modal: React.FC<ModalProps> = ({ open, onOpenChange, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onOpenChange) {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            'data-state': open ? 'open' : 'closed',
          } as any);
        }
        return child;
      })}
    </>
  );
};

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

const ModalOverlay = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <ModalPortal>
    <div
      ref={ref}
      className={cn(modalOverlayVariants(), className)}
      style={getComponentThemeProps('modal')}
      {...props}
    />
  </ModalPortal>
));
ModalOverlay.displayName = 'ModalOverlay';

const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  ({ 
    className, 
    children, 
    size, 
    rounded,
    onEscapeKeyDown: _onEscapeKeyDown,
    onPointerDownOutside,
    ...props 
  }, ref) => {
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onPointerDownOutside?.(e.nativeEvent);
      }
    };

    return (
      <ModalPortal>
        <div
          ref={ref}
          className={cn(modalContentVariants({ size, rounded }), className)}
          onPointerDown={handlePointerDown}
          style={getComponentThemeProps('modal')}
          {...props}
        >
          {children}
        </div>
      </ModalPortal>
    );
  }
);
ModalContent.displayName = 'ModalContent';

const ModalHeader = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
));
ModalHeader.displayName = 'ModalHeader';

const ModalFooter = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
));
ModalFooter.displayName = 'ModalFooter';

const ModalTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight text-zen-void',
      className
    )}
    style={getComponentThemeProps('modal')}
    {...props}
  />
));
ModalTitle.displayName = 'ModalTitle';

const ModalDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-zen-stone', className)}
    style={getComponentThemeProps('modal')}
    {...props}
  />
));
ModalDescription.displayName = 'ModalDescription';

// Close button component
const ModalClose = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'absolute right-4 top-4 rounded-sm opacity-70',
      'ring-offset-zen-light transition-opacity',
      'hover:opacity-100 focus:outline-none focus:ring-2',
      'focus:ring-zen-water focus:ring-offset-2',
      'disabled:pointer-events-none',
      className
    )}
    style={getComponentThemeProps('modal')}
    {...props}
  >
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
    >
      <path
        d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
    <span className="sr-only">Close</span>
  </button>
));
ModalClose.displayName = 'ModalClose';

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  modalOverlayVariants,
  modalContentVariants,
};
