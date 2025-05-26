import React, { forwardRef, useRef, useState, useCallback, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn, shouldReduceMotion } from '../../lib/utils';

// Variants
const sliderVariants = cva(
  'relative flex w-full touch-none select-none items-center',
  {
    variants: {
      size: {
        sm: 'h-4',
        default: 'h-5',
        lg: 'h-6',
      },
      variant: {
        default: '',
        accent: '',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

const sliderTrackVariants = cva(
  'relative w-full grow overflow-hidden rounded-full bg-zen-cloud',
  {
    variants: {
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const sliderRangeVariants = cva(
  'absolute h-full',
  {
    variants: {
      variant: {
        default: 'bg-zen-water',
        accent: 'bg-zen-accent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const sliderThumbVariants = cva(
  [
    'block rounded-full border-2 bg-zen-light',
    'ring-offset-zen-light transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-zen-water focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-grab active:cursor-grabbing',
  ],
  {
    variants: {
      size: {
        sm: 'h-3 w-3',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      variant: {
        default: 'border-zen-water hover:bg-zen-water/10',
        accent: 'border-zen-accent hover:bg-zen-accent/10',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
);

// Types
export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue' | 'aria-label'>,
    VariantProps<typeof sliderVariants> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  inverted?: boolean;
  minStepsBetweenThumbs?: number;
  showTooltip?: boolean;
  formatTooltip?: (value: number) => string;
  'aria-label'?: string | string[];
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Helper functions
const getValueFromPointer = (
  pointerPosition: number,
  min: number,
  max: number,
  step: number,
  trackRect: DOMRect,
  orientation: 'horizontal' | 'vertical',
  inverted: boolean
) => {
  const trackSize = orientation === 'horizontal' ? trackRect.width : trackRect.height;
  const trackStart = orientation === 'horizontal' ? trackRect.left : trackRect.top;
  const position = pointerPosition - trackStart;
  
  let percent = position / trackSize;
  if (orientation === 'vertical' || inverted) {
    percent = 1 - percent;
  }
  
  const range = max - min;
  const value = percent * range + min;
  const steppedValue = Math.round(value / step) * step;
  
  return Math.max(min, Math.min(max, steppedValue));
};

// Slider component
const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      size,
      variant,
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      onValueCommit,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      orientation = 'horizontal',
      inverted = false,
      minStepsBetweenThumbs = 0,
      showTooltip = false,
      formatTooltip = (v) => v.toString(),
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const [isDragging, setIsDragging] = useState(false);
    const [activeThumb, setActiveThumb] = useState<number | null>(null);
    const [showTooltips, setShowTooltips] = useState<boolean[]>([]);
    const trackRef = useRef<HTMLDivElement>(null);
    const reduceMotion = shouldReduceMotion();
    
    const values = controlledValue !== undefined ? controlledValue : uncontrolledValue;
    
    // Ensure values array has correct length
    const normalizedValues = values.length > 0 ? values : [min];
    
    const handleValueChange = useCallback((newValues: number[]) => {
      // Ensure minimum distance between thumbs
      if (newValues.length > 1 && minStepsBetweenThumbs > 0) {
        const sortedValues = [...newValues].sort((a, b) => a - b);
        for (let i = 1; i < sortedValues.length; i++) {
          const minDiff = minStepsBetweenThumbs * step;
          if (sortedValues[i] - sortedValues[i - 1] < minDiff) {
            return; // Don't update if minimum distance is not maintained
          }
        }
      }
      
      if (controlledValue === undefined) {
        setUncontrolledValue(newValues);
      }
      onValueChange?.(newValues);
    }, [controlledValue, onValueChange, minStepsBetweenThumbs, step]);
    
    const handlePointerDown = useCallback((index: number) => (e: React.PointerEvent) => {
      if (disabled) return;
      
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsDragging(true);
      setActiveThumb(index);
      
      if (showTooltip) {
        setShowTooltips(prev => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }
    }, [disabled, showTooltip]);
    
    const handlePointerMove = useCallback((e: PointerEvent) => {
      if (!isDragging || activeThumb === null || !trackRef.current) return;
      
      const pointerPosition = orientation === 'horizontal' ? e.clientX : e.clientY;
      const trackRect = trackRef.current.getBoundingClientRect();
      const newValue = getValueFromPointer(
        pointerPosition,
        min,
        max,
        step,
        trackRect,
        orientation,
        inverted
      );
      
      const newValues = [...normalizedValues];
      newValues[activeThumb] = newValue;
      handleValueChange(newValues);
    }, [isDragging, activeThumb, orientation, min, max, step, inverted, normalizedValues, handleValueChange]);
    
    const handlePointerUp = useCallback(() => {
      if (isDragging && activeThumb !== null) {
        setIsDragging(false);
        setActiveThumb(null);
        onValueCommit?.(normalizedValues);
        
        if (showTooltip) {
          setShowTooltips([]);
        }
      }
    }, [isDragging, activeThumb, normalizedValues, onValueCommit, showTooltip]);
    
    // Global pointer events
    useEffect(() => {
      if (isDragging) {
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        
        return () => {
          document.removeEventListener('pointermove', handlePointerMove);
          document.removeEventListener('pointerup', handlePointerUp);
        };
      }
    }, [isDragging, handlePointerMove, handlePointerUp]);
    
    // Handle keyboard navigation
    const handleKeyDown = useCallback((index: number) => (e: React.KeyboardEvent) => {
      if (disabled) return;
      
      const stepSize = e.shiftKey ? step * 10 : step;
      let newValue = normalizedValues[index];
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newValue = Math.max(min, newValue - stepSize);
          break;
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newValue = Math.min(max, newValue + stepSize);
          break;
        case 'Home':
          e.preventDefault();
          newValue = min;
          break;
        case 'End':
          e.preventDefault();
          newValue = max;
          break;
        case 'PageDown':
          e.preventDefault();
          newValue = Math.max(min, newValue - (max - min) / 10);
          break;
        case 'PageUp':
          e.preventDefault();
          newValue = Math.min(max, newValue + (max - min) / 10);
          break;
        default:
          return;
      }
      
      const newValues = [...normalizedValues];
      newValues[index] = newValue;
      handleValueChange(newValues);
      onValueCommit?.(newValues);
    }, [disabled, normalizedValues, min, max, step, handleValueChange, onValueCommit]);
    
    // Calculate positions
    const getThumbPosition = (value: number) => {
      const percent = (value - min) / (max - min);
      return orientation === 'horizontal' ? `${percent * 100}%` : `${(1 - percent) * 100}%`;
    };
    
    const getRangeStyle = () => {
      if (normalizedValues.length === 1) {
        const percent = ((normalizedValues[0] - min) / (max - min)) * 100;
        return orientation === 'horizontal'
          ? { left: '0%', width: `${percent}%` }
          : { bottom: '0%', height: `${percent}%` };
      }
      
      // Multiple thumbs: show range between first and last
      const sortedValues = [...normalizedValues].sort((a, b) => a - b);
      const startPercent = ((sortedValues[0] - min) / (max - min)) * 100;
      const endPercent = ((sortedValues[sortedValues.length - 1] - min) / (max - min)) * 100;
      
      return orientation === 'horizontal'
        ? { left: `${startPercent}%`, width: `${endPercent - startPercent}%` }
        : { bottom: `${startPercent}%`, height: `${endPercent - startPercent}%` };
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          sliderVariants({ size, variant }),
          orientation === 'vertical' && 'h-full w-5 flex-col',
          className
        )}
        data-disabled={disabled}
        data-orientation={orientation}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn(
            sliderTrackVariants({ size }),
            orientation === 'vertical' && 'h-full w-2'
          )}
        >
          <motion.div
            className={cn(sliderRangeVariants({ variant }))}
            style={getRangeStyle()}
            initial={false}
            animate={getRangeStyle()}
            transition={!reduceMotion ? { type: 'spring', stiffness: 300, damping: 30 } : undefined}
          />
        </div>
        
        {normalizedValues.map((value, index) => {
          const position = getThumbPosition(value);
          const label = Array.isArray(ariaLabel) ? ariaLabel[index] : ariaLabel;
          
          return (
            <div
              key={index}
              className={cn(
                'absolute',
                orientation === 'horizontal' 
                  ? 'top-1/2 -translate-y-1/2' 
                  : 'left-1/2 -translate-x-1/2'
              )}
              style={
                orientation === 'horizontal'
                  ? { left: position }
                  : { bottom: position }
              }
            >
              {showTooltip && (showTooltips[index] || isDragging && activeThumb === index) && (
                <div
                  className={cn(
                    'absolute px-2 py-1 text-xs rounded',
                    'bg-zen-void text-zen-light',
                    'pointer-events-none select-none',
                    'transition-opacity duration-200',
                    orientation === 'horizontal'
                      ? '-top-8 left-1/2 -translate-x-1/2'
                      : '-left-10 top-1/2 -translate-y-1/2'
                  )}
                >
                  {formatTooltip(value)}
                </div>
              )}
              
              <button
                className={cn(sliderThumbVariants({ size, variant }))}
                role="slider"
                aria-label={label}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-valuetext={formatTooltip(value)}
                aria-orientation={orientation}
                aria-disabled={disabled}
                disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                onPointerDown={handlePointerDown(index)}
                onKeyDown={handleKeyDown(index)}
                onFocus={() => {
                  if (showTooltip) {
                    setShowTooltips(prev => {
                      const next = [...prev];
                      next[index] = true;
                      return next;
                    });
                  }
                }}
                onBlur={() => {
                  if (showTooltip) {
                    setShowTooltips(prev => {
                      const next = [...prev];
                      next[index] = false;
                      return next;
                    });
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export {
  Slider,
  sliderVariants,
  sliderTrackVariants,
  sliderRangeVariants,
  sliderThumbVariants,
};
