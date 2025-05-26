import { ReactNode, ComponentProps, ElementType, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';

// ============================================================================
// CORE UTILITY TYPES
// ============================================================================

export type AsChildProps<T extends ElementType = 'div'> = {
  asChild?: boolean;
} & ComponentProps<T>;

export type PolymorphicRef<T extends ElementType> = ComponentProps<T>['ref'];

export type PolymorphicComponentProps<T extends ElementType, P = {}> = P & 
  Omit<ComponentProps<T>, keyof P | 'ref'> & {
    as?: T;
    ref?: PolymorphicRef<T>;
  };

// Motion configuration for consistent animations
export interface ZenMotionConfig {
  duration?: number | 'instant' | 'fast' | 'normal' | 'slow' | 'slower';
  style?: 'spring' | 'ease' | 'zen' | 'bounce';
  reduce?: boolean;
  stiffness?: number;
  damping?: number;
}

// ============================================================================
// DESIGN TOKEN SYSTEM
// ============================================================================

export interface ZenTokens {
  colors: {
    // Core Zen Palette (Japanese-inspired)
    void: string;      // Deep black
    ink: string;       // Dark gray
    shadow: string;    // Medium dark gray
    stone: string;     // Medium gray
    mist: string;      // Light gray
    cloud: string;     // Very light gray
    paper: string;     // Off-white
    light: string;     // Pure white
    
    // Accent Colors
    accent: string;    // Primary accent (red)
    water: string;     // Blue
    leaf: string;      // Green
    sun: string;       // Yellow/orange
    
    // Semantic Colors
    primary: string;
    secondary: string;
    destructive: string;
    warning: string;
    success: string;
    info: string;
    
    // Interactive States
    hover: string;
    active: string;
    focus: string;
    disabled: string;
    
    // Surface Colors
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    
    // Border & Input
    border: string;
    input: string;
    ring: string;
    
    // Muted variants
    muted: string;
    mutedForeground: string;
  };
  
  spacing: {
    px: string;
    0: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    2.5: string;
    3: string;
    3.5: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    14: string;
    16: string;
    20: string;
    24: string;
    28: string;
    32: string;
    36: string;
    40: string;
    44: string;
    48: string;
    52: string;
    56: string;
    60: string;
    64: string;
    72: string;
    80: string;
    96: string;
    
    // Semantic spacing
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
      zen: string[]; // Japanese-inspired font stack
    };
    fontSize: {
      xs: [string, { lineHeight: string; letterSpacing?: string }];
      sm: [string, { lineHeight: string; letterSpacing?: string }];
      base: [string, { lineHeight: string; letterSpacing?: string }];
      lg: [string, { lineHeight: string; letterSpacing?: string }];
      xl: [string, { lineHeight: string; letterSpacing?: string }];
      '2xl': [string, { lineHeight: string; letterSpacing?: string }];
      '3xl': [string, { lineHeight: string; letterSpacing?: string }];
      '4xl': [string, { lineHeight: string; letterSpacing?: string }];
      '5xl': [string, { lineHeight: string; letterSpacing?: string }];
      '6xl': [string, { lineHeight: string; letterSpacing?: string }];
      '7xl': [string, { lineHeight: string; letterSpacing?: string }];
      '8xl': [string, { lineHeight: string; letterSpacing?: string }];
      '9xl': [string, { lineHeight: string; letterSpacing?: string }];
    };
    fontWeight: {
      thin: string;
      extralight: string;
      light: string;
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
      extrabold: string;
      black: string;
    };
    letterSpacing: {
      tighter: string;
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };
    lineHeight: {
      none: string;
      tight: string;
      snug: string;
      normal: string;
      relaxed: string;
      loose: string;
    };
  };
  
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
  };
  
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
    none: string;
    zen: string; // Custom zen shadow
  };
  
  motion: {
    duration: {
      instant: string;
      fast: string;
      normal: string;
      slow: string;
      slower: string;
    };
    ease: {
      linear: string;
      in: string;
      out: string;
      'in-out': string;
      zen: string; // Custom zen easing
      spring: string;
      bounce: string;
    };
    spring: {
      stiffness: number;
      damping: number;
      mass: number;
    };
  };
  
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export interface ZenTheme {
  name: string;
  tokens: ZenTokens;
  motion: ZenMotionConfig;
  spacing: 'compact' | 'comfortable' | 'spacious';
  mode: 'light' | 'dark' | 'auto';
  cssVars?: Record<string, string>;
}

