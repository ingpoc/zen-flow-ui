# Zen Flow UI - Getting Started

## Project Overview

Zen Flow UI is a minimalist React component library inspired by Japanese design principles. Built with TypeScript, Tailwind CSS, and modern web standards, it provides 20+ production-ready components with excellent accessibility and performance.

### Key Features

✨ **Clean Architecture** - No inline style anti-patterns, optimized for performance  
🎨 **Japanese Design Principles** - Minimalist aesthetics with purposeful interactions  
♿ **Accessibility First** - WCAG 2.1 AA compliant with full keyboard navigation  
🔧 **TypeScript Native** - Full type safety and excellent developer experience  
⚡ **Performance Optimized** - Tree-shakable, lightweight, and fast  

## Project Structure

```
zen-flow-ui/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Accordion.tsx      # Collapsible content sections
│   │       ├── Alert.tsx          # Status messages and notifications
│   │       ├── Breadcrumb.tsx     # Navigation breadcrumbs
│   │       ├── Button.tsx         # Interactive buttons with variants
│   │       ├── Card.tsx           # Content containers
│   │       ├── Command.tsx        # Command palette with search
│   │       ├── DataTable.tsx      # Advanced data tables
│   │       ├── Dialog.tsx         # Modal dialogs
│   │       ├── Input.tsx          # Text inputs with floating labels
│   │       ├── Modal.tsx          # Overlay modals
│   │       ├── Notification.tsx   # Toast notifications
│   │       ├── Popover.tsx        # Floating content
│   │       ├── Progress.tsx       # Progress indicators
│   │       ├── RadioGroup.tsx     # Radio button groups
│   │       ├── Select.tsx         # Dropdown selections
│   │       ├── Slider.tsx         # Range sliders
│   │       ├── Tabs.tsx           # Tab navigation
│   │       ├── Textarea.tsx       # Multi-line text inputs
│   │       ├── Toggle.tsx         # Switch components
│   │       └── Tooltip.tsx        # Contextual information
│   ├── lib/
│   │   ├── theme.ts              # Theme system and tokens
│   │   ├── theme-constants.ts    # Design token constants
│   │   ├── utils.ts              # Utility functions
│   │   └── create-context.ts     # React context helpers
│   ├── styles/
│   │   └── globals.css           # Global styles and CSS variables
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── index.ts                  # Main export file
├── cli/
│   └── index.cjs                 # CLI tool for component discovery
├── examples/
│   └── App.tsx                   # Usage examples
├── docs/
│   ├── GETTING_STARTED.md        # This file
│   ├── CONTRIBUTING.md           # Contribution guidelines
│   └── DEPLOYMENT.md             # Deployment instructions
├── package.json                  # Project configuration
├── README.md                     # Project documentation
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── rollup.config.js             # Build configuration
└── jest.config.js               # Test configuration
```

## Quick Start for Developers

### 1. Install Dependencies

```bash
cd zen-flow-ui
npm install
```

### 2. Development Commands

```bash
# Start development mode with watch
npm run dev

# Run linting (with recent fixes)
npm run lint

# Run type checking
npm run type-check

# Run tests
npm run test

# Build library for production
npm run build
```

### 3. Build Output

The build process creates:
- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES modules build  
- `dist/index.d.ts` - TypeScript definitions
- `dist/styles/` - Compiled CSS styles

## Recent Improvements (v2.1.2)

### ✅ Build Quality Improvements

**Problem**: The build process had TypeScript errors and warnings that could affect library consumers.

**Solution**: Comprehensive build fixes:

1. **Clean Build Process**: Moved `App.tsx` and demo files to `examples/` folder
2. **TypeScript Fixes**: Resolved all interface conflicts and type errors
3. **Framer Motion Compatibility**: Fixed animation prop conflicts in Dialog and Tooltip
4. **Package Structure**: Updated repository URL and package metadata
5. **Zero Build Warnings**: Achieved completely clean TypeScript compilation

### ✅ Fixed Inline Style Anti-Patterns (v2.1.1)

