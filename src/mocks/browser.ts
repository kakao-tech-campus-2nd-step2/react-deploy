import { setupWorker } from "msw";

import { categoriesMockHandler } from "@/api/hooks/categories.mock";
import { memberMockHandler } from "@/api/hooks/memeber.mock";
import { orderMockHandler } from "@/api/hooks/order.mock";
import { pointMockHandler } from "@/api/hooks/point.mock";
import { productsMockHandler } from "@/api/hooks/products.mock";
import { wishlistMockHandler } from "@/api/hooks/wish.mock";

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...memberMockHandler,
  ...wishlistMockHandler,
  ...orderMockHandler,
  ...pointMockHandler,
);
