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
  description: string;
  imageUrl: string;
  categoryId: number;
  options: OptionData[];
};

export type OptionData = {
  id: number;
  name: string;
  quantity: number;
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
  stockQuantity: number;
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
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: "PERSONAL" | "BUSINESS";
  cashReceiptNumber?: string;
  point?: number;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};
