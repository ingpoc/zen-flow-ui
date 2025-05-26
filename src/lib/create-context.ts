import { createContext as reactCreateContext, useContext as reactUseContext } from 'react';

/**
 * Create a context with proper error handling and type safety
 * Ensures Next.js 15 and React 18+ compatibility
 */
export function createContext<T>(name: string) {
  const Context = reactCreateContext<T | undefined>(undefined);
  
  function useContext() {
    const context = reactUseContext(Context);
    if (context === undefined) {
      throw new Error(`use${name} must be used within ${name}Provider`);
    }
    return context;
  }
  
  Context.displayName = `${name}Context`;
  
  return [Context.Provider, useContext, Context] as const;
}
