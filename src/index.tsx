import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

import { serverStorage } from './utils/storage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function deferRender() {
  if (serverStorage.get() === 'mock') {
    const { worker } = await import('./mocks/browser');
    await worker.start();
  }

  return;
}

deferRender().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
