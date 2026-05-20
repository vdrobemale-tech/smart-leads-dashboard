export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'sales';
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  role: 'admin' | 'sales';
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'sales';
  };
}