import api from './api';
import { AuthResponse, LoginPayload, RegisterPayload } from '../types';

const register = async (data: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;