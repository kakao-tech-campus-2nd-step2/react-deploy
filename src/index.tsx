import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

<<<<<<< HEAD
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
=======
async function deferRender() {
  if (process.env.NODE_ENV === 'development') {
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
>>>>>>> upstream/dlwltn0430
