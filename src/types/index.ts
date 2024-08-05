export type CategoryData = {
  name: string;
  imageUrl: string;
  title: string;
  description: string;
  color: string;
  id: number;
  backgroundColor?: string;
};

export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};

export type OrderHistory = {
  id: number;
  count: number;
};

export type OrderFormData = {
  productId: number;
  productQuantity: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
};

export type OrderResultData = {
  productId: number;
  productName: string;
  productPrice: number;
  optionId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  optionName: string;
};
