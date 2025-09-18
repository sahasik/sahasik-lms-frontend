import { authAPI } from '@/lib/axios';
import { LoginRequest, LoginResponse, ValidateResponse, RefreshRequest } from '@/types/auth';

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await authAPI.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   */
  async refresh(refreshToken: string): Promise<LoginResponse> {
    const response = await authAPI.post<LoginResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    } as RefreshRequest);
    return response.data;
  },

  /**
   * Validate current access token
   */
  async validate(): Promise<ValidateResponse> {
    const response = await authAPI.post<ValidateResponse>('/auth/validate');
    return response.data;
  },
};