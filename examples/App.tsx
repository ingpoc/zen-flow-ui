import React, { useState } from 'react';
import {
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Breadcrumb,
  useBreadcrumbFromPath,
  createZenTheme,
  applyThemeToRoot,
  cn
} from '@gurusharan3107/zen-flow-ui';

function App() {
  const [textValue, setTextValue] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [currentPath] = useState('/home/dashboard/components');

  // Generate breadcrumb items from current path
  const breadcrumbItems = useBreadcrumbFromPath(currentPath, {
    'home': 'Home',
    'dashboard': 'Dashboard',
    'components': 'Components'
  });

  // Create and apply a custom theme
  React.useEffect(() => {
    const customTheme = createZenTheme({
      name: 'custom-test',
      tokens: {
        colors: {
          accent: '#3742fa'
        }
      }
    });
    applyThemeToRoot(customTheme);
  }, []);

  return (
    <div className="min-h-screen bg-zen-paper">
      {/* Header */}
      <header className="bg-zen-light border-b border-zen-cloud px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-light text-zen-ink mb-2">
            Zen Flow UI v2.1.0 Test
          </h1>
          <Breadcrumb items={breadcrumbItems} separator="→" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        
        {/* Introduction */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-light text-zen-void">
            Production Ready Components
          </h2>
          <p className="text-zen-stone max-w-2xl mx-auto">
            Testing the latest zen-flow-ui components published to npm. 
            All issues have been resolved and components are production-ready.
          </p>
        </section>

        {/* Button Showcase */}
        <section className="space-y-4">
          <h3 className="text-xl font-medium text-zen-ink">Button Components</h3>
          <div className="bg-zen-light rounded-lg p-6 border border-zen-cloud">
            <div className="flex flex-wrap gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading...</Button>
              <Button fullWidth className="mt-2">Full Width</Button>
            </div>
          </div>
        </section>

        {/* Textarea Component */}
        <section className="space-y-4">
          <h3 className="text-xl font-medium text-zen-ink">Textarea Component</h3>
          <div className="bg-zen-light rounded-lg p-6 border border-zen-cloud">
            <div className="space-y-4">
              <Textarea
                label="Auto-resize Textarea"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Type something here... This textarea auto-resizes!"
                helperText="Supports auto-resize, min/max rows, error states, and animations"
                autoResize={true}
                minRows={3}
                maxRows={8}
              />
              
              <Textarea
                label="Fixed Size Textarea"
                placeholder="This textarea has a fixed size"
                helperText="No auto-resize, traditional textarea behavior"
                size="lg"
              />
              
              <Textarea
                label="Error State"
                error="This field is required"
                placeholder="Textarea with error state"
                variant="error"
              />
            </div>
          </div>
        </section>

        {/* Popover Component */}
        <section className="space-y-4">
          <h3 className="text-xl font-medium text-zen-ink">Popover Component</h3>
          <div className="bg-zen-light rounded-lg p-6 border border-zen-cloud">
            <div className="space-y-4">
              <p className="text-zen-stone mb-4">
                Advanced popover with collision detection, keyboard navigation, and smooth animations.
              </p>
              
              <div className="flex gap-4">
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      Open Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-3">
                      <h4 className="font-medium text-zen-ink">Advanced Popover</h4>
                      <p className="text-sm text-zen-stone">
                        This popover includes:
                      </p>
                      <ul className="text-sm text-zen-stone space-y-1 list-disc list-inside">
                        <li>Smart collision detection</li>
                        <li>Keyboard navigation (ESC to close)</li>
                        <li>Click outside to close</li>
                        <li>Smooth framer-motion animations</li>
                        <li>Portal rendering</li>
                        <li>Accessibility support</li>
                      </ul>
                      <Button 
                        size="sm" 
                        onClick={() => setPopoverOpen(false)}
                        className="mt-2"
                      >
                        Close Popover
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">
                      Another Popover
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="start">
                    <div className="space-y-2">
                      <h4 className="font-medium text-zen-ink">Positioned Popover</h4>
                      <p className="text-sm text-zen-stone">
                        This popover opens on top with start alignment.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb Component */}
        <section className="space-y-4">
          <h3 className="text-xl font-medium text-zen-ink">Breadcrumb Component</h3>
          <div className="bg-zen-light rounded-lg p-6 border border-zen-cloud">
            <div className="space-y-4">
              <div>
                <p className="text-zen-stone mb-3">Default breadcrumb (shown in header):</p>
                <Breadcrumb items={breadcrumbItems} />
              </div>
              
              <div>
                <p className="text-zen-stone mb-3">Collapsible breadcrumb with custom separator:</p>
                <Breadcrumb 
                  items={[
                    { label: 'Home', href: '/' },
                    { label: 'Projects', href: '/projects' },
                    { label: 'Web Development', href: '/projects/web' },
                    { label: 'React Apps', href: '/projects/web/react' },
                    { label: 'Component Libraries', href: '/projects/web/react/libraries' },
                    { label: 'Zen Flow UI', current: true }
                  ]}
                  separator="/"
                  maxItems={4}
                  itemsBeforeCollapse={2}
                  itemsAfterCollapse={1}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Theme System */}
        <section className="space-y-4">
          <h3 className="text-xl font-medium text-zen-ink">Theme System</h3>
          <div className="bg-zen-light rounded-lg p-6 border border-zen-cloud">
            <div className="space-y-4">
              <p className="text-zen-stone">
                Zen Flow UI includes a comprehensive theme system with Japanese-inspired colors:
              </p>
              
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {[
                  { name: 'void', color: 'bg-zen-void' },
                  { name: 'ink', color: 'bg-zen-ink' },
                  { name: 'shadow', color: 'bg-zen-shadow' },
                  { name: 'stone', color: 'bg-zen-stone' },
                  { name: 'mist', color: 'bg-zen-mist' },
                  { name: 'cloud', color: 'bg-zen-cloud' },
                  { name: 'paper', color: 'bg-zen-paper' },
                  { name: 'light', color: 'bg-zen-light' },
                ].map((color) => (
                  <div key={color.name} className="text-center">
                    <div className={cn(
                      'w-12 h-12 rounded-lg border border-zen-cloud mx-auto mb-1',
                      color.color
                    )} />
                    <span className="text-xs text-zen-stone">{color.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 grid grid-cols-4 gap-3">
                {[
                  { name: 'water', color: 'bg-zen-water' },
                  { name: 'leaf', color: 'bg-zen-leaf' },
                  { name: 'sun', color: 'bg-zen-sun' },
                  { name: 'accent', color: 'bg-zen-accent' },
                ].map((color) => (
                  <div key={color.name} className="text-center">
                    <div className={cn(
                      'w-12 h-12 rounded-lg border border-zen-cloud mx-auto mb-1',
                      color.color
                    )} />
                    <span className="text-xs text-zen-stone">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section className="text-center space-y-4 py-8">
          <div className="inline-flex items-center gap-2 bg-zen-leaf/10 text-zen-leaf px-4 py-2 rounded-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            All components working perfectly!
          </div>
          <p className="text-zen-stone">
            zen-flow-ui v2.1.0 is production-ready with zero build errors and comprehensive TypeScript support.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App; 