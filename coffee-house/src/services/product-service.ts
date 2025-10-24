import type { Product } from "../types/product";
import type { ServerResponse } from "../types/response";
import { BASE_URL, ENDPOINTS } from "../utils/constants";

export async function favoriteProductsService() {
  try {
    const response = await fetch(
      `${BASE_URL + ENDPOINTS.PRODUCTS + ENDPOINTS.FAVORITES}`
    );
    const serverResponse: ServerResponse<Product[]> = await response.json();
    return serverResponse.data;
  } catch (error) {
    if (error instanceof Error) {
      return [];
    }
  }
}