**Problem**: Several components were using hardcoded inline styles which hurt performance and maintainability.

**Solution**: Replaced all inline style anti-patterns with CSS classes and design tokens:

1. **Select Component**: Replaced positioning styles with Tailwind classes
2. **Accordion Component**: Removed hardcoded CSS custom properties, improved animations
3. **Slider Component**: Fixed TypeScript interface conflicts and removed inline styles
4. **Tooltip Component**: Moved positioning logic to CSS classes where possible
5. **Popover Component**: Cleaned up overlay positioning styles

### ✅ Enhanced TypeScript Support

**Improvements**:
- Fixed interface conflicts in Slider, Dialog, and Tooltip components
- Better type definitions for all component props with proper HTMLAttributes exclusions
- Improved compatibility with React HTML attributes and Framer Motion
- Enhanced developer experience with better IntelliSense and zero build errors

### ✅ Performance Optimizations

**Achievements**:
- Eliminated style calculation overhead
- Improved runtime performance with CSS-only animations
- Better tree-shaking support with cleaner build structure
- Reduced bundle size impact
- Zero inline style anti-patterns across all components

## Component Categories

### ✅ Form & Input Components (7)
- **Button** - Multiple variants, loading states, icons, ripple effects
- **Input** - Floating labels, validation states, focus effects  
- **Textarea** - Auto-resize, character counting, validation
- **Select** - Keyboard navigation, search, disabled options
- **Toggle** - Smooth animations, labels, descriptions
- **RadioGroup** - Proper accessibility, keyboard navigation
- **Slider** - Range selection, tooltips, custom formatting

### ✅ Layout & Navigation (4)
- **Card** - Hover animations, accent bars, multiple variants
- **Accordion** - Single/multiple selection, smooth animations
- **Tabs** - Keyboard navigation, dynamic content
- **Breadcrumb** - Auto-generation from paths, custom separators

### ✅ Data Display (3)
- **DataTable** - Sorting, filtering, pagination, selection
- **Progress** - Linear and circular, shimmer effects, variants
- **Alert** - Multiple variants, dismissible, icons

### ✅ Overlay Components (4)
- **Modal** - Backdrop blur, keyboard navigation, accessibility
- **Dialog** - Focus management, escape handling, portal rendering
- **Popover** - Smart positioning, collision detection
- **Tooltip** - Hover/focus states, positioning, animations

### ✅ Utility Components (2)
- **Command** - Command palette, search, keyboard shortcuts
- **Notification** - Toast system, auto-dismiss, queue management

## Usage in Consumer Projects

### Installation

```bash
# Install the library (latest: v2.1.2)
npm install @gurusharan3107/zen-flow-ui

# Install peer dependencies
npm install react react-dom class-variance-authority clsx tailwind-merge framer-motion
```

### Setup Steps

1. **Import global styles in your app entry point:**
```tsx
// In App.tsx or main.tsx
import '@gurusharan3107/zen-flow-ui/styles/globals.css';
```

2. **Create utility helper (recommended):**
```tsx
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

3. **Configure Tailwind CSS:**
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
    },
  },
  plugins: [],
};
```

4. **Start using components:**
```tsx
import { Button, Card, Input, Select } from '@gurusharan3107/zen-flow-ui';

function App() {
  return (
    <Card className="max-w-md p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome to Zen Flow UI</h2>
      <div className="space-y-4">
        <Input label="Your Name" placeholder="Enter your name" />
        <Select 
          label="Country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'ca', label: 'Canada' },
            { value: 'uk', label: 'United Kingdom' },
          ]}
        />
        <Button className="w-full">Get Started</Button>
      </div>
    </Card>
  );
}
```

## Publishing to NPM

### Current Status
- **Published Version**: 2.1.2 ✅
- **NPM Package**: `@gurusharan3107/zen-flow-ui`
- **Registry**: https://www.npmjs.com/package/@gurusharan3107/zen-flow-ui
- **Build Status**: Clean TypeScript compilation with zero errors/warnings ✅

