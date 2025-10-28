export interface ServerResponse<T> {
  data?: T;
  message: string;
  error: string;
}

export interface OrderResponse {
  data: {
    message: string
    orderId: string
  }
}