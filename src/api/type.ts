// Ajax Types
export type AjaxResult<T> = {
  success: boolean;
  data: T | null;
};

// Data Types
export type ProductData = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type ProductDetailData = ProductData;

export type CategoryData = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  color: string;
};

export type MessageCardTemplateData = {
  id?: number;
  defaultTextMessage?: string;
  thumbURL?: string;
  imageURL?: string;
};

export type MyAccountInfoData = {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
};

export type PageInfo = {
  totalResults: number;
  resultsPerPage: number;
};

export type ProductsOptionData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};

export type AuthData = {
  email: string;
  password: string;
};

export type PageableData = {
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
};

export type WishesData = {
  id: number;
  product: ProductData;
};

export type OrderLog = {
  id: number;
  productId: number;
  name: string;
  imageUrl: string;
  optionId: number;
  count: number;
  price: number;
  orderDateTime: string;
  message: string;
  success: boolean;
};

// RequestBody Types
export type ProductOrderRequestBody = {
  productId: number;
  productOptionId: number;
  productQuantity: number;
  messageCardTemplateId: number;
  messageCardTextMessage: string;
  senderId: number;
  receiverId: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string;
};

export type GetRankingProductsRequestBody = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GetCategoriesProductsRequestBody = {
  categoryKey: string;
  pageToken?: string;
  maxResults?: number;
};

export type PostLoginRequestBody = AuthData;

export type PostRegisterRequestBody = AuthData;

export type PostWishesRequestBody = {
  productId: number;
};

export type DeleteWishesRequestBody = {
  wishId: number;
};

export type PostOrderRequestBody = {
  optionId: number;
  message: string;
  quantity: number;
  productId: number;
  point: number;
  phone: string;
  receipt: boolean;
};

// ResponseBody Types
export type GetRankingProductsResponseBody = {
  products: ProductData[];
};

export type GetCategoriesResponseBody = CategoryData[];

export type GetCategoriesProductsResponseBody = {
  products: ProductData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};

export type GetProductsDetailResponseBody = ProductDetailData;

export type GetProductsOptionResponseBody = ProductsOptionData[];

export type PostLoginResponseBody = {
  email: string;
  token: string;
};

export type PostRegisterResponseBody = {
  email: string;
  token: string;
};

export type PostWishesResponseBody = void;

export type GetWishesResponseBody = {
  content: WishesData[];
  pageable: PageableData;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
};

export type GetOrderPriceResponseBody = {
  price: number;
};

export type GetPointResponseBody = {
  point: number;
};

export type GetOrdersResponseBody = {
  contents: OrderLog[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};
