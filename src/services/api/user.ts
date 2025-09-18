import { userAPI } from '@/lib/axios';
import { User } from '@/types/auth';

export const userService = {
  /**
   * Get current user profile
   */
  async getMe(): Promise<User> {
    const response = await userAPI.get<User>('/users/me');
    return response.data;
  },

  /**
   * Get all users with pagination
   */
  async getUsers(limit?: number): Promise<User[]> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    
    const response = await userAPI.get<User[]>(`/users?${params.toString()}`);
    return response.data;
  },

  /**
   * Get all teachers
   */
  async getTeachers(): Promise<User[]> {
    const response = await userAPI.get<User[]>('/teachers');
    return response.data;
  },

  /**
   * Get all students
   */
  async getStudents(): Promise<User[]> {
    const response = await userAPI.get<User[]>('/students');
    return response.data;
  },

  /**
   * Update current user profile
   */
  async updateMe(userData: Partial<User>): Promise<User> {
    const response = await userAPI.put<User>('/users/me', userData);
    return response.data;
  },

  /**
   * Create new user
   */
  async createUser(userData: Partial<User> & { password: string }): Promise<User> {
    const response = await userAPI.post<User>('/users', userData);
    return response.data;
  },
};