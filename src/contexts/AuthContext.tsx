import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types/auth';
import { authService } from '@/services/api/auth';
import { setAccessToken, clearTokens, getRefreshToken } from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const validateToken = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await authService.validate();
      if (response.valid && response.user) {
        setUser(response.user);
      } else {
        throw new Error('Invalid token');
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      clearTokens();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ 
        username, 
        email, 
        password, 
        role: 'admin' // This will be determined by backend
      });
      
      setAccessToken(response.access_token);
      // Note: refresh_token should be set by backend as httpOnly cookie
      // For this implementation, we'll store it in a secure cookie
      document.cookie = `refresh_token=${response.refresh_token}; Secure; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}`;
      
      setUser(response.user);
      
      toast({
        title: 'Berhasil masuk',
        description: `Selamat datang kembali, ${response.user.full_name}!`,
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Gagal masuk',
        description: 'Username, email atau kata sandi tidak valid',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    toast({
      title: 'Berhasil keluar',
      description: 'Anda telah berhasil keluar dari sistem',
    });
  };

  const refetch = async () => {
    setIsLoading(true);
    await validateToken();
  };

  useEffect(() => {
    validateToken();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refetch,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};