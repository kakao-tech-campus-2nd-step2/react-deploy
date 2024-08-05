export type CategoryData = {
  id: number;
  name: string;
  description: string;
  color: string;
  imageUrl: string;
};

export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
};

export type OrderData = {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: string;
  message: string;
  pointsUsed: number;
  pointsReceived: number;
  payment: number;
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
  optionName: string;
  productName: string;
  productPrice: number;
  message: string;
  orderDateTime: string;
};

export type GoodsDetailOptionItemData = {
  key: string;
  value: string;
  level: number;
  options: GoodsDetailOptionItemData[]; // 재귀적으로 동일한 구조를 가질 수 있음
  id?: number;
  price?: number;
  stockQuantity: number;
};

export type OrderHistory = {
  id: number;
  count: number;
  productId: number;
};

export type OrderFormData = {
  optionId: number;
  productQuantity: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
  points: number;
  totalPrice: number;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};
