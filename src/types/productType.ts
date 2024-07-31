export type ProductData = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
};

export type ProductOptionsData = {
  id: number;
  name: string;
  quantity: number;
  productId: number;
};
