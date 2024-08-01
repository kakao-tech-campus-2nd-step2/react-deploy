import { rest } from 'msw';

import type { ProductData } from '@/types';

import { getProductDetailPath } from './useGetProductDetail';

export type ProductDetailRequestParams = {
  productId: string;
};

export type GoodsDetailResponseData = ProductData;

const mockProducts: Record<string, ProductData> = {
  '1': {
    id: 1,
    name: 'Premium T-Shirt',
    price: 29.99,
    imageUrl: 'https://example.com/tshirt.jpg',
    category_id: 1,
  },
  '2': {
    id: 2,
    name: 'Comfortable Jeans',
    price: 59.99,
    imageUrl: 'https://example.com/jeans.jpg',
    category_id: 2,
  },
  // Add more mock products as needed
};

export const productDetailMockHandler = [
  rest.get(getProductDetailPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params;

    console.log(`Mocked API call for product detail. Product ID: ${productId}`);

    const product = mockProducts[productId as string];

    if (product) {
      return res(ctx.status(200), ctx.json(product));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
    }
  }),
];
