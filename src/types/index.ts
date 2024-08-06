export type CategoryData = {
  categoryId: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type ProductData = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ProductOptionsData = {
  productId: number;
  name: string;
  quantity: number;
};

export type GoodsDetailOptionItemData = {
  key: string;
  value: string;
  level: number;
  options: GoodsDetailOptionItemData[];
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

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponseData = {
  token: string;
};

export type WishData = {
  productId: number;
};

export type WishResponseData = {
  id: number;
  productId: number;
};

export type OrderData = {
  orderlist: {
    productId: number;
    optionId: number;
    quantity: number;
    hasCashReceipt?: boolean;
    cashReceiptType?: 'PERSONAL' | 'BUSINESS';
    cashReceiptNumber?: string;
    message: string;
    point: number;
  };
};

export type OrderResponseData = {
  orderId: number;
};
