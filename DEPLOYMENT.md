# 🚀 Deployment Guide: GitHub to NPM

Complete step-by-step guide to deploy Zen Flow UI from GitHub to NPM.

## 📋 **Complete Deployment Workflow**

### **Phase 1: GitHub Repository Setup**

1. **Create GitHub Repository**
   ```bash
   # On GitHub.com, create new repository: zen-flow-ui
   # Choose: Public repository
   # Don't initialize with README (we have our own)
   ```

2. **Initialize Local Git Repository**
   ```bash
   cd /Users/gurusharan/Documents/Cline/zen-flow-ui
   
   # Initialize git
   git init
   
   # Add all files
   git add .
   
   # Commit initial version
   git commit -m "feat: initial Zen Flow UI component library
   
   - 9 core components (Button, Card, Input, etc.)
   - CLI tool for component installation
   - TypeScript definitions and accessibility support
   - Design tokens and utility functions
   - Comprehensive documentation"
   
   # Set main branch
   git branch -M main
   
   # Add remote origin (replace with your GitHub username)
   git remote add origin https://github.com/ingpoc/zen-flow-ui.git
   
   # Push to GitHub
   git push -u origin main
   ```

### **Phase 2: GitHub Secrets Setup**

1. **Generate NPM Access Token**
   ```bash
   # Login to npmjs.com
   # Go to: Access Tokens > Generate New Token
   # Choose: Automation token (for CI/CD)
   # Copy the token (starts with npm_...)
   ```

2. **Add GitHub Secrets**
   ```bash
   # On GitHub repository page:
   # Go to: Settings > Secrets and Variables > Actions
   # Click: "New repository secret"
   # Name: NPM_TOKEN
   # Value: [paste your npm token]
   ```

### **Phase 3: NPM Account Setup**

1. **NPM Login (Local)**
   ```bash
   # Login to your NPM account
   npm login
   
   # Verify login
   npm whoami
   ```

2. **Check Package Name Availability**
   ```bash
   # Check if @zen-flow/ui is available
   npm view @zen-flow/ui
   # Should return: npm ERR! 404 (meaning it's available)
   ```

### **Phase 4: Manual First Publish**

1. **Pre-Publishing Verification**
   ```bash
   cd zen-flow-ui
   
   # Install dependencies
   npm install
   
   # Run full test suite
   npm run type-check
   npm run lint
   npm run test
   npm run build
   
   # Verify build output
   ls -la dist/
   # Should see: index.js, index.esm.js, index.d.ts
   
   # Check what will be published
   npm pack --dry-run
   ```

2. **First Manual Publish**
   ```bash
   # Publish to NPM (first time)
   npm publish --access public
   
   # Expected output:
   # + @zen-flow/ui@1.0.0
   # 📦  @zen-flow/ui@1.0.0
   ```

3. **Verify Publication**
   ```bash
   # Check package on NPM
   npm view @zen-flow/ui
   
   # Test installation
   mkdir ../test-install
   cd ../test-install
   npm init -y
   npm install @zen-flow/ui
   npx zen-ui list
   ```

### **Phase 5: Automated Publishing Setup**

1. **Future Updates Workflow**
   ```bash
   # For future updates, use GitHub releases:
   
   # 1. Update version
   npm version patch  # or minor/major
   
   # 2. Push changes and tags
   git push origin main --tags
   
   # 3. Create GitHub Release
   # Go to GitHub > Releases > Create new release
   # Tag: v1.0.1 (or whatever version)
   # Title: Release v1.0.1
   # Description: What changed
   # Publish release
   
   # 4. GitHub Actions will automatically:
   # - Run tests
   # - Build package
   # - Publish to NPM
   ```

### **Phase 6: Testing User Installation**

1. **Create Test Project**
   ```bash
   mkdir zen-flow-test
   cd zen-flow-test
   npm init -y
   
   # Install React (peer dependency)
   npm install react react-dom @types/react @types/react-dom
   
   # Install Zen Flow UI
   npm install @zen-flow/ui
   npm install class-variance-authority clsx tailwind-merge framer-motion
   
   # Test CLI
   npx zen-ui init
   npx zen-ui list
   npx zen-ui add button
   ```

2. **Test Component Usage**
   ```tsx
   // Create test file: App.tsx
   import React from 'react';
   import { Button, Card } from '@zen-flow/ui';
   import '@zen-flow/ui/styles/globals.css';
   
   function App() {
     return (
       <Card>
         <h1>Testing Zen Flow UI</h1>
         <Button>Click me!</Button>
       </Card>
     );
   }
   
   export default App;
   ```

## 🔄 **Update Workflow**

### **For Bug Fixes (Patch)**
```bash
# Fix the bug in code
git add .
git commit -m "fix: resolve button ripple effect issue"

# Update version
npm version patch  # 1.0.0 → 1.0.1

# Push to GitHub
git push origin main --tags

# Create GitHub release (triggers auto-publish)
```

### **For New Features (Minor)**
```bash
# Add new component/feature
git add .
git commit -m "feat: add DatePicker component"

# Update version
npm version minor  # 1.0.0 → 1.1.0

# Push and release
git push origin main --tags
```

### **For Breaking Changes (Major)**
```bash
# Make breaking changes
git add .
git commit -m "feat!: redesign Button API with new props"

# Update version
npm version major  # 1.0.0 → 2.0.0

# Push and release
git push origin main --tags
```

## 📊 **Monitoring & Analytics**

### **NPM Package Stats**
- Visit: https://www.npmjs.com/package/@zen-flow/ui
- Monitor downloads, versions, dependencies

### **GitHub Repository**
- Watch Issues and Pull Requests
- Monitor GitHub Actions workflows
- Check repository insights

## 🚨 **Troubleshooting**

### **Common Issues**

1. **NPM Publish Fails**
   ```bash
   # Error: Package already exists
   # Solution: Update version number first
   npm version patch
   npm publish
   ```

2. **GitHub Actions Fail**
   ```bash
   # Check GitHub Actions tab
   # Common issues: Missing NPM_TOKEN, build failures
   # Fix: Add secrets, fix build errors
   ```

3. **CLI Installation Issues**
   ```bash
   # Error: Command not found
   # Solution: Ensure "bin" field in package.json
   # Make CLI file executable: chmod +x cli/index.js
   ```

4. **TypeScript Errors**
   ```bash
   # Fix TypeScript issues before publishing
   npm run type-check
   # Fix all errors shown
   ```

## ✅ **Pre-Launch Checklist**

Before first publish:
- [ ] All tests pass locally
- [ ] Documentation is complete
- [ ] Examples work correctly
- [ ] CLI tool functions properly
- [ ] TypeScript definitions exported
- [ ] Accessibility tested
- [ ] Package name available on NPM
- [ ] GitHub repository is public
- [ ] NPM token added to GitHub secrets
- [ ] License file included
- [ ] README has installation instructions

## 🎯 **Success Metrics**

After publishing, track:
- **NPM Downloads**: Weekly/monthly download counts
- **GitHub Stars**: Community interest
- **Issues/PRs**: Community engagement
- **Bundle Size**: Keep components lightweight
- **Performance**: Load times and runtime performance

---

## 🎉 **You're Ready to Deploy!**

Follow this guide step-by-step, and your Zen Flow UI library will be available for developers worldwide to install via:

```bash
npm install @zen-flow/ui
```

**Good luck with your component library! 🚀**
