export type OrderHistory = {
  productId: number;
  optionId: number;
  quantity: number;
};

export type OrderListData = {
  orderId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  optionId: number;
  optionName: string;
  price: number;
  totalPrice: number;
  count: number;
  createdAt: string;
};
