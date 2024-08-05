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
  category_id: number;
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  product_id: number;
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
  product_quantity: number;
  message: string;
  sender_id: number;
  receiver_id: number;
  has_cash_receipt: boolean;
  cash_receipt_type?: 'PERSONAL' | 'BUSINESS';
  cash_receipt_number?: string;
};

export type MessageCardTemplateData = {
  id: number;
  default_text_message: string;
  thumb_url: string;
  image_url: string;
};
