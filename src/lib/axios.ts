import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { env } from '@/config/env';
import { LoginResponse, RefreshRequest } from '@/types/auth';

// Create axios instances for each service
export const authAPI = axios.create({
  baseURL: `${env.API_AUTH}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = axios.create({
  baseURL: `${env.API_USER}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const courseAPI = axios.create({
  baseURL: `${env.API_COURSE}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

export const getRefreshToken = () => Cookies.get('refresh_token');

export const setRefreshToken = (token: string) => {
  Cookies.set('refresh_token', token, {
    httpOnly: false, // Note: In production, backend should set httpOnly cookie
    secure: window.location.protocol === 'https:',
    sameSite: 'strict',
    expires: 7, // 7 days
  });
};

export const clearTokens = () => {
  accessToken = null;
  Cookies.remove('refresh_token');
};

// Request interceptor to add auth token
const addAuthInterceptor = (apiInstance: typeof authAPI) => {
  apiInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getAccessToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Response interceptor for token refresh
const addRefreshInterceptor = (apiInstance: typeof authAPI) => {
  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const refreshResponse = await authAPI.post<LoginResponse>('/auth/refresh', {
            refresh_token: refreshToken,
          } as RefreshRequest);

          const { access_token, refresh_token } = refreshResponse.data;
          
          setAccessToken(access_token);
          setRefreshToken(refresh_token);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }

          return apiInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

// Apply interceptors to protected APIs
addAuthInterceptor(userAPI);
addAuthInterceptor(courseAPI);
addRefreshInterceptor(userAPI);
addRefreshInterceptor(courseAPI);

// Also apply to authAPI for validate endpoint
addAuthInterceptor(authAPI);
addRefreshInterceptor(authAPI);

export { AxiosError };
export type { AxiosResponse };