// ============================================================================
// COMPONENT PROP INTERFACES
// ============================================================================

// Base component props with common patterns
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Button Component
export interface ButtonProps extends 
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
  BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'destructive' | 'outline' | 'link';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  animate?: boolean;
  asChild?: boolean;
}

// Enhanced Select Types with better API consistency
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
  group?: string;
}

export interface SelectProps extends 
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>,
  BaseComponentProps {
  // Primary API (zen-flow-ui style)
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  
  // shadcn/ui compatibility
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  
  // Common props
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: 'default' | 'error';
  size?: 'sm' | 'default' | 'lg';
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

export interface SelectTriggerProps extends 
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'>,
  BaseComponentProps {
  placeholder?: string;
  size?: 'sm' | 'default' | 'lg';
}

export interface SelectValueProps extends BaseComponentProps {
  placeholder?: string;
}

export interface SelectContentProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  position?: 'popper' | 'item-aligned';
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null;
  sticky?: 'partial' | 'always';
}

export interface SelectItemProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  description?: string;
  textValue?: string;
}

// Card Components
export interface CardProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated' | 'flat';
  padding?: 'none' | 'sm' | 'default' | 'lg';
  interactive?: boolean;
  animate?: boolean;
  asChild?: boolean;
}

export interface CardHeaderProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  size?: 'sm' | 'default' | 'lg';
  asChild?: boolean;
}

export interface CardContentProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  padding?: 'none' | 'sm' | 'default' | 'lg';
  asChild?: boolean;
}

export interface CardFooterProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  justify?: 'start' | 'center' | 'end' | 'between';
  asChild?: boolean;
}

export interface CardTitleProps extends 
  HTMLAttributes<HTMLHeadingElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface CardDescriptionProps extends 
  HTMLAttributes<HTMLParagraphElement>,
  BaseComponentProps {
  asChild?: boolean;
}

// Input Component
export interface InputProps extends 
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
  BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'default' | 'lg';
  loading?: boolean;
  clearable?: boolean;
}

// Textarea Component
export interface TextareaProps extends 
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'default' | 'lg';
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
}

// Dialog/Modal Components
export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  modal?: boolean;
  defaultOpen?: boolean;
}

export interface DialogContentProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top' | 'bottom';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  forceMount?: boolean;
  onPointerDownOutside?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
}

export interface DialogOverlayProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  forceMount?: boolean;
}

export interface DialogTriggerProps extends 
  ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface DialogHeaderProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {}

export interface DialogFooterProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {}

export interface DialogTitleProps extends 
  HTMLAttributes<HTMLHeadingElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface DialogDescriptionProps extends 
  HTMLAttributes<HTMLParagraphElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface DialogCloseProps extends 
  ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps {
  asChild?: boolean;
}

// Tabs Components
export interface TabsProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'default' | 'lg';
  activationMode?: 'automatic' | 'manual';
  dir?: 'ltr' | 'rtl';
}

export interface TabsListProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  loop?: boolean;
  asChild?: boolean;
}

export interface TabsTriggerProps extends 
  ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps {
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  asChild?: boolean;
}

export interface TabsContentProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  value: string;
  forceMount?: boolean;
  asChild?: boolean;
}

// Alert Components
export interface AlertProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success' | 'info';
  size?: 'sm' | 'default' | 'lg';
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode | boolean;
}

