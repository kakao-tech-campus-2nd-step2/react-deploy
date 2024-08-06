export type CategoryData = {
  categoryId: number;
  label: string;
  title: string;
  backgroundColor: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
  productId?: number[];
};

export type ProductData = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  wishUserId?: number[];
  optionsId?: number[];
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
  createdAt?: string;
  updatedAt?: string;
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

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};
