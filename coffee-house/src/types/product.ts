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
