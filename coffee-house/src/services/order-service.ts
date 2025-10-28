import type { Order } from "../types/product";
import type { OrderResponse } from "../types/response";
import { BASE_URL, ENDPOINTS } from "../utils/constants";

export async function orderService(order: Order) {
  try {
    const response = await fetch(
      `${BASE_URL + ENDPOINTS.ORDERS + ENDPOINTS.CONFIRM}`,
      {
        body: JSON.stringify(order),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const serverResponse: OrderResponse = await response.json();
    return serverResponse;
  } catch (error) {
    if (error instanceof Error) {
      return;
    }
  }
}
