export type User = {
  id: number;
  name: string;
  email: string;
}

export type LoginForm = {
  email: string;
  password: string;
}

export type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}