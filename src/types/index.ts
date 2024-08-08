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
  stockQuantity: number;
};

// export type ProductResponseData = { //백서버연결할때 사용
//   page: number;
//   size: number;
//   total_elements: number;
//   total_pages: number;
//   contents: ProductData[];
// };

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
  usePoints?: boolean;
};

export type MessageCardTemplateData = {
  id: number;
  defaultTextMessage: string;
  thumbUrl: string;
  imageUrl: string;
};
