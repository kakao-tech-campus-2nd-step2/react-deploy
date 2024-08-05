import { type OrderResultData } from '@/types/';

export const mockOrderResponse: OrderResultData = {
  productId: 1,
  productName: 'Mock Product',
  productPrice: 1000,
  optionId: 1,
  quantity: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  optionName: 'Mock Option',
};

export const postMockOrder = async (
  productId: number,
  quantity: number,
): Promise<{ resultData: OrderResultData }> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log(`Product ID: ${productId}, Quantity: ${quantity}`);

  return {
    resultData: mockOrderResponse,
  };
};
