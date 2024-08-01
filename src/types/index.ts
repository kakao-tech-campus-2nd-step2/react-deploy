export type CategoryData = {
  id: number;
  name: string;
  description: string;
  color: string;
  image_url: string;
};

export type ProductData = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  categoryId: number;
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};

export type GoodsDetailOptionItemData = {
  key: string;
  value: string;
  level: number;
  options: GoodsDetailOptionItemData[]; // 재귀적으로 동일한 구조를 가질 수 있음
  id?: number;
  price?: number;
  stock_quantity: number;
};

export type OrderHistory = {
  id: number;
  count: number;
};

export type OrderFormData = {
  product_id: number;
  quantity: number;
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
