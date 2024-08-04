import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories/categories.mock';
import { productsMockHandler } from '@/api/hooks/products/products.mock';

export const worker = setupWorker(...categoriesMockHandler, ...productsMockHandler);
