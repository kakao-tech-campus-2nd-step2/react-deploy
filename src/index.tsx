import '@/styles';

import ReactDOM from 'react-dom/client';

import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function deferRender() {
  if (process.env.REACT_APP_RUN_MSW === 'true') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ serviceWorker: { url: '/react-deploy/mockServiceWorker.js' } });
  }

  return;
}

deferRender().then(() => {
  root.render(<App />);
});
