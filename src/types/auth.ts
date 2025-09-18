export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student';
  phone?: string;
  // Student specific fields
  student_id?: string;
  class_level?: string;
  academic_year?: string;
  parent_name?: string;
  parent_phone?: string;
  parent_email?: string;
  // Teacher specific fields
  employee_id?: string;
  specialization?: string;
  qualification?: string;
  // Common profile fields
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
}

export interface LoginRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: User;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface ValidateResponse {
  valid: boolean;
  user: User;
}

export interface AuthError {
  error: string;
}