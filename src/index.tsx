import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

async function deferRender() {
  try {
    console.log('콘솔확인용');
    console.log('REACT_APP_RUN_MSW:', process.env.REACT_APP_RUN_MSW);
    if (process.env.REACT_APP_RUN_MSW === 'true') {
      const { worker } = await import('./mocks/browser');
      await worker.start({
        serviceWorker: {
          url: `${process.env.PUBLIC_URL}mockServiceWorker.js`, // GitHub Pages 및 로컬 환경에서 Service Worker를 로드하는 경로
        },
        onUnhandledRequest: 'bypass', // 모든 요청을 모킹하지 않고 패스
      });
      console.log('Mock service worker started');
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
