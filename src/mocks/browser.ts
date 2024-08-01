import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { membersMockHandlers } from '@/api/hooks/members.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...membersMockHandlers,
  ...productsMockHandler,
);
