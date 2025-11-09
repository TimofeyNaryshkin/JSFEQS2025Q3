import type { Additive, Size, Sizes } from "./product";

export interface TCartItem {
  id: number;
  name: string;
  category: string;
  size: string;
  extras: string[];
  price: string;
  discountPrice: string;
}

export interface ModalItem extends Omit<TCartItem, 'size' | 'extras'> {
  size: Size
  extras: Additive[]
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
