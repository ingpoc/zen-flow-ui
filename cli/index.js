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
    
    // Copy utility files
    const utilsContent = `
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    
    await fs.writeFile('./src/lib/utils.ts', utilsContent);
    
    // Copy global styles
    const globalStyles = await fs.readFile(
      path.join(__dirname, '../src/styles/globals.css'),
      'utf8'
    );
    await fs.writeFile('./src/styles/globals.css', globalStyles);
    
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
    'notification'
  ];
  
  if (!availableComponents.includes(componentName.toLowerCase())) {
    console.error(chalk.red(`❌ Component "${componentName}" not found`));
    console.log(chalk.yellow('Available components:'));
    availableComponents.forEach(comp => console.log(chalk.gray(`  - ${comp}`)));
    return;
  }
  
  console.log(chalk.blue(`🎋 Adding ${componentName} component...`));
  
  try {
    const componentPath = path.join(__dirname, `../src/components/ui/${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.tsx`);
    const targetPath = path.join(options.path, `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.tsx`);
    
    // Ensure target directory exists
    await fs.ensureDir(options.path);
    
    // Copy component file
    await fs.copy(componentPath, targetPath);
    
    console.log(chalk.green(`✅ ${componentName} component added successfully!`));
    console.log(chalk.gray(`📁 Component added to: ${targetPath}`));
    
  } catch (error) {
    console.error(chalk.red('❌ Error adding component:'), error.message);
  }
}

function listComponents() {
  console.log(chalk.blue('🎋 Available Zen Flow UI Components:'));
  console.log('');
  
  const components = [
    { name: 'button', description: 'Interactive button with multiple variants' },
    { name: 'card', description: 'Container for related content with hover effects' },
    { name: 'input', description: 'Text input with floating labels' },
    { name: 'toggle', description: 'Switch and checkbox components' },
    { name: 'modal', description: 'Overlay dialog with backdrop blur' },
    { name: 'progress', description: 'Progress bars and circular indicators' },
    { name: 'notification', description: 'Toast notifications with variants' }
  ];
  
  components.forEach(comp => {
    console.log(chalk.green(`  ${comp.name.padEnd(12)} - ${comp.description}`));
  });
  
  console.log('');
  console.log(chalk.yellow('Usage: zen-ui add <component-name>'));
}

program.parse();
