export type CategoryData = {
  categoryId: number;
  name: string;
  description: string;
  color?: string;
  imageUrl: string;
};

export type ProductData = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId?: number;
  isWish: boolean;
};

export type ProductOptionsData = {
  optionId: number;
  name: string;
  optionName?: string; // 키 명이 다를 수 있음
  quantity: number;
  productId?: number;
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

export type WishData = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  wishId: number;
};

export type OrderHistory = {
  productId: number;
  optionId: number;
  count: number;
};

export type OrderFormData = {
  productId: number;
  optionId: number;
  quantity: number;
  hasCashReceipt?: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
  message: string;
  point: number;
  senderId?: number;
  receiverId?: number;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};
