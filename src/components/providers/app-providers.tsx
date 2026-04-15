'use client';

import { Toaster } from 'sonner';

import { QueryProvider } from './query-provider';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </QueryProvider>
  );
}
