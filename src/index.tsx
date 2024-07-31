import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { URLS } from '@/api';
import App from '@/App';
import { apiSessionStorage } from '@/utils/storage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function deferRender() {
  if (process.env.REACT_APP_RUN_MSW === 'true') {
    const { browserWorker } = await import('@/mocks/browser');
    await browserWorker.start();
  }

  apiSessionStorage.set(URLS[0].url);

  return;
}
deferRender().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
