# Zen Flow UI

<div align="center">
  <h2>🎋 A minimalist React component library inspired by Japanese design principles</h2>
  <p>Where every component breathes with purpose and flows with intention</p>
  
  [![NPM Version](https://img.shields.io/npm/v/@gurusharan3107/zen-flow-ui)](https://www.npmjs.com/package/@gurusharan3107/zen-flow-ui)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
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

## Features

✨ **20+ Production-Ready Components** - Carefully crafted with attention to detail  
🎨 **Japanese-Inspired Design** - Minimalist aesthetics with purposeful interactions  
♿ **Accessibility First** - WCAG compliant with full keyboard navigation  
🎭 **Motion-Sensitive** - Respects `prefers-reduced-motion` settings  
🔧 **TypeScript Native** - Full type safety and excellent DX  
🌙 **Dark Mode Ready** - CSS custom properties for easy theming  
📦 **Tree Shakable** - Import only what you need  
⚡ **Performance Optimized** - No inline style anti-patterns, clean CSS  

## Installation

```bash
npm install @gurusharan3107/zen-flow-ui
```

### Dependencies

Install the required peer dependencies:

```bash
npm install react react-dom
npm install class-variance-authority clsx tailwind-merge framer-motion
```

### Setup

1. **Import global styles in your app:**

```tsx
import '@gurusharan3107/zen-flow-ui/styles/globals.css';
```

2. **Add utilities** (create `src/lib/utils.ts`):

```tsx
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

3. **Wrap your app with ToastProvider (if using notifications):**

```tsx
import { ToastProvider } from '@gurusharan3107/zen-flow-ui';

function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
    </ToastProvider>
  );
}
```

## Quick Start

Here's a simple example to get you started:

```tsx
import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardContent } from '@gurusharan3107/zen-flow-ui';
import '@gurusharan3107/zen-flow-ui/styles/globals.css';

function App() {
  return (
    <div className="p-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Welcome to Zen Flow UI</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">A minimalist component library with Japanese design principles.</p>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
```

## Available Components

### Form & Input Components
- **Button** - Interactive button with multiple variants and subtle animations
- **Input** - Text input with floating labels and elegant focus states  
- **Textarea** - Multi-line text input with auto-resize capabilities
- **Select** - Dropdown select with keyboard navigation and search
- **Toggle** - Switch component with smooth animations
- **RadioGroup** - Radio button groups with proper accessibility
- **Slider** - Range slider with tooltips and custom formatting

### Layout & Navigation
- **Card** - Container for related content with hover effects
- **Accordion** - Collapsible content sections with smooth animations
- **Tabs** - Tab navigation with keyboard support
- **Breadcrumb** - Navigation breadcrumbs with automatic path detection

### Data Display
- **DataTable** - Advanced table with sorting, filtering, and pagination
- **Progress** - Linear and circular progress indicators
- **Alert** - Status messages with multiple variants

### Overlay Components
- **Modal** - Overlay dialog with backdrop blur and smooth transitions
- **Dialog** - Accessible dialog component with proper focus management
- **Popover** - Floating content with smart positioning
- **Tooltip** - Contextual information with hover and focus states

### Utility Components
- **Command** - Command palette with search and keyboard navigation
- **Notification** - Toast notifications with auto-dismiss

## Usage Examples

### Button with Loading State

```tsx
import { Button } from '@gurusharan3107/zen-flow-ui';

function Example() {
  const [loading, setLoading] = useState(false);
  
  return (
    <Button 
      loading={loading} 
      onClick={() => setLoading(true)}
      variant="primary"
    >
      {loading ? 'Processing...' : 'Submit'}
    </Button>
  );
}
```

### Card with Hover Effects

```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@gurusharan3107/zen-flow-ui';

function Example() {
  return (
    <Card variant="elevated" className="max-w-md">
      <CardHeader>
        <CardTitle>Minimalist Design</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Every element serves a purpose in this carefully crafted interface.</p>
      </CardContent>
    </Card>
  );
}
```

### Form with Validation

```tsx
import { Input, Button, Card, CardContent } from '@gurusharan3107/zen-flow-ui';

function Example() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  return (
    <Card className="max-w-md">
      <CardContent className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          helperText="We'll never share your email"
        />
        <Button className="w-full">Subscribe</Button>
      </CardContent>
    </Card>
  );
}
```

### Interactive Data Table

```tsx
import { DataTable } from '@gurusharan3107/zen-flow-ui';

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role' },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Developer' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
];

