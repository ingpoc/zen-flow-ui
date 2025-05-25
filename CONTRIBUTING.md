# Contributing to Zen Flow UI

> 🎋 **"Simplicity is the ultimate sophistication. Every contribution should breathe with purpose."**

Thank you for your interest in contributing to Zen Flow UI! This guide will help you get started.

## 🌟 Code of Conduct

Be respectful, inclusive, and constructive. We're building something beautiful together.

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm 8+
- Git

### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/zen-flow-ui.git
cd zen-flow-ui

# Install dependencies
npm install

# Start development mode
npm run dev

# Run tests
npm test
```

## 🎯 How to Contribute

### 1. **Bug Reports**
- Use the bug report template
- Include reproduction steps
- Provide environment details
- Add screenshots if helpful

### 2. **Feature Requests**
- Use the feature request template
- Explain the use case and motivation
- Provide design specifications
- Consider accessibility and responsive design

### 3. **Code Contributions**

#### **Component Development Guidelines**

**🎨 Design Principles**
- **Minimalist Clarity**: Every element serves a purpose
- **Rhythmic Structure**: Use 8px grid system
- **Organic Motion**: Natural animations (300ms default)
- **Breathing Space**: Generous use of negative space
- **Subtle Depth**: Soft shadows, avoid harsh borders

**🔧 Technical Requirements**
- TypeScript first approach
- Full accessibility support (WCAG AA)
- Responsive design (mobile-first)
- Dark mode compatibility
- Motion sensitivity support

**📝 Component Structure**
```tsx
// Component: ComponentName
// Purpose: What it does
// Usage: When to use it

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const componentVariants = cva(
  // Base styles
  ['base-classes'],
  {
    variants: {
      variant: {
        default: ['default-styles'],
        // ... other variants
      },
      size: {
        sm: ['small-styles'],
        default: ['default-size'],
        lg: ['large-styles'],
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {
  // Component-specific props
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size }), className)}
        style={{
          // CSS custom properties for theming
          '--zen-color': '#value',
        } as React.CSSProperties}
        {...props}
      />
    );
  }
);

Component.displayName = 'Component';

export { Component, componentVariants };
```

**🎨 Styling Guidelines**
- Use Tailwind CSS utility classes
- Follow BEM-inspired naming: `zen-component`, `zen-component__element`
- Use CSS custom properties for theming
- Implement hover, focus, and active states
- Support `prefers-reduced-motion`

**♿ Accessibility Checklist**
- [ ] Semantic HTML elements
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Focus management
- [ ] Screen reader compatibility
- [ ] Color contrast compliance (4.5:1 minimum)
- [ ] Touch target size (44x44px minimum)

### 4. **Pull Request Process**

1. **Create a feature branch**
   ```bash
   git checkout -b feature/component-name
   git checkout -b fix/issue-description
   ```

2. **Make your changes**
   - Follow the coding standards
   - Add/update tests
   - Update documentation

3. **Test thoroughly**
   ```bash
   npm run test
   npm run lint
   npm run type-check
   npm run build
   ```

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new Button component"
   git commit -m "fix: resolve Modal focus trap issue"
   git commit -m "docs: update README with new examples"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/component-name
   ```

6. **Fill out the PR template completely**

## 📚 Documentation Guidelines

### Component Documentation
Each component should include:
- **Purpose**: What the component does
- **Usage**: When and how to use it
- **Props**: All available props with types
- **Examples**: Basic and advanced usage
- **Accessibility**: Keyboard navigation and screen reader support
- **Styling**: Available variants and customization

### Code Comments
- Explain complex logic
- Document accessibility considerations
- Note browser compatibility issues
- Explain design decisions

## 🧪 Testing

### Test Requirements
- Unit tests for all components
- Accessibility tests
- Visual regression tests (when applicable)
- Integration tests for complex interactions

### Testing Tools
- Jest for unit testing
- React Testing Library for component testing
- Axe for accessibility testing

### Test Structure
```tsx
describe('ComponentName', () => {
  it('renders correctly', () => {
    // Basic rendering test
  });

  it('handles user interactions', () => {
    // Interaction tests
  });

  it('is accessible', () => {
    // Accessibility tests
  });

  it('supports keyboard navigation', () => {
    // Keyboard tests
  });
});
```

## 🎨 Design Token System

### Using Design Tokens
```tsx
// Import tokens
import { tokens } from '../lib/tokens';

// Use in components
const style = {
  color: tokens.colors.water,
  fontSize: tokens.typography.fontSize.lg,
  padding: tokens.spacing.md,
};
```

### Adding New Tokens
1. Add to `src/lib/tokens.ts`
2. Update CSS custom properties
3. Add to Tailwind config
4. Document the new tokens

## 📦 Release Process

### Version Bumping
```bash
# Patch release (bug fixes)
npm version patch

# Minor release (new features)
npm version minor

# Major release (breaking changes)
npm version major
```

### Automated Publishing
- Push tags trigger automatic NPM publishing
- GitHub Actions handle the build and release process
- Releases are created automatically with changelogs

## 🎯 Component Roadmap

### High Priority
- [ ] Tabs component
- [ ] Dropdown menu
- [ ] DatePicker
- [ ] Table component
- [ ] Navigation components

### Medium Priority
- [ ] Charts and data visualization
- [ ] Form validation helpers
- [ ] Layout components
- [ ] Advanced modals (drawer, popover)

### Low Priority
- [ ] Animation utilities
- [ ] Theme customization tools
- [ ] Additional design tokens

## 🐛 Debugging

### Common Issues
- **Build failures**: Check TypeScript errors
- **Test failures**: Ensure all tests pass before submitting
- **Accessibility issues**: Run axe-core tests
- **Bundle size**: Keep components lightweight

### Development Tools
- React DevTools
- Accessibility insights
- Bundle analyzer
- Performance profiler

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Pull Request Reviews**: For code feedback

## 🏆 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit in component documentation

## 📋 Checklist for Contributors

Before submitting a PR:
- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Accessibility requirements met
- [ ] TypeScript definitions added
- [ ] Examples provided
- [ ] Design tokens used appropriately
- [ ] Responsive design implemented
- [ ] Browser compatibility verified

---

**Thank you for contributing to Zen Flow UI! Together, we're building something beautiful and purposeful.** 🎋

*"In the intersection of form and function lies the essence of great design."*
