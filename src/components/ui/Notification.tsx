import React, { forwardRef, useEffect, useState, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const notificationVariants = cva(
  [
    'inline-flex items-center rounded-lg p-4 shadow-lg',
    'transition-all duration-300 ease-out',
    'border border-transparent',
    'min-w-[300px] max-w-[500px]',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-zen-void text-zen-light',
          'border-zen-shadow',
        ],
        success: [
          'bg-zen-leaf text-zen-light',
          'border-zen-leaf/20',
        ],
        warning: [
          'bg-zen-sun text-zen-void',
          'border-zen-sun/20',
        ],
        error: [
          'bg-zen-accent text-zen-light',
          'border-zen-accent/20',
        ],
        info: [
          'bg-zen-water text-zen-light',
          'border-zen-water/20',
        ],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface NotificationProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof notificationVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
  closable?: boolean;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(
  ({ 
    className, 
    variant,
    title,
    description,
    icon,
    action,
    onClose,
    duration = 5000,
    closable = true,
    children,
    ...props 
  }, ref) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300); // Wait for exit animation
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    };

    const getDefaultIcon = () => {
      switch (variant) {
        case 'success':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          );
        case 'error':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          );
        case 'warning':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          );
        case 'info':
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          );
        default:
          return (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          notificationVariants({ variant }),
          'zen-slide-in',
          !isVisible && 'translate-x-full opacity-0',
          className
        )}
        style={{
          '--zen-void': '#0a0a0a',
          '--zen-light': '#ffffff',
          '--zen-shadow': '#2a2a2a',
          '--zen-leaf': '#26de81',
          '--zen-sun': '#fed330',
          '--zen-accent': '#ff4757',
          '--zen-water': '#3742fa',
        } as React.CSSProperties}
        {...props}
      >
        {/* Icon */}
        <div className="flex-shrink-0">
          {icon || getDefaultIcon()}
        </div>

        {/* Content */}
        <div className="ml-3 flex-1">
          {title && (
            <p className="text-sm font-medium">
              {title}
            </p>
          )}
          {description && (
            <p className={cn(
              'text-sm',
              title ? 'mt-1 opacity-90' : ''
            )}>
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Action */}
        {action && (
          <div className="ml-4 flex flex-shrink-0">
            {action}
          </div>
        )}

        {/* Close button */}
        {closable && (
          <div className="ml-4 flex flex-shrink-0">
            <button
              className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 opacity-70 hover:opacity-100 transition-opacity"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }
);

Notification.displayName = 'Notification';

// Toast Context and Provider
interface Toast {
  id: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  title?: string;
  description?: string;
  duration?: number;
  action?: React.ReactNode;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Notification
            variant={toast.variant}
            title={toast.title}
            description={toast.description}
            duration={toast.duration}
            action={toast.action}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>,
    document.body
  );
};

// Convenience functions
export const toast = {
  success: (title: string, description?: string) => {
    // This would be implemented by the consumer using useToast hook
  },
  error: (title: string, description?: string) => {
    // This would be implemented by the consumer using useToast hook
  },
  warning: (title: string, description?: string) => {
    // This would be implemented by the consumer using useToast hook
  },
  info: (title: string, description?: string) => {
    // This would be implemented by the consumer using useToast hook
  },
};

export { Notification, notificationVariants };
