import { setupWorker } from 'msw';

import { authMockHandler } from '@/api/hooks/auth.mock';
import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { pointMockHandlers } from '@/api/hooks/points.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { wishlistMockHandler } from '@/api/hooks/wishlist.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...authMockHandler,
  ...wishlistMockHandler,
  ...pointMockHandlers,
);
