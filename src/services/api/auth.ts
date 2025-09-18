import { authAPI } from '@/lib/axios';
import { LoginRequest, LoginResponse, ValidateResponse, RefreshRequest, User } from '@/types/auth';

export const authService = {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await authAPI.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Get user profile
   */
  async getProfile(): Promise<User> {
    const response = await authAPI.get<User>('/auth/profile');
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