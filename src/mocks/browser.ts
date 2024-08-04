import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { interestHandlers } from '@/api/hooks/interestHandlers';
//import { loginHandler } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

import { handlers } from './handlers';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...interestHandlers,
  // ...loginHandler,
  ...handlers,
);

// 요청 무시 설정
worker.events.on('request:match', (req) => {
  console.log('Matched request:', req);
  if (req.url.pathname.startsWith('/static/media/')) {
    req.passthrough();
  }
});

worker.events.on('request:unhandled', (req) => {
  console.log('Unhandled request:', req);
});

worker.start();
