import type { Product, ProductDetails } from "../types/product";
import type { ServerResponse } from "../types/response";
import { BASE_URL, ENDPOINTS } from "@/constants";

export async function favoriteProductsService() {
  try {
    const response = await fetch(
      `${BASE_URL + ENDPOINTS.PRODUCTS + ENDPOINTS.FAVORITES}`
    );
    const serverResponse: ServerResponse<Product[]> = await response.json();
    if (!serverResponse.data) {
      throw new Error("No data received");
    }
    return serverResponse.data;
  } catch (error) {
    return [];
  }
}

export async function productsService() {
  try {
    const response = await fetch(`${BASE_URL + ENDPOINTS.PRODUCTS}`);
    const serverResponse: ServerResponse<Product[]> = await response.json();
    if (!serverResponse.data) {
      throw new Error("No data received");
    }
    return serverResponse.data;
  } catch (error) {
    return [];
  }
}

export async function productByIdService(id: string) {
  try {
    const response = await fetch(`${BASE_URL + ENDPOINTS.PRODUCTS}/${id}`);
    const serverResponse: ServerResponse<ProductDetails> =
      await response.json();
    return serverResponse.data;
  } catch (error) {
    if (error instanceof Error) {
      return;
    }
  }
}