function Example() {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchable
      pagination
      pageSize={10}
    />
  );
}
```

## Customization

### Tailwind CSS Configuration

Add Zen Flow colors to your Tailwind config:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@gurusharan3107/zen-flow-ui/dist/**/*.js"
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
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
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
  --zen-accent: #your-brand-color;
  --zen-water: #your-primary-color;
  --zen-space-md: 20px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  :root {
    --zen-light: #0a0a0a;
    --zen-void: #ffffff;
  }
}
```

## Performance & Best Practices

### Code Quality
- ✅ **No Inline Style Anti-patterns** - All styling uses CSS classes and design tokens
- ✅ **Clean Build Process** - Zero TypeScript errors/warnings, optimized structure
- ✅ **Optimized Bundle Size** - Tree-shakable exports and efficient code splitting
- ✅ **TypeScript Native** - Full type safety with no runtime overhead

### Accessibility
- ✅ **WCAG 2.1 AA Compliant** - Tested with screen readers and keyboard navigation
- ✅ **Focus Management** - Proper focus trapping and restoration in modals
- ✅ **ARIA Labels** - Comprehensive labeling for assistive technologies
- ✅ **Keyboard Navigation** - Full keyboard support for all interactive elements

### Motion & Animation
- ✅ **Respects User Preferences** - Honors `prefers-reduced-motion` settings
- ✅ **Purposeful Motion** - Animations enhance UX without being distracting
- ✅ **Smooth Transitions** - GPU-accelerated animations for 60fps performance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues

**CSS not loading properly:**
- Ensure you've imported the global styles: `import '@gurusharan3107/zen-flow-ui/styles/globals.css'`
- Check that Tailwind CSS is configured properly in your project

**TypeScript errors:**
- Install required type dependencies: `npm install @types/react @types/react-dom`
- Ensure your `tsconfig.json` includes the `jsx` option

**Component styling issues:**
- Verify that `clsx` and `tailwind-merge` are installed
- Check that the `cn` utility function is properly imported and configured

**Animation performance:**
- Enable hardware acceleration: `transform3d(0,0,0)` or `will-change: transform`
- Consider using `prefers-reduced-motion` for users with motion sensitivity

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development

```bash
# Clone the repository
git clone https://github.com/ingpoc/zen-flow-ui.git

# Install dependencies
npm install

# Start development
npm run dev

# Run tests
npm run test

# Build library
npm run build
```

## Changelog

### v2.1.2 (Latest)
- ✅ **Build Quality Improvements**: Resolved all TypeScript build errors and warnings
- ✅ **Fixed Component Structure**: Moved demo files to examples folder for cleaner builds
- ✅ **Enhanced Type Safety**: Fixed Framer Motion conflicts in Dialog and Tooltip components
- ✅ **Package.json Improvements**: Updated repository URL format and package metadata
- ✅ **Clean Architecture**: Zero inline style anti-patterns, optimized performance

### v2.1.1
- ✅ Fixed inline style anti-patterns across all components
- ✅ Improved TypeScript definitions for better DX
- ✅ Enhanced accessibility features
- ✅ Optimized bundle size and performance
- ✅ Updated documentation and examples

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">
  <p><em>"Design is not about making things pretty—it's about making things work beautifully."</em></p>
  
  **Built with ❤️ by the Zen Flow Team**
  
  [Documentation](https://github.com/ingpoc/zen-flow-ui) • [NPM Package](https://www.npmjs.com/package/@gurusharan3107/zen-flow-ui) • [Issues](https://github.com/ingpoc/zen-flow-ui/issues)
</div>
