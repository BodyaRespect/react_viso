/* eslint-disable import/no-extraneous-dependencies */
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';
import { App } from './App';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);
