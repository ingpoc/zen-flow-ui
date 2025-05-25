# Zen Flow UI - Getting Started

## Project Structure

```
zen-flow-ui/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Toggle.tsx
│   │       ├── Modal.tsx
│   │       ├── Progress.tsx
│   │       ├── Notification.tsx
│   │       ├── Select.tsx
│   │       └── Accordion.tsx
│   ├── lib/
│   │   ├── tokens.ts
│   │   └── utils.ts
│   ├── styles/
│   │   └── globals.css
│   └── index.ts
├── cli/
│   └── index.js
├── examples/
│   └── App.tsx
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── rollup.config.js
└── jest.config.js
```

## Quick Start for Developers

### 1. Install Dependencies

```bash
cd zen-flow-ui
npm install
```

### 2. Development

```bash
# Start development mode with watch
npm run dev

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests
npm run test
```

### 3. Build Library

```bash
npm run build
```

This creates:
- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES modules build
- `dist/index.d.ts` - TypeScript definitions

### 4. Test CLI Tool

```bash
# Make CLI executable
chmod +x cli/index.js

# Test CLI commands
./cli/index.js list
./cli/index.js add button
```

## Publishing to NPM

### 1. Setup NPM Account

```bash
npm login
```

### 2. Build and Publish

```bash
npm run build
npm publish --access public
```

### 3. Test Installation

```bash
# In a new project
npm install @zen-flow/ui
npx zen-ui init
npx zen-ui add button
```

## Usage in Consumer Projects

### Installation

```bash
npm install @zen-flow/ui
npm install class-variance-authority clsx tailwind-merge framer-motion
```

### Setup

1. **Initialize components:**
```bash
npx zen-ui init
```

2. **Import global styles:**
```tsx
import '@zen-flow/ui/styles/globals.css';
```

3. **Use components:**
```tsx
import { Button, Card, Input } from '@zen-flow/ui';

function App() {
  return (
    <Card>
      <Input label="Name" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Component Features

### ✅ Completed Components

1. **Button** - Multiple variants, loading states, icons, ripple effects
2. **Card** - Hover animations, accent bars, multiple variants
3. **Input/Textarea** - Floating labels, validation states, focus effects
4. **Toggle/Checkbox** - Smooth animations, labels, descriptions
5. **Modal** - Backdrop blur, keyboard navigation, accessibility
6. **Progress** - Linear and circular, shimmer effects, variants
7. **Notification** - Toast system, auto-dismiss, multiple variants
8. **Select** - Keyboard navigation, search, disabled options
9. **Accordion** - Single/multiple selection, smooth animations

### 🎨 Design Features

- **Japanese Minimalism** - Clean, purposeful design
- **Mathematical Spacing** - 8px grid system
- **Subtle Animations** - Natural, organic motion
- **Accessibility First** - WCAG compliant, keyboard navigation
- **Dark Mode Ready** - CSS custom properties support
- **Motion Sensitive** - Respects `prefers-reduced-motion`

### 🔧 Developer Features

- **TypeScript First** - Full type safety
- **Tree Shakable** - Import only what you need
- **CLI Tool** - Easy component installation
- **Design Tokens** - Programmatic access to design values
- **Consistent API** - Similar props across components
- **Flexible Styling** - Tailwind CSS + CSS-in-JS support

## Next Steps

1. **Testing** - Add comprehensive test coverage
2. **Storybook** - Create interactive documentation
3. **More Components** - Tabs, Dropdown, DatePicker, etc.
4. **Themes** - Multiple color schemes
5. **Documentation Site** - Full documentation website
6. **Examples** - More usage examples and templates

## Contributing

1. Fork the repository
2. Create your feature branch
3. Add tests for new components
4. Update documentation
5. Submit a pull request

## License

MIT - Feel free to use in personal and commercial projects.

---

**Built with ❤️ following Zen Flow Design Principles**
