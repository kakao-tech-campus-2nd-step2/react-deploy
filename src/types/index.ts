export type CategoryData = {
  id: number;
  name: string;
  color: string;
  image_url: string;
  description: string;
};

export type ProductData = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  category_name: string;
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
  id: number;
  count: number;
  optionId: number;
};

export type OrderFormData = {
  productId: number;
  optionId?: number;
  productQuantity: number;
  messageCardTextMessage: string;
  senderId?: number;
  receiverId?: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
  point?: number;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};

// 관심 상품 기능 관련 타입 정의
type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export type InterestItem = {
  productId: number;
  product: Product;
}

// 서버(api) 선택을 위한 타입 정의
export type Server = {
  name: string;
  url: string;
}