import type { Product } from "../types/product";
import type { ServerResponse } from "../types/response";
import { BASE_URL, ENDPOINTS } from "../utils/constants";

export async function fetchFavoriteProducts() {
  const response = await fetch(`${BASE_URL+ENDPOINTS.PRODUCTS+ENDPOINTS.FAVORITES}`);
  const data: ServerResponse<Product[]> = await response.json();
  return data;
}