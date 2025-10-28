export const BASE_URL =
  "https://6kt29kkeub.execute-api.eu-central-1.amazonaws.com";

export const ENDPOINTS = {
  FAVORITES: "/favorites",
  PRODUCTS: "/products",
  AUTH: "/auth",
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  ORDERS: "/orders",
  CONFIRM: "/confirm",
};

export const ERROR_MSG = `Something went wrong. Please, refresh the page`;
export const SUCCESS_MSG =
  "Thank you for your order! Our manager will contact you shortly.";

export const PLACEHOLDER = "Placeholder";

export const VALIDATION_RULES = {
  loginPattern: "^[a-zA-Z][a-zA-Z0-9]{2,}$",
  passwordPattern: "^(?=.{6,})(?=.*[!@#$%^&*=]).+$",
};
