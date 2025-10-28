import type { Sizes } from "./product";

export interface TCartItem {
  id: number;
  name: string;
  categoty: string;
  size: string;
  extras: string[];
  prise: string;
  discountPrice: string;
}

export interface OrderItem {
  productId: number;
  size: Sizes;
  additives: string[];
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  totalPrice: number;
}