### Publishing Process

1. **Ensure version is updated:**
```bash
# Check current version
npm version

# Update version (if needed)
npm version patch|minor|major
```

2. **Build and test:**
```bash
npm run build
npm run test
npm run lint
```

3. **Publish to NPM:**
```bash
npm login
npm publish --access public
```

## Development Guidelines

### Code Quality Standards
- ✅ **No inline style anti-patterns** - Use CSS classes and design tokens
- ✅ **TypeScript strict mode** - Full type safety with zero build errors
- ✅ **Clean build process** - No warnings, proper component structure
- ✅ **Accessibility first** - WCAG 2.1 AA compliance
- ✅ **Performance optimized** - Tree-shakable, lightweight bundles
- ✅ **Motion sensitive** - Respect `prefers-reduced-motion`

### Component Development Checklist

When creating or updating components:

- [ ] **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- [ ] **TypeScript**: Proper interfaces, generic support where needed  
- [ ] **Styling**: Use design tokens, avoid inline styles, support theming
- [ ] **Animation**: Respect motion preferences, smooth transitions
- [ ] **Documentation**: JSDoc comments, usage examples
- [ ] **Testing**: Unit tests, accessibility tests
- [ ] **Performance**: Optimize renders, lazy loading where appropriate

### Design Token Usage

Always use design tokens instead of hardcoded values:

```tsx
// ✅ Good - Using design tokens
className="bg-zen-cloud text-zen-ink border-zen-mist"

// ❌ Bad - Hardcoded values  
style={{ backgroundColor: '#dadada', color: '#1a1a1a' }}
```

### Animation Best Practices

```tsx
// ✅ Good - Respects motion preferences
const reduceMotion = shouldReduceMotion();
const variants = !reduceMotion ? motionVariants : undefined;

// ✅ Good - CSS-based animations
className="transition-all duration-300 ease-out"

// ❌ Bad - Inline style animations
style={{ transition: 'all 0.3s ease-out' }}
```

## Testing Strategy

### Component Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Accessibility Testing
- Automated testing with jest-axe
- Manual testing with screen readers
- Keyboard navigation verification
- Color contrast validation

### Performance Testing
- Bundle size analysis
- Runtime performance profiling
- Memory usage monitoring
- Animation performance testing

## Troubleshooting

### Common Development Issues

**TypeScript errors:**
- Ensure all peer dependencies are installed
- Check tsconfig.json configuration
- Verify component prop interfaces
- Note: As of v2.1.2, all TypeScript errors have been resolved

**Styling issues:**
- Confirm Tailwind CSS is configured correctly
- Check that design tokens are properly imported
- Verify CSS custom properties are defined
- Note: All inline style anti-patterns have been eliminated

**Build failures:**
- Clear node_modules and reinstall dependencies
- Check Rollup configuration
- Verify all imports are correct
- Note: Build process is now completely clean with zero warnings

**Linting errors:**
- Run `npm run lint` to identify issues
- Use `npm run lint:fix` for auto-fixable problems
- Check ESLint configuration

## Next Development Priorities

### Phase 1: Quality Improvements
- [ ] Comprehensive test coverage (>90%)
- [ ] Storybook integration for component documentation
- [ ] Performance benchmarking and optimization

### Phase 2: Component Expansion
- [ ] DatePicker with internationalization
- [ ] ContextMenu with nested menus
- [ ] NavigationMenu with mega-menu support
- [ ] Pagination with infinite scroll

### Phase 3: Advanced Features
- [ ] Theme system with multiple presets
- [ ] Advanced animation system
- [ ] Form validation integration
- [ ] Data visualization components

## Contributing

We welcome contributions! Please see our [Contributing Guide](../CONTRIBUTING.md) for:
- Code style guidelines
- Pull request process
- Issue reporting
- Development workflow

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-component`
3. Make changes following our guidelines
4. Add tests and documentation
5. Submit a pull request

## License

MIT License - Feel free to use in personal and commercial projects.

---

**Built with ❤️ following Zen Flow Design Principles**
