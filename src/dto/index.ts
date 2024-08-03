export interface ProductData {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  categoryId: number;
}

export interface ProductOption {
  id: number;
  name: string;
  quantity: number;
}

export interface WishData {
  id: number;
  product: ProductData;
}

export interface CategoryData {
  id: number;
  name: string;
  color: string;
  imageUrl: string;
  description: string;
}

export interface MessageCardTemplateData {
  id?: number;
  defaultTextMessage?: string;
  thumbURL?: string;
  imageURL?: string;
}

export interface MyAccountInfoData {
  id: number
}
