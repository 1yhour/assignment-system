export type Role = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar_url: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: "student" | "teacher";
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  errors: Record<string, string[]>;
}
