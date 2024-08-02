import '@/styles';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// GitHub Pages의 서브디렉토리를 인식하도록 basename 설정
const basename = process.env.PUBLIC_URL;

root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
