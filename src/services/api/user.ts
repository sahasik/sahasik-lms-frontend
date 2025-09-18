import { userAPI } from '@/lib/axios';
import { User } from '@/types/auth';

export const userService = {
  /**
   * Get user by ID
   */
  async getUser(id: string): Promise<User> {
    const response = await userAPI.get<User>(`/users/${id}`);
    return response.data;
  },

  /**
   * Update user profile
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await userAPI.put<User>(`/users/${id}`, userData);
    return response.data;
  },
};