import type {
  LoginData,
  RegistrationData,
  RegistrationResponseData,
} from "../types/auth";
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

export async function registrationService(registrationData: RegistrationData) {
  try {
    const response = await fetch(
      `${BASE_URL + ENDPOINTS.AUTH + ENDPOINTS.REGISTER}`,
      {
        body: JSON.stringify(registrationData),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const serverResponse: ServerResponse<RegistrationResponseData> =
      await response.json();
    return serverResponse;
  } catch (error) {
    if (error instanceof Error) {
      return error;
    }
  }
}
