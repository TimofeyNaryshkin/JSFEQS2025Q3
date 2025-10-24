export interface RegistrationData {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}

export interface LoginData {
  login: string;
  password: string;
}