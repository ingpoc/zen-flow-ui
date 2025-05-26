// ============================================================================
// ZEN FLOW UI - MAIN EXPORT FILE
// ============================================================================

// ============================================================================
// AVAILABLE COMPONENTS
// ============================================================================

// Core UI Components
export { Button, buttonVariants } from './components/ui/Button';
export { Textarea, textareaVariants } from './components/ui/Textarea';
export { 
  Popover, 
  PopoverTrigger, 
  PopoverContent, 
  PopoverAnchor,
  PopoverClose,
  popoverContentVariants,
  usePopover 
} from './components/ui/Popover';
export { 
  Breadcrumb, 
  BreadcrumbSeparator, 
  BreadcrumbItem,
  breadcrumbVariants,
  breadcrumbItemVariants,
  breadcrumbSeparatorVariants,
  useBreadcrumbFromPath
} from './components/ui/Breadcrumb';

// Form Components
export { Input, inputVariants } from './components/ui/Input';
export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  selectVariants
} from './components/ui/Select';

// Layout Components
export { 
  Card, 
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants 
} from './components/ui/Card';
export { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants
} from './components/ui/Accordion';
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants
} from './components/ui/Tabs';

// Feedback Components
export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants
} from './components/ui/Alert';
export { Progress, progressVariants } from './components/ui/Progress';
export { Notification, notificationVariants } from './components/ui/Notification';
export { Modal, modalOverlayVariants, modalContentVariants } from './components/ui/Modal';

// Data Display Components
export {
  DataTable,
  tableVariants,
  tableHeaderVariants,
  tableCellVariants
} from './components/ui/DataTable';
export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
  commandVariants
} from './components/ui/Command';

// Interactive Components
export { Toggle, toggleVariants } from './components/ui/Toggle';

// Missing Components
export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from './components/ui/Dialog';
export { 
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from './components/ui/Tooltip';
export { 
  Slider,
  sliderVariants
} from './components/ui/Slider';
export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupDescription,
  radioGroupVariants,
  radioGroupItemVariants
} from './components/ui/RadioGroup';

// ============================================================================
// TYPES
// ============================================================================

export type {
  // Core Types
  AsChildProps,
  ZenMotionConfig,
  ZenTheme,
  ZenTokens,
  
  // Core Component Props
  ButtonProps,
  TextareaProps,
  PopoverProps,
  PopoverContentProps,
  PopoverTriggerProps,
  PopoverAnchorProps,
  PopoverCloseProps,
  BreadcrumbProps,
  
  // Form Component Props
  InputProps,
  SelectProps,
  SelectOption,
  SelectTriggerProps,
  SelectValueProps,
  SelectContentProps,
  SelectItemProps,
  
  // Layout Component Props
  CardProps,
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  
  // Feedback Component Props
  AlertProps,
  AlertTitleProps,
  AlertDescriptionProps,
  ProgressProps,
  
  // Interactive Component Props
  ToggleProps,
  
  // Core props that exist in types
  BaseComponentProps,
  
  // Animation & Motion Types
  ZenAnimationProps,
  ZenTransitionProps,
  
  // Form & Validation Types
  ZenFormProps,
  ZenFieldProps,
  
  // Utility Types
  ZenSize,
  ZenVariant,
  ZenState,
  ZenPosition,
  ZenAlign,
  ZenOrientation,
  ZenDirection,
  
  // Theme Types
  DeepPartial,
  ZenThemeInput,
} from './types';

// ============================================================================
// THEME SYSTEM
// ============================================================================

export {
  // Theme Creation
  createZenTheme,
  getThemeTokens,
  generateCSSCustomProperties,
  applyThemeToRoot,
  
  // Motion Utilities
  getMotionDuration,
  getMotionEase,
  
  // Color Utilities
  colorUtils,
  
  // Predefined Themes
  zenThemes,
  
  // Default Tokens
  defaultZenTokens,
  darkZenTokens,
} from './lib/theme';

// ============================================================================
// UTILITIES
// ============================================================================

export {
  cn,
  sleep,
  formatClasses,
  createCSSProps,
  debounce,
  shouldReduceMotion,
  getAnimationDuration,
} from './lib/utils';

export {
  createContext,
} from './lib/create-context';

// ============================================================================
// VERSION
// ============================================================================

export const version = '2.1.2';

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

import { Button } from './components/ui/Button';
import { Textarea } from './components/ui/Textarea';
import { Popover, PopoverTrigger, PopoverContent } from './components/ui/Popover';
import { Breadcrumb } from './components/ui/Breadcrumb';
import { Input } from './components/ui/Input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './components/ui/Select';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/ui/Card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './components/ui/Accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/Tabs';
import { Alert, AlertTitle, AlertDescription } from './components/ui/Alert';
import { Progress } from './components/ui/Progress';
import { Notification } from './components/ui/Notification';
import { Modal } from './components/ui/Modal';
import { DataTable } from './components/ui/DataTable';
import { Command, CommandInput, CommandList, CommandEmpty, CommandLoading, CommandGroup, CommandItem, CommandSeparator, CommandDialog } from './components/ui/Command';
import { Toggle } from './components/ui/Toggle';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from './components/ui/Dialog';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/ui/Tooltip';
import { Slider } from './components/ui/Slider';
import { RadioGroup, RadioGroupItem, RadioGroupLabel, RadioGroupDescription } from './components/ui/RadioGroup';
import { createZenTheme, zenThemes, applyThemeToRoot } from './lib/theme';
import { cn } from './lib/utils';
import { createContext } from './lib/create-context';

const ZenFlowUI = {
  // Core UI Components
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Breadcrumb,
  
  // Form Components
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  
  // Layout Components
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  
  // Feedback Components
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  Notification,
  Modal,
  
  // Data Display Components
  DataTable,
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandLoading,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandDialog,
  
  // Interactive Components
  Toggle,
  
  // Missing Components
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Slider,
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
  RadioGroupDescription,
  
  // Theme
  createZenTheme,
  zenThemes,
  applyThemeToRoot,
  
  // Utilities
  cn,
  createContext,
  
  // Version
  version,
};

export default ZenFlowUI;

// ============================================================================
// FUTURE COMPONENTS (commented out for reference)
// ============================================================================

/*
TODO: Implement these components based on the improvement plan:

Core Components:
- Card, CardHeader, CardContent, CardFooter
- Input
- Select, SelectTrigger, SelectValue, SelectContent, SelectItem
- Tabs, TabsList, TabsTrigger, TabsContent
- Alert, AlertTitle, AlertDescription
- Progress
- Toggle
- Modal
- Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription

Advanced Components:
- Command (command palette)
- DataTable (with sorting/filtering)
- ContextMenu
- NavigationMenu
- Menubar
- Pagination
- DatePicker
- RadioGroup, RadioGroupItem
- Slider
- AspectRatio
- ScrollArea
*/
