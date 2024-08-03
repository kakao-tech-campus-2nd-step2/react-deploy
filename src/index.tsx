import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function deferRender() {
  try {
    if (process.env.REACT_APP_RUN_MSW === 'true') {
      const { worker } = await import('./mocks/browser');
      await worker.start();
    }
  } catch (err) {
    console.log(err);
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
