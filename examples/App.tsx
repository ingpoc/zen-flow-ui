import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Toggle,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
  Progress,
  CircularProgress,
  Skeleton,
  Notification,
  ToastProvider,
  useToast,
  Select,
  Accordion,
  type SelectOption,
  type AccordionItemData,
} from '@zen-flow/ui';

// Example app demonstrating all components
const ZenFlowExample: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleValue, setToggleValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [accordionValue, setAccordionValue] = useState<string>('');
  const [progress, setProgress] = useState(65);
  
  const { addToast } = useToast();

  // Select options
  const selectOptions: SelectOption[] = [
    { value: 'option1', label: 'First Option' },
    { value: 'option2', label: 'Second Option' },
    { value: 'option3', label: 'Third Option' },
    { value: 'option4', label: 'Disabled Option', disabled: true },
  ];

  // Accordion items
  const accordionItems: AccordionItemData[] = [
    {
      value: 'item-1',
      title: 'What is Zen Flow Design?',
      content: (
        <div>
          <p className="mb-4">
            Zen Flow Design is a minimalist approach to user interface design, 
            inspired by Japanese aesthetics and the principle that every element 
            should serve a purpose.
          </p>
          <p>
            It emphasizes negative space, subtle animations, and a restrained 
            color palette to create interfaces that feel both powerful and peaceful.
          </p>
        </div>
      ),
    },
    {
      value: 'item-2',
      title: 'Core Design Principles',
      content: (
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Minimalist Clarity</strong> - Remove everything unnecessary</li>
          <li><strong>Rhythmic Structure</strong> - Create harmony through mathematical relationships</li>
          <li><strong>Organic Motion</strong> - Animations should feel natural and purposeful</li>
          <li><strong>Breathing Space</strong> - Negative space is full of possibility</li>
          <li><strong>Subtle Depth</strong> - Create layers without harsh shadows</li>
        </ul>
      ),
    },
    {
      value: 'item-3',
      title: 'Component Architecture',
      content: (
        <div>
          <p className="mb-4">
            Each component is built with accessibility in mind, following WCAG guidelines 
            and supporting keyboard navigation, screen readers, and reduced motion preferences.
          </p>
          <p>
            Components use class-variance-authority for consistent styling variants 
            and Tailwind CSS for utility-first styling.
          </p>
        </div>
      ),
    },
  ];

  const showToast = (variant: 'default' | 'success' | 'warning' | 'error' | 'info') => {
    const messages = {
      default: { title: 'Default Toast', description: 'This is a default notification' },
      success: { title: 'Success!', description: 'Your action was completed successfully' },
      warning: { title: 'Warning', description: 'Please check your input' },
      error: { title: 'Error', description: 'Something went wrong' },
      info: { title: 'Info', description: 'Here is some helpful information' },
    };
    
    addToast({
      variant,
      ...messages[variant],
    });
  };

  return (
    <div className="min-h-screen bg-zen-paper p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-light text-zen-void tracking-tight">
            Zen Flow UI Components
          </h1>
          <p className="text-lg text-zen-stone max-w-2xl mx-auto">
            A minimalist React component library inspired by Japanese design principles. 
            Every component breathes with purpose and flows with intention.
          </p>
        </div>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Interactive elements with subtle animations and multiple variants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button loading>Loading...</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Form Elements</CardTitle>
            <CardDescription>
              Inputs with floating labels and elegant focus states
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Your Name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                helperText="Enter your full name"
              />
              <Input
                label="Email Address"
                type="email"
                placeholder="john@example.com"
                helperText="We'll never share your email"
              />
            </div>
            
            <Textarea
              label="Message"
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              placeholder="Tell us about your project..."
              helperText="Minimum 10 characters"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Choose an option"
                options={selectOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder="Select your preference..."
              />
              
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
                  description="By checking this, you accept our terms of service"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicators */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Indicators</CardTitle>
            <CardDescription>
              Visual feedback with shimmer effects and smooth animations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Progress value={progress} showLabel label="Upload Progress" />
                <Progress value={85} variant="success" showLabel label="Success" />
                <Progress value={45} variant="warning" showLabel label="Warning" />
                <Progress value={25} variant="accent" showLabel label="Accent" />
                
                <div className="flex gap-4">
                  <Button 
                    size="sm" 
                    onClick={() => setProgress(Math.min(progress + 10, 100))}
                  >
                    +10%
                  </Button>
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => setProgress(Math.max(progress - 10, 0))}
                  >
                    -10%
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center">
                <CircularProgress
                  value={progress}
                  size={120}
                  showLabel
                  label="Completion"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>
              Collapsible content sections with smooth animations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion
              items={accordionItems}
              value={accordionValue}
              onValueChange={setAccordionValue}
              collapsible
            />
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Toast messages with different variants and auto-dismiss
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => showToast('default')}>Default</Button>
              <Button onClick={() => showToast('success')}>Success</Button>
              <Button onClick={() => showToast('warning')}>Warning</Button>
              <Button onClick={() => showToast('error')}>Error</Button>
              <Button onClick={() => showToast('info')}>Info</Button>
            </div>
          </CardContent>
        </Card>

        {/* Modal */}
        <Card>
          <CardHeader>
            <CardTitle>Modal</CardTitle>
            <CardDescription>
              Overlay dialogs with backdrop blur and smooth transitions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
          </CardContent>
        </Card>

        {/* Skeleton Loaders */}
        <Card>
          <CardHeader>
            <CardTitle>Skeleton Loaders</CardTitle>
            <CardDescription>
              Placeholder content with shimmer animation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton variant="title" />
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-4/5" />
              <Skeleton variant="text" className="w-3/5" />
              <Skeleton variant="box" className="h-32" />
            </div>
          </CardContent>
        </Card>

        {/* Card Variants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="outlined">
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card has a subtle border instead of a shadow.</p>
            </CardContent>
          </Card>
          
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card has enhanced elevation for emphasis.</p>
            </CardContent>
          </Card>
          
          <Card variant="flat">
            <CardHeader>
              <CardTitle>Flat Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card has no shadow for a minimal look.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onOpenChange={setModalOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalTitle>The Art of Simplicity</ModalTitle>
            <ModalDescription>
              In the practice of design, we find that removing elements often 
              creates more impact than adding them.
            </ModalDescription>
          </ModalHeader>
          
          <div className="py-4">
            <p className="text-zen-stone leading-relaxed">
              This modal demonstrates the Zen Flow approach to overlay design. 
              Notice the subtle backdrop blur, the gentle animation, and the 
              restrained use of visual elements.
            </p>
          </div>
          
          <ModalFooter>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>
              Understand
            </Button>
          </ModalFooter>
          
          <ModalClose onClick={() => setModalOpen(false)} />
        </ModalContent>
      </Modal>
    </div>
  );
};

// App wrapper with ToastProvider
const App: React.FC = () => {
  return (
    <ToastProvider>
      <ZenFlowExample />
    </ToastProvider>
  );
};

export default App;
