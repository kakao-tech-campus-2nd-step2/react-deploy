import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { interestHandlers } from '@/api/hooks/interestHandlers';
import { loginHandler } from '@/api/hooks/login.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

import { handlers } from './handlers';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...interestHandlers,
  ...loginHandler,
  ...handlers,
);
