#!/usr/bin/env node

const { Command } = require('commander');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

const program = new Command();

program
  .name('zen-ui')
  .description('CLI tool for Zen Flow UI components')
  .version('1.0.0');

// Add component command
program
  .command('add <component>')
  .description('Add a component to your project')
  .option('-p, --path <path>', 'Path to components directory', './src/components/ui')
  .action(async (component, options) => {
    await addComponent(component, options);
  });

// Init command
program
  .command('init')
  .description('Initialize Zen Flow UI in your project')
  .option('-p, --path <path>', 'Path to components directory', './src/components/ui')
  .action(async (options) => {
    await initProject(options);
  });

// List command
program
  .command('list')
  .description('List all available components')
  .action(() => {
    listComponents();
  });

async function initProject(options) {
  console.log(chalk.blue('🎋 Initializing Zen Flow UI...'));
  
  try {
    // Create directories
    await fs.ensureDir(options.path);
    await fs.ensureDir('./src/lib');
    await fs.ensureDir('./src/styles');
    
    // Create utility files
    const utilsContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    
    await fs.writeFile('./src/lib/utils.ts', utilsContent);
    
    // Create basic CSS file with instructions
    const cssInstructions = `/* Zen Flow UI Styles */
/* 
 * To use the full styles, import them in your main app file:
 * import '@gurusharan3107/zen-flow-ui/styles/globals.css';
 * 
 * Or copy the styles from the node_modules directory:
 * cp node_modules/@gurusharan3107/zen-flow-ui/src/styles/globals.css ./src/styles/
 */

/* Basic CSS custom properties for Zen Flow components */
:root {
  --zen-void: #0a0a0a;
  --zen-ink: #1a1a1a;
  --zen-shadow: #2a2a2a;
  --zen-stone: #4a4a4a;
  --zen-mist: #8a8a8a;
  --zen-cloud: #dadada;
  --zen-paper: #fafafa;
  --zen-light: #ffffff;
  --zen-accent: #ff4757;
  --zen-water: #3742fa;
  --zen-leaf: #26de81;
  --zen-sun: #fed330;
}
`;
    
    await fs.writeFile('./src/styles/zen-flow-ui.css', cssInstructions);
    
    console.log(chalk.green('✅ Zen Flow UI initialized successfully!'));
    console.log(chalk.yellow('📦 Don\'t forget to install dependencies:'));
    console.log(chalk.gray('npm install class-variance-authority clsx tailwind-merge framer-motion'));
    
  } catch (error) {
    console.error(chalk.red('❌ Error initializing project:'), error.message);
  }
}

async function addComponent(componentName, options) {
  const availableComponents = [
    'button',
    'card',
    'input',
    'toggle',
    'modal',
    'progress',
    'notification',
    'select',
    'accordion',
    'skeleton'
  ];
  
  if (!availableComponents.includes(componentName.toLowerCase())) {
    console.error(chalk.red(`❌ Component "${componentName}" not found`));
    console.log(chalk.yellow('Available components:'));
    availableComponents.forEach(comp => console.log(chalk.gray(`  - ${comp}`)));
    return;
  }
  
  console.log(chalk.blue(`🎋 Adding ${componentName} component...`));
  
  try {
    // Ensure target directory exists
    await fs.ensureDir(options.path);
    
    // Instead of copying files, provide instructions
    console.log(chalk.green(`✅ Component information for ${componentName}:`));
    console.log('');
    console.log(chalk.yellow('📋 To use this component, import it directly:'));
    console.log(chalk.gray(`import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from '@gurusharan3107/zen-flow-ui';`));
    console.log('');
    console.log(chalk.yellow('📂 Or copy the component source from:'));
    console.log(chalk.gray(`node_modules/@gurusharan3107/zen-flow-ui/src/components/ui/${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.tsx`));
    console.log('');
    console.log(chalk.blue('💡 For usage examples, check the README at:'));
    console.log(chalk.gray('https://github.com/ingpoc/zen-flow-ui#readme'));
    
  } catch (error) {
    console.error(chalk.red('❌ Error processing component:'), error.message);
  }
}

function listComponents() {
  console.log(chalk.blue('🎋 Available Zen Flow UI Components:'));
  console.log('');
  
  const components = [
    { name: 'button', description: 'Interactive button with multiple variants' },
    { name: 'card', description: 'Container for related content with hover effects' },
    { name: 'input', description: 'Text input with floating labels and textarea' },
    { name: 'toggle', description: 'Switch and checkbox components' },
    { name: 'modal', description: 'Overlay dialog with backdrop blur' },
    { name: 'progress', description: 'Progress bars and circular indicators' },
    { name: 'notification', description: 'Toast notifications with variants' },
    { name: 'select', description: 'Dropdown select with keyboard navigation' },
    { name: 'accordion', description: 'Collapsible content sections' },
    { name: 'skeleton', description: 'Placeholder content with shimmer animation' }
  ];
  
  components.forEach(comp => {
    console.log(chalk.green(`  ${comp.name.padEnd(12)} - ${comp.description}`));
  });
  
  console.log('');
  console.log(chalk.yellow('Usage:'));
  console.log(chalk.gray('  zen-ui list                    - Show all components'));
  console.log(chalk.gray('  zen-ui add <component-name>    - Get component info'));
  console.log(chalk.gray('  zen-ui init                    - Initialize project setup'));
}

program.parse();
