export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  category: string;
}

export interface Order {
  items: OrderItem[];
  totalPrice: number;
}

export interface OrderItem {
  productId: number;
  size: string;
  additives: string[];
  quantity: number;
}

export interface Size {
  size: string;
  price: string;
  discountPrice?: string;
}

export interface Additive {
  name: string;
  price: string;
  discountPrice?: string;
}

export type Sizes = "s" | "m" | "l" | "xl" | "xxl";

export type Category = "coffee" | "tea" | "dessert";

export type ProductSizes = Record<Sizes, Size>;

export interface ProductDetails extends Product {
  sizes: ProductSizes;
  additives: Additive[];
}