export interface AlertTitleProps extends 
  HTMLAttributes<HTMLHeadingElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface AlertDescriptionProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  asChild?: boolean;
}

// Progress Component
export interface ProgressProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  value?: number;
  max?: number;
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'default' | 'lg';
  showValue?: boolean;
  showLabel?: boolean;
  label?: string;
  animate?: boolean;
  striped?: boolean;
  getValueLabel?: (value: number, max: number) => string;
}

// Toggle Component
export interface ToggleProps extends 
  ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  defaultPressed?: boolean;
  variant?: 'default' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  asChild?: boolean;
}

// Popover Components
export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  modal?: boolean;
  defaultOpen?: boolean;
}

export interface PopoverContentProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary?: Element | null;
  sticky?: 'partial' | 'always';
  hideWhenDetached?: boolean;
  forceMount?: boolean;
  onPointerDownOutside?: (event: Event) => void;
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onFocusOutside?: (event: Event) => void;
  onInteractOutside?: (event: Event) => void;
}

export interface PopoverTriggerProps extends 
  ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface PopoverAnchorProps extends 
  HTMLAttributes<HTMLDivElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface PopoverCloseProps extends 
  ButtonHTMLAttributes<HTMLButtonElement>,
  BaseComponentProps {
  asChild?: boolean;
}

// Breadcrumb Components
export interface BreadcrumbProps extends 
  HTMLAttributes<HTMLElement>,
  BaseComponentProps {
  separator?: ReactNode;
  maxItems?: number;
  itemsBeforeCollapse?: number;
  itemsAfterCollapse?: number;
  collapsible?: boolean;
  expandText?: string;
}

export interface BreadcrumbListProps extends 
  HTMLAttributes<HTMLOListElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface BreadcrumbItemProps extends 
  HTMLAttributes<HTMLLIElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface BreadcrumbLinkProps extends 
  HTMLAttributes<HTMLAnchorElement>,
  BaseComponentProps {
  href?: string;
  asChild?: boolean;
}

export interface BreadcrumbPageProps extends 
  HTMLAttributes<HTMLSpanElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface BreadcrumbSeparatorProps extends 
  HTMLAttributes<HTMLLIElement>,
  BaseComponentProps {
  asChild?: boolean;
}

export interface BreadcrumbEllipsisProps extends 
  HTMLAttributes<HTMLSpanElement>,
  BaseComponentProps {
  asChild?: boolean;
}

// ============================================================================
// ANIMATION & MOTION TYPES
// ============================================================================

export interface ZenAnimationProps {
  animate?: boolean;
  duration?: number | string;
  delay?: number;
  ease?: string;
  reduceMotion?: boolean;
  spring?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
}

export interface ZenTransitionProps extends ZenAnimationProps {
  initial?: any;
  animate?: any;
  exit?: any;
  whileHover?: any;
  whileTap?: any;
  whileFocus?: any;
  whileInView?: any;
  layout?: boolean;
  layoutId?: string;
}

// ============================================================================
// FORM & VALIDATION TYPES
// ============================================================================

export interface ZenFormProps {
  onSubmit?: (data: any) => void | Promise<void>;
  validation?: any; // React Hook Form or similar
  children: ReactNode;
  className?: string;
  noValidate?: boolean;
}

