import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './theme/tailwind.css'
import { TenantProvider } from './context/Tentant';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <TenantProvider>
      <App />
    </TenantProvider>
  </React.StrictMode>
);