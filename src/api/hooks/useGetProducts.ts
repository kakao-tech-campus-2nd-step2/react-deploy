import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

export type ProductData = {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
};

export type ProductResponseData = {
  data: {
    total_page: number;
    content: ProductData[];
  };
};

export const getProductsPath = (categoryId: number, page: number = 1) =>
  `${BASE_URL}/api/products?category=${categoryId}&page=${page}`;

export const getProducts = async (categoryId: number, page: number = 1) => {
  try {
    const response = await fetchInstance.get<ProductResponseData>(
      getProductsPath(categoryId, page),
    );
    return response.data.data.content || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const useGetProducts = (categoryId: number, page: number = 1) =>
  useQuery({
    queryKey: [getProductsPath(categoryId, page)],
    queryFn: () => getProducts(categoryId, page),
  });