export interface ZenFieldProps {
  name: string;
  label?: string;
  error?: string;
  required?: boolean;
  description?: string;
  disabled?: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type ZenSize = 'sm' | 'default' | 'lg';
export type ZenVariant = 'default' | 'primary' | 'secondary' | 'destructive' | 'accent' | 'ghost' | 'outline';
export type ZenState = 'default' | 'loading' | 'success' | 'error' | 'warning';
export type ZenPosition = 'top' | 'bottom' | 'left' | 'right';
export type ZenAlign = 'start' | 'center' | 'end';
export type ZenOrientation = 'horizontal' | 'vertical';
export type ZenDirection = 'ltr' | 'rtl';

// Color utility types
export type ZenColorScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ZenColorName = keyof ZenTokens['colors'];

// Responsive utility types
export type ZenBreakpoint = keyof ZenTokens['breakpoints'];
export type ZenResponsive<T> = T | Partial<Record<ZenBreakpoint, T>>;

// Component variant utility types
export type ExtractVariantProps<T> = T extends VariantProps<infer U> ? U : never;

// Polymorphic component utility types
export type PropsWithAs<P, T extends ElementType> = P & {
  as?: T;
} & Omit<ComponentProps<T>, keyof P>;

// Event handler utility types
export type ZenEventHandler<T = Element, E = Event> = (event: E & { currentTarget: T }) => void;
export type ZenChangeHandler<T = any> = (value: T) => void;
export type ZenFocusHandler<T = Element> = ZenEventHandler<T, FocusEvent>;
export type ZenKeyboardHandler<T = Element> = ZenEventHandler<T, KeyboardEvent>;
export type ZenMouseHandler<T = Element> = ZenEventHandler<T, MouseEvent>;

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface ZenContextValue<T = any> {
  value: T;
  setValue: (value: T) => void;
}

export interface ZenProviderProps<T = any> {
  value?: T;
  defaultValue?: T;
  onValueChange?: (value: T) => void;
  children: ReactNode;
}

// ============================================================================
// COMPONENT COMPOSITION TYPES
// ============================================================================

export interface ZenCompositeComponent<T = {}> {
  Root: React.ComponentType<T>;
  [key: string]: React.ComponentType<any>;
}

// Slot-based composition
export interface ZenSlotProps {
  children?: ReactNode;
  asChild?: boolean;
}

// ============================================================================
// ACCESSIBILITY TYPES
// ============================================================================

export interface ZenA11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'off' | 'assertive' | 'polite';
  'aria-atomic'?: boolean;
  'aria-busy'?: boolean;
  'aria-controls'?: string;
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-details'?: string;
  'aria-errormessage'?: string;
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-invalid'?: boolean | 'grammar' | 'spelling';
  'aria-keyshortcuts'?: string;
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-owns'?: string;
  'aria-placeholder'?: string;
  'aria-pressed'?: boolean | 'mixed';
  'aria-readonly'?: boolean;
  'aria-required'?: boolean;
  'aria-roledescription'?: string;
  role?: string;
  tabIndex?: number;
}

// ============================================================================
// THEME CREATION UTILITY TYPES
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ZenThemeInput = DeepPartial<ZenTheme>;

export interface ZenThemeConfig {
  extend?: ZenThemeInput;
  override?: ZenThemeInput;
}

// ============================================================================
// COMPONENT FACTORY TYPES
// ============================================================================

export interface ZenComponentConfig<P = {}> {
  displayName?: string;
  defaultProps?: Partial<P>;
  variants?: any; // CVA variants
  compound?: any; // CVA compound variants
}

export type ZenComponentFactory<P = {}> = (config: ZenComponentConfig<P>) => React.ComponentType<P>;

// ============================================================================
// EXPORT UTILITY TYPES
// ============================================================================

// Re-export commonly used React types for convenience
export type {
  ReactNode,
  ComponentProps,
  ElementType,
  HTMLAttributes,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  FormHTMLAttributes,
  SelectHTMLAttributes,
  OptionHTMLAttributes,
  LabelHTMLAttributes,
  FieldsetHTMLAttributes,
  DetailsHTMLAttributes,
  DialogHTMLAttributes,
  MenuHTMLAttributes,
  ProgressHTMLAttributes,
  MeterHTMLAttributes,
  OutputHTMLAttributes,
  DataHTMLAttributes,
  TimeHTMLAttributes,
} from 'react';

export type { VariantProps } from 'class-variance-authority'; 