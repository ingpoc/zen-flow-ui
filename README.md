# Zen Flow UI

<div align="center">
  <h2>🎋 A minimalist React component library inspired by Japanese design principles</h2>
  <p>Where every component breathes with purpose and flows with intention</p>
</div>

---

## Philosophy

Zen Flow UI synthesizes timeless design principles with modern web aesthetics, drawing inspiration from:

- **Japanese Minimalism**: The beauty of negative space and restraint
- **Swiss Design**: Mathematical precision and systematic thinking  
- **Material Design**: Meaningful motion and depth
- **Brutalist Web Design**: Raw functionality over decoration

Every design decision flows through three filters:
1. **Does it serve the user's goal?** (Function)
2. **Is it visually coherent?** (Form)  
3. **Does it spark joy?** (Delight)

## Installation

```bash
npm install @zen-flow/ui
```

### Dependencies

Install the required peer dependencies:

```bash
npm install react react-dom
npm install class-variance-authority clsx tailwind-merge framer-motion
```

### Setup

1. **Initialize Zen Flow UI in your project:**

```bash
npx zen-ui init
```

2. **Import global styles in your app:**

```tsx
import '@zen-flow/ui/styles/globals.css';
```

3. **Wrap your app with ToastProvider (if using notifications):**

```tsx
import { ToastProvider } from '@zen-flow/ui';

function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
    </ToastProvider>
  );
}
```

## CLI Usage

The Zen Flow UI CLI helps you add components to your project:

```bash
# List all available components
npx zen-ui list

# Add a specific component
npx zen-ui add button
npx zen-ui add card
npx zen-ui add input

# Initialize the library
npx zen-ui init
```

## Components

### Button

Interactive button with multiple variants and subtle animations.

```tsx
import { Button } from '@zen-flow/ui';

function Example() {
  return (
    <div className="space-x-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="ghost">Ghost</Button>
      <Button loading>Loading...</Button>
    </div>
  );
}
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'accent' | 'ghost' | 'destructive'`
- `size`: `'sm' | 'default' | 'lg' | 'icon'`
- `loading`: `boolean`
- `leftIcon`, `rightIcon`: `ReactNode`

### Card

Container for related content with hover effects and accent bar.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@zen-flow/ui';

function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Minimalist Design</CardTitle>
        <CardDescription>Every element serves a purpose</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content goes here...</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  );
}
```

**Props:**
- `variant`: `'default' | 'outlined' | 'elevated' | 'flat'`
- `padding`: `'none' | 'sm' | 'default' | 'lg'`

### Input & Textarea

Text inputs with floating labels and elegant focus states.

```tsx
import { Input, Textarea } from '@zen-flow/ui';

function Example() {
  const [value, setValue] = useState('');
  
  return (
    <div className="space-y-4">
      <Input
        label="Your Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Enter your full name"
      />
      
      <Textarea
        label="Message"
        placeholder="Tell us about your project..."
        helperText="Minimum 10 characters"
      />
    </div>
  );
}
```

**Props:**
- `label`: `string`
- `helperText`: `string`
- `error`: `string`
- `variant`: `'default' | 'error' | 'success'`
- `size`: `'sm' | 'default' | 'lg'`

### Toggle & Checkbox

Switch and checkbox components with smooth animations.

```tsx
import { Toggle, Checkbox } from '@zen-flow/ui';

function Example() {
  const [toggleValue, setToggleValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  
  return (
    <div className="space-y-4">
      <Toggle
        checked={toggleValue}
        onChange={setToggleValue}
        label="Enable notifications"
        description="Receive updates about your account"
      />
      
      <Checkbox
        checked={checkboxValue}
        onChange={setCheckboxValue}
        label="I agree to the terms"
      />
    </div>
  );
}
```

### Select

Dropdown select with keyboard navigation and search.

```tsx
import { Select, type SelectOption } from '@zen-flow/ui';

function Example() {
  const [value, setValue] = useState('');
  
  const options: SelectOption[] = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
    { value: 'option4', label: 'Disabled Option', disabled: true },
  ];
  
  return (
    <Select
      label="Choose an option"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select your preference..."
    />
  );
}
```

### Modal

Overlay dialog with backdrop blur and smooth transitions.

```tsx
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription,
  ModalFooter,
  ModalClose,
  Button 
} from '@zen-flow/ui';

