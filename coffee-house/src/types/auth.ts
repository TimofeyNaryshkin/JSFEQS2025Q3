export type PaymentMethod = 'cash' | 'card'

export interface RegistrationData {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: PaymentMethod;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface RegistrationResponseData {
  access_token: string;
  user: User;
}

export interface User {
  login: string
  city: string
  street: string
  houseNumber: number
  paymentMethod: string
  id: number
  createdAt: string
}

export type CityData = {
  "New York": string[];
  "Los Angeles": string[];
  Chicago: string[];
};
