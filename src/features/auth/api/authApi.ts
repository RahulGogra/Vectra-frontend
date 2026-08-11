import { api } from '../../../lib/axios';
import type { User, LoginCredentials, RegisterData, AuthTokens } from '../../../types';

/** POST /api/token/ — obtain JWT pair */
export const login = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  const { data } = await api.post<AuthTokens>('/token/', credentials);
  return data;
};

/** POST /api/auth/register/ — create account */
export const register = async (payload: RegisterData): Promise<User> => {
  const { data } = await api.post<User>('/auth/register/', payload);
  return data;
};

/** GET /api/auth/me/ — fetch current authenticated user */
export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/auth/me/');
  return data;
};
