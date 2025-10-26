import type { LoginData, RegistrationData } from "../types/auth";
import type { ServerResponse } from "../types/response";
import { BASE_URL, ENDPOINTS } from "../utils/constants";

export async function loginService(loginData: LoginData) {
  try {
    const response = await fetch(
      `${BASE_URL + ENDPOINTS.AUTH + ENDPOINTS.LOGIN}`,
      {
        body: JSON.stringify(loginData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const serverResponse: ServerResponse<RegistrationData> =
      await response.json();
    return serverResponse.data;
  } catch (error) {
    if (error instanceof Error) {
      return;
    }
  }
}
