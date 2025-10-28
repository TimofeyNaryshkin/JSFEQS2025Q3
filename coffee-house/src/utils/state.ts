import type { RegistrationResponseData } from "../types/auth";

export const userState = () => localStorage.getItem("user");
export const login = (data: RegistrationResponseData) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const logout = () => {
  localStorage.removeItem('user')
};