function Example() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      
      <Modal open={open} onOpenChange={setOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Confirm Action</ModalTitle>
            <ModalDescription>
              Are you sure you want to continue?
            </ModalDescription>
          </ModalHeader>
          
          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </ModalFooter>
          
          <ModalClose onClick={() => setOpen(false)} />
        </ModalContent>
      </Modal>
    </>
  );
}
```

### Progress

Progress indicators with shimmer effects and variants.

```tsx
import { Progress, CircularProgress } from '@zen-flow/ui';

function Example() {
  return (
    <div className="space-y-8">
      <Progress value={65} showLabel label="Upload Progress" />
      <Progress value={85} variant="success" showLabel />
      
      <div className="flex justify-center">
        <CircularProgress value={75} size={120} showLabel label="Completion" />
      </div>
    </div>
  );
}
```

### Notifications

Toast notifications with auto-dismiss and variants.

```tsx
import { useToast, Button } from '@zen-flow/ui';

function Example() {
  const { addToast } = useToast();
  
  const showSuccess = () => {
    addToast({
      variant: 'success',
      title: 'Success!',
      description: 'Your action was completed successfully',
    });
  };
  
  return (
    <div className="space-x-4">
      <Button onClick={showSuccess}>Show Success</Button>
      <Button onClick={() => addToast({
        variant: 'error',
        title: 'Error',
        description: 'Something went wrong'
      })}>
        Show Error
      </Button>
    </div>
  );
}
```

### Accordion

Collapsible content sections with smooth animations.

```tsx
import { Accordion, type AccordionItemData } from '@zen-flow/ui';

function Example() {
  const [value, setValue] = useState('');
  
  const items: AccordionItemData[] = [
    {
      value: 'item-1',
      title: 'What is Zen Flow Design?',
      content: <p>A minimalist approach to user interface design...</p>
    },
    {
      value: 'item-2', 
      title: 'Core Principles',
      content: <p>Clarity, Structure, System, Space, and Story...</p>
    }
  ];
  
  return (
    <Accordion
      items={items}
      value={value}
      onValueChange={setValue}
      collapsible
    />
  );
}
```

### Skeleton

Placeholder content with shimmer animation.

```tsx
import { Skeleton } from '@zen-flow/ui';

function Example() {
  return (
    <div className="space-y-4">
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-4/5" />
      <Skeleton variant="box" className="h-32" />
    </div>
  );
}
```

## Design Tokens

Access design tokens programmatically:

```tsx
import { tokens, generateCSSCustomProperties } from '@zen-flow/ui';

// Use tokens in your components
const customStyle = {
  color: tokens.colors.water,
  fontSize: tokens.typography.fontSize.lg,
  padding: tokens.spacing.md,
};

// Generate CSS custom properties
const cssVars = generateCSSCustomProperties();
```

## Customization

### Tailwind CSS Configuration

Add Zen Flow colors to your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  content: [
    // ... your content paths
  ],
  theme: {
    extend: {
      colors: {
        'zen-void': '#0a0a0a',
        'zen-ink': '#1a1a1a',
        'zen-shadow': '#2a2a2a',
        'zen-stone': '#4a4a4a',
        'zen-mist': '#8a8a8a',
        'zen-cloud': '#dadada',
        'zen-paper': '#fafafa',
        'zen-light': '#ffffff',
        'zen-accent': '#ff4757',
        'zen-water': '#3742fa',
        'zen-leaf': '#26de81',
        'zen-sun': '#fed330',
      },
    },
  },
  plugins: [],
};
```

### CSS Custom Properties

Override design tokens using CSS custom properties:

```css
:root {
  --zen-accent: #your-color;
  --zen-water: #your-color;
  --zen-space-md: 20px;
}
```

## Accessibility

All components follow WCAG guidelines and include:

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantics
- **Focus Management**: Visible focus indicators
- **Motion Sensitivity**: Respects `prefers-reduced-motion`
- **High Contrast**: Supports high contrast mode
- **Touch Targets**: Minimum 44x44px touch areas

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p><em>"Design is not about making things pretty—it's about making things work beautifully."</em></p>
  
  **Built with ❤️ by the Zen Flow Team**
</div>
