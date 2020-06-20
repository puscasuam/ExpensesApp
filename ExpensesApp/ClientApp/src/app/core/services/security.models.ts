export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface Token {
  value: string;
  expiry: Date;
  email: string;
}